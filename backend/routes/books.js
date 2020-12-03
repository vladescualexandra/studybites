const express = require('express');
const router = express.Router();

const booksController = require('../controllers/BooksController.js');

router.get('/users/:id/books', booksController.findAllBooks)
router.get('/books/:id', booksController.findBook);
router.get('/books/:id/notes', booksController.findNotesByBook)
router.post('/users/:id/books', booksController.createBook);
router.put('/books/:id', booksController.updateBook);
router.delete('/books/:id', booksController.deleteBook);

module.exports = router