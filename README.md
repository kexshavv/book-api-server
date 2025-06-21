# 📚 Book Management API

## Description
A simple API server built with Node.js and MongoDB to manage a collection of books.

## Features
- Add a new book
- View all books
- Update existing book
- Delete a book

## Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose

## Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/your-username/book-api-server
cd book-api-server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```
MONGO_URI=mongodb://localhost:27017/bookdb
PORT=5000
```

### 4. Run the server
```bash
node server.js
```

## Sample API Request

**POST /api/books**
```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho"
}
```

---

## 🧪 Testing

We used **Jest** and **Supertest** to test the Book API.

### 🔍 Test Types Included
- Unit Tests
- Integration Tests (MongoDB with mongodb-memory-server)
- API Tests (via HTTP requests)

### ✅ Run Tests

```bash
npm test
```

### 📊 Test Coverage

![Test Coverage Screenshot](./coverage-screenshot.png)
