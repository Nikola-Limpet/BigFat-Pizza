const config = require('./config/config');
const express = require('express');
const app = express();
const cors = require('cors');

const logger = require('./utils/logger');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
const unknownEndpoint = require('./middlewares/unknownEndpoint');

mongoose.set('strictQuery', false);
logger.info('connecting to ', config.MONGO_DB_URI);

mongoose
  .connect(config.MONGO_DB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDb', error.message);
  });

// Built-in Middleware
app.use(cors());
app.use(
  cors({
    origin: 'http://localhost:5173', // Your Vite frontend URL
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

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
// app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/user', userRoutes);

// Custom error middlewares
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
