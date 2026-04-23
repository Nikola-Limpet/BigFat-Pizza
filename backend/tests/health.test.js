// Set required env vars BEFORE importing app
process.env.MONGO_DB_URI = 'mongodb://localhost:27017/test';
process.env.JWT_SECRET = 'test-secret-key';

// Mock mongoose to avoid real DB connection in unit tests
jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose');
  return {
    ...actualMongoose,
    connect: jest.fn().mockResolvedValue({}),
    connection: {
      ...actualMongoose.connection,
      readyState: 1,
      close: jest.fn().mockResolvedValue({}),
    },
    set: jest.fn(),
  };
});

const request = require('supertest');
const app = require('../app');

describe('Health Endpoint', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.message).toBe('Server is running');
  });
});
