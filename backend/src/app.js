const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dishRoutes = require('./routes/dishRoutes');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || '*'
}));

app.use('/api/dishes', dishRoutes);

// health
app.get('/ping', (req, res) => res.json({ ok: true, time: new Date() }));

module.exports = app;
