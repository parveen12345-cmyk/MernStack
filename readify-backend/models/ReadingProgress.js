const mongoose = require('mongoose');

const readingProgressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    bookId: {
        type: String,
        required: true,
    },
    title: String,
    author: String,
    coverUrl: String,
    currentPage: {
        type: Number,
        default: 1,
    },
    totalPages: {
        type: Number,
        default: 0,
    },
    lastOpened: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('ReadingProgress', readingProgressSchema);
