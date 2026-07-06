const ReadingProgress = require('../models/ReadingProgress');
const Bookmark = require('../models/Bookmark');

// @desc    Update reading progress
// @route   PATCH /api/user/progress
exports.updateProgress = async (req, res) => {
    try {
        const { bookId, title, author, coverUrl, currentPage, totalPages } = req.body;
        const userId = req.user.id;

        let progress = await ReadingProgress.findOne({ user: userId, bookId });

        if (progress) {
            progress.currentPage = currentPage;
            progress.lastOpened = Date.now();
            await progress.save();
        } else {
            progress = await ReadingProgress.create({
                user: userId,
                bookId,
                title,
                author,
                coverUrl,
                currentPage,
                totalPages
            });
        }

        res.json(progress);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error updating progress' });
    }
};

// @desc    Get user reading list
// @route   GET /api/user/library
exports.getUserLibrary = async (req, res) => {
    try {
        const userId = req.user.id;
        const progressList = await ReadingProgress.find({ user: userId }).sort('-lastOpened');
        res.json(progressList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching library' });
    }
};

// @desc    Add bookmark or highlight
// @route   POST /api/user/bookmarks
exports.addBookmark = async (req, res) => {
    try {
        const { bookId, pageNumber, textSnippet, type, color } = req.body;
        const userId = req.user.id;

        const bookmark = await Bookmark.create({
            user: userId,
            bookId,
            pageNumber,
            textSnippet,
            type,
            color
        });

        res.status(201).json(bookmark);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error saving bookmark' });
    }
};

// @desc    Get bookmarks for a book
// @route   GET /api/user/bookmarks/:bookId
exports.getBookmarks = async (req, res) => {
    try {
        const { bookId } = req.params;
        const userId = req.user.id;

        const bookmarks = await Bookmark.find({ user: userId, bookId }).sort('-createdAt');
        res.json(bookmarks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching bookmarks' });
    }
};
