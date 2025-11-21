require('dotenv').config();
const http = require('http');
const app = require('./app');
const { initSocket } = require('./socket');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 4000;

async function start() {
  await connectDB();

  const server = http.createServer(app);
  initSocket(server); // attaches socket.io and starts watchers
  server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

start().catch(err => {
  console.error('Failed to start server', err);
  process.exit(1);
});
