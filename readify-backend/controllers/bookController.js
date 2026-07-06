const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// @desc    Search books via Google Books API
// @route   GET /api/books/search
exports.searchBooks = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ message: 'Query parameter q is required' });
        }

        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&key=${process.env.GOOGLE_BOOKS_API_KEY || ''}`);
        
        const books = response.data.items ? response.data.items.map(item => ({
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
            description: item.volumeInfo.description,
            category: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'General',
            coverUrl: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x192?text=No+Cover',
            rating: item.volumeInfo.averageRating || 0,
            previewLink: item.volumeInfo.previewLink
        })) : [];

        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching books' });
    }
};

// @desc    Get book details by ID
// @route   GET /api/books/:id
exports.getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.GOOGLE_BOOKS_API_KEY || ''}`);
        
        const item = response.data;
        const book = {
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
            description: item.volumeInfo.description,
            category: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'General',
            coverUrl: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.large || item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/300x450?text=No+Cover',
            rating: item.volumeInfo.averageRating || 0,
            previewLink: item.volumeInfo.previewLink,
            pageCount: item.volumeInfo.pageCount
        };

        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching book details' });
    }
};

// @desc    Fetch book content for reader (from Open Library / Gutenberg)
// @route   GET /api/books/read/:id
exports.getReaderContent = async (req, res) => {
    try {
        const { id } = req.params;
        const googleResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${process.env.GOOGLE_BOOKS_API_KEY || ''}`);
        const title = googleResponse.data.volumeInfo.title;
        const author = googleResponse.data.volumeInfo.authors ? googleResponse.data.volumeInfo.authors[0] : '';

        const olResponse = await axios.get(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`);
        
        if (olResponse.data.docs && olResponse.data.docs.length > 0) {
            const doc = olResponse.data.docs[0];
            if (doc.has_fulltext) {
                return res.json({
                    source: 'Open Library',
                    type: 'link',
                    content: `https://openlibrary.org${doc.key}`
                });
            }
        }

        res.json({
            source: 'Readify AI System',
            type: 'text',
            content: `Full text for "${title}" is currently not available. Use AI Assistant for insights.`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving reader content' });
    }
};

// @desc    Search books by mood or description using AI
// @route   GET /api/books/mood-search?q=mood_description
exports.searchBooksByMood = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ message: 'Mood description is required' });

        const prompt = `You are a library metadata expert. Translate the user's mood or vague book description into 3-5 specific keywords that can be used to search the Google Books API. Return ONLY the keywords separated by spaces. Mood: ${q}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const keywords = response.text();

        console.log(`Mood keywords (Gemini): ${keywords}`);

        const googleResponse = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(keywords)}&key=${process.env.GOOGLE_BOOKS_API_KEY || ''}`);
        
        const books = googleResponse.data.items ? googleResponse.data.items.map(item => ({
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
            description: item.volumeInfo.description,
            category: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'General',
            coverUrl: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x192?text=No+Cover'
        })) : [];

        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Mood search failed' });
    }
};
