// Backend (Node.js with Express.js)
const express = require('express');
const morgan = require('morgan'); // Import the morgan package
const helmet = require('helmet'); // Import the helmet package
const books = require('./books');
const cors = require('cors');
const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(
    cors({
        origin: 'http://localhost:8081',
    })
);

app.use(morgan('dev')); // Add the morgan middleware with 'dev' format
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet()); // Add the helmet middleware
app.use(express.static('client/dist'));
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.get('/books', (_req, res) => res.json(books));
app.get('/books/:id', (req, res) => {
    const book = books.find((book) => book.id === req.params.id);
    return book ? res.json(book) : res.sendStatus(404);
});
app.post('/books', (req, res) => {
    const bookId = uuidv4();
    const book = {
        ...req.body,
        id: bookId,
    };

    books.push(book);
    res.status(201);
    return res.json(book);
});
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const bookIdIndex = books.findIndex((book) => book.id === bookId);
    if (bookIdIndex === -1) {
        return res.sendStatus(404);
    }

    books.splice(bookIdIndex, 1);
    return res.sendStatus(200);
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(5000, () => {
        console.log('Server is running on http://localhost:5000');
    });
}
module.exports = app;
