require('dotenv').config();

// Validate required environment variables
const requiredEnvVars = ['MONGO_DB_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(', ')}`
  );
}

const PORT = process.env.PORT || 8080;

const MONGO_DB_URI = process.env.MONGO_DB_URI;

// MongoDB connection options
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const config = {
  MONGO_DB_URI,
  MONGO_OPTIONS,
  PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
};

// Enhanced MongoDB URI validation
if (!config.MONGO_DB_URI) {
  throw new Error('MONGO_DB_URI is not defined');
}

if (
  !config.MONGO_DB_URI.startsWith('mongodb://') &&
  !config.MONGO_DB_URI.startsWith('mongodb+srv://')
) {
  throw new Error(`Invalid MONGO_DB_URI format. Got: ${config.MONGO_DB_URI}`);
}

module.exports = config;
