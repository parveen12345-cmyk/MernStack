const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.getRecommendation = async (req, res) => {
    try {
        const { mood } = req.body;
        const prompt = `You are a professional book recommendation assistant. Recommend 3 books based on the user's mood: ${mood}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ recommendation: response.text() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gemini Recommendation failed' });
    }
};

exports.getSummary = async (req, res) => {
    try {
        const { text, lang } = req.body;
        const targetLang = lang || 'English';
        const prompt = `Summarize the following book text into key bullet points. Provide the entire response in ${targetLang}. Text: ${text}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ summary: response.text() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gemini Summary failed' });
    }
};

exports.getInsight = async (req, res) => {
    try {
        const { text, lang } = req.body;
        const targetLang = lang || 'English';
        const prompt = `Provide a profound one-line insight based on the following text. The insight must be in ${targetLang}. Text: ${text}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ insight: response.text() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gemini Insight failed' });
    }
};

exports.simplifyText = async (req, res) => {
    try {
        const { text, lang } = req.body;
        const targetLang = lang || 'English';
        const prompt = `Simplify the following complex text so it's easy to understand. The response must be in ${targetLang}. Text: ${text}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ simplified: response.text() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gemini Simplification failed' });
    }
};

exports.chatWithAI = async (req, res) => {
    try {
        const { message, context, lang } = req.body;
        const targetLang = lang || 'English';
        const prompt = `You are Readify AI, a helpful book assistant. Use the provided context if available. Respond strictly in ${targetLang}. Context: ${context || 'None'}\n\nQuestion: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ response: response.text() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Gemini Chat failed' });
    }
};
