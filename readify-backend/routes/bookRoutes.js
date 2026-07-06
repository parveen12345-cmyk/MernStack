const express = require('express');
const router = express.Router();
const { searchBooks, getBookById, getReaderContent, searchBooksByMood } = require('../controllers/bookController');

router.get('/search', searchBooks);
router.get('/mood-search', searchBooksByMood);
router.get('/read/:id', getReaderContent);
router.get('/:id', getBookById);

module.exports = router;
