/**
 * Socket.IO setup + Change Stream watcher
 * Exports: initSocket(server), emitDishUpdated(dish)
 */
const { Server } = require('socket.io');
const Dish = require('./models/Dish');
let ioInstance;

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_ORIGIN || '*',
      methods: ['GET', 'POST', 'PATCH']
    }
  });
  ioInstance = io;

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
  });

  // Real-time backend change detection:
  const useChangeStreams = (process.env.USE_CHANGE_STREAMS === 'true');

  if (useChangeStreams && Dish.watch) {
    try {
      const changeStream = Dish.watch();
      console.log('Listening to MongoDB change stream for Dish collection');
      changeStream.on('change', change => {
        // We can handle update / replace / insert
        if (['insert', 'update', 'replace'].includes(change.operationType)) {
          // fetch current document
          const id = change.documentKey._id;
          Dish.findById(id).lean().then(doc => {
            if (doc) io.emit('dishUpdated', doc);
          }).catch(err => console.error('ChangeStream document fetch failed', err));
        }
      });
    } catch (err) {
      console.warn('Failed to start change stream:', err.message);
    }
  } else {
    // fallback: lightweight polling every X seconds to detect external updates
    console.log('Change Streams disabled. Using polling fallback for real-time updates (every 5s).');
    let cache = {};
    setInterval(async () => {
      try {
        const dishes = await Dish.find().lean();
        let changed = [];
        for (const d of dishes) {
          const key = d._id.toString();
          const prev = cache[key];
          if (!prev || prev.isPublished !== d.isPublished || prev.updatedAt !== d.updatedAt?.toString()) {
            changed.push(d);
            cache[key] = { isPublished: d.isPublished, updatedAt: d.updatedAt?.toString() };
          }
        }
        changed.forEach(d => io.emit('dishUpdated', d));
      } catch (err) {
        console.error('Polling error', err);
      }
    }, 5000);
  }

  return io;
}

function emitDishUpdated(dish) {
  if (!ioInstance) return;
  ioInstance.emit('dishUpdated', dish);
}

module.exports = { initSocket, emitDishUpdated };
