const express = require('express');
const router = express.Router();
const { updateProgress, getUserLibrary, addBookmark, getBookmarks } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/library', protect, getUserLibrary);
router.patch('/progress', protect, updateProgress);
router.post('/bookmarks', protect, addBookmark);
router.get('/bookmarks/:bookId', protect, getBookmarks);

module.exports = router;
