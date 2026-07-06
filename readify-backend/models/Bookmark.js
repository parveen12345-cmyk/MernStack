const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    bookId: {
        type: String,
        required: true,
    },
    pageNumber: Number,
    textSnippet: String,
    type: {
        type: String,
        enum: ['bookmark', 'highlight'],
        default: 'bookmark'
    },
    color: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
