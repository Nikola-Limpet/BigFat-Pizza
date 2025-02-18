const config = require('./config/config');
const express = require('express');
const app = express();
const cors = require('cors');

const logger = require('./utils/logger');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
const unknownEndpoint = require('./middlewares/unknownEndpoint');

mongoose.set('strictQuery', false);
logger.info('connecting to MongoDB');

mongoose
  .connect(config.MONGO_DB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDb', error.message);
  });

// Built-in Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

app.use(express.static('dist'));
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.get('/api/health', (req, res) => {
  const mongoStatus =
    mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    mongoDb: mongoStatus,
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
// app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/user', userRoutes);

app.use('/api/admin', adminRoutes);

// Custom error middlewares
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
