const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/Book');
const bookRoutes = require('../routes/books');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();
app.use(express.json());
app.use('/api/books', bookRoutes);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Book.deleteMany({});
});

describe('📚 Book API', () => {
  it('should create a book', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({ title: '1984', author: 'George Orwell' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('1984');
  });

  it('should get all books', async () => {
    await Book.create({ title: 'Book A', author: 'Author A' });
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it('should update a book', async () => {
    const book = await Book.create({ title: 'Temp', author: 'Test' });
    const res = await request(app)
      .put(`/api/books/${book._id}`)
      .send({ title: 'Updated' });
    expect(res.body.title).toBe('Updated');
  });

  it('should delete a book', async () => {
    const book = await Book.create({ title: 'Temp', author: 'Test' });
    const res = await request(app).delete(`/api/books/${book._id}`);
    expect(res.body.message).toBe('Book deleted successfully');
  });
});
