const books = require('./books');
const app = require('./main');
const request = require('supertest');

describe('GET /books', () => {
    it('should return all books', async () => {
        const response = await request(app).get('/books');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(books);
    });
});

describe('GET /books/:id', () => {
    it('should return a specific book', async () => {
        const response = await request(app).get('/books/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(books[0]);
    });

    it('should return 404 if book is not found', async () => {
        const response = await request(app).get('/books/100');
        expect(response.status).toBe(404);
    });
});

describe('POST /books', () => {
    it('should create a new book', async () => {
        const newBook = {
            title: 'New Book',
            description: 'Description of New Book',
            author: 'New Author',
            publicationDate: '2022-08-01',
            genre: 'Fantasy',
            price: 15.99,
        };

        const response = await request(app).post('/books').send(newBook);
        expect(response.status).toBe(201);
        const { id, ...book } = response.body;
        expect(book).toEqual(newBook);
    });
});

describe('DELETE /books/:id', () => {
    it('should delete a specific book', async () => {
        const response = await request(app).delete('/books/1');
        expect(response.status).toBe(200);
    });

    it('should return 404 if book is not found', async () => {
        const response = await request(app).delete('/books/100');
        expect(response.status).toBe(404);
    });
});
