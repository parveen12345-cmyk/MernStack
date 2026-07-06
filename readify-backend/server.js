const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

// ── Gemini init (safe – no crash if key missing) ──────────────────────────────
let geminiModel = null;
try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    // gemini-1.5-flash-8b has the highest free tier quota (1500 req/day)
    geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
    console.log("✅ Gemini AI (gemini-1.5-flash-8b) ready");
} catch (e) { console.log("⚠️ Gemini init failed:", e.message); }

// ── Simple cache + rate limiter (prevent quota exhaustion) ───────────────────
const searchCache = new Map();       // query → { results, source, ts }
const CACHE_TTL   = 5 * 60 * 1000;  // 5 minutes
let   lastAiCall  = 0;
const AI_INTERVAL = 3000;            // minimum 3 seconds between AI calls

function cacheGet(q) {
    const hit = searchCache.get(q);
    if (hit && Date.now() - hit.ts < CACHE_TTL) return hit;
    return null;
}
function cacheSet(q, results, source) {
    searchCache.set(q, { results, source, ts: Date.now() });
}

// ── Book library ──────────────────────────────────────────────────────────────
const BOOKS = [
    {
        id: "1",
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Adventure",
        rating: 4.8,
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg",
        description: "A magical story of Santiago, a shepherd boy, who journeys from Spain to Egypt in search of treasure. The book is mystical, hopeful, and deeply spiritual – perfect for anyone searching for purpose, destiny, or a reason to keep dreaming.",
        mood: "hopeful, mystical, inspiring, spiritual, adventurous",
        content: `Chapter 1: The Boy and His Dream

Every night, Santiago had the same dream. A child appeared and told him to seek treasure at the foot of the Egyptian pyramids.

"When you want something," the old king Melchizedek told him, "all the universe conspires in helping you to achieve it."

Santiago sold his sheep and began the greatest journey of his life. Through the markets of Tangier, across the scorching Sahara desert, he learned that the true treasure was not gold – it was the journey itself, the people he met, and the love he discovered along the way.

The alchemist looked into the boy's eyes. "Why do you want to turn lead into gold?" he asked. "Because I want to be rich," said the boy. The alchemist smiled. "That is not the reason. The real reason is that you want to fulfill your Personal Legend."

And so Santiago continued, guided by omens, by the Soul of the World, and by a heart that never stopped believing.`
    },
    {
        id: "2",
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self-Help",
        rating: 4.9,
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
        description: "A proven framework for improving every day through tiny 1% changes. The mood is practical, disciplined, and relentlessly motivating. Ideal for people who want to build better routines and break bad habits.",
        mood: "disciplined, motivating, practical, systematic, focused",
        content: `Chapter 1: The Surprising Power of Atomic Habits

Here is the most surprising truth about habits: a 1% improvement every day leads to a 37x improvement over a year.

Conversely, getting 1% worse each day leads to nearly zero.

The difference between a good day and a bad day is rarely a single dramatic moment. It is the sum of thousands of tiny decisions – what you eat, how you move, how you spend your attention.

James Clear's framework rests on four laws:
1. Make it obvious.
2. Make it attractive.
3. Make it easy.
4. Make it satisfying.

Forget about goals. Goals are for people who care about winning. Systems are for people who care about consistent progress.

The most effective way to change who you are is to change what you do – one tiny habit at a time.`
    },
    {
        id: "3",
        title: "Deep Work",
        author: "Cal Newport",
        category: "Productivity",
        rating: 4.7,
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
        description: "Rules for focused success in a distracted world. The mood is analytical, serious, and high-performance. Essential for professionals, students, and anyone who needs to think deeply.",
        mood: "focused, analytical, serious, productive, disciplined",
        content: `Introduction: Deep Work Is Becoming Rare

Deep work is the ability to focus without distraction on a cognitively demanding task. It produces results that create real value and are hard to replicate.

In contrast, shallow work – non-cognitively demanding logistical tasks performed while distracted – is easy to replicate and adds little value to the world.

The economy is shifting. Those who can perform deep work will thrive. Those who cannot will struggle.

Rule 1: Work Deeply
Schedule every hour of your day. Identify your most cognitively demanding task and protect time for it. Remove all distractions.

Rule 2: Embrace Boredom
The ability to concentrate is a skill. If you spend your free time seeking stimulation, you will damage your capacity for deep focus.

Rule 3: Quit Social Media
Adopt a craftsman's approach – use a tool only if its benefits outweigh its harms.

Rule 4: Drain the Shallows
Reduce the time you spend on shallow work to an absolute minimum.`
    },
    {
        id: "4",
        title: "Psychology of Money",
        author: "Morgan Housel",
        category: "Finance",
        rating: 4.8,
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
        description: "Timeless lessons on wealth, greed, and happiness. The mood is reflective, wise, and grounded. Perfect for anyone who wants to understand the emotional and behavioral side of financial decisions.",
        mood: "reflective, wise, grounded, philosophical, insightful",
        content: `Chapter 1: No One Is Crazy

Your personal experiences with money make up maybe 0.00000001% of what has happened in the world, but perhaps 80% of how you think the world works.

People do seemingly crazy things with money. They save frantically and spend recklessly. They chase returns during bull markets and panic during downturns.

But here is the thing: no one is crazy.

Morgan Housel's key insight is that financial success is not primarily about knowing a formula. It is about behavior.

The man who grew up during the Great Depression sees risk everywhere. The millennial who only saw a bull market sees opportunity everywhere. Both are acting rationally based on their unique world view.

Wealth is what you don't see. A person driving a Lamborghini is not necessarily rich. The person who could buy ten Lamborghinis but drives a used Honda – that person may be very wealthy.

The goal is not to be rich. The goal is to be free.`
    },
    {
        id: "5",
        title: "Can't Hurt Me",
        author: "David Goggins",
        category: "Growth",
        rating: 4.9,
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781544512273-L.jpg",
        description: "Master your mind and defy the odds. An intense memoir of overcoming childhood trauma to become a Navy SEAL and ultramarathon runner. The mood is raw, brutal, and powerfully motivating.",
        mood: "intense, powerful, raw, motivating, unstoppable, resilient",
        content: `Introduction: The 40% Rule

When your mind is telling you that you're done, that you're exhausted, that you cannot take another step – you are actually only at 40% of what you are capable of.

David Goggins grew up in a house of abuse. He was mocked for his weight, his learning difficulties, and his poverty. Yet he became one of the only people in history to complete Navy SEAL training, Army Ranger School, and Air Force Tactical Air Controller training.

His secret? Callusing the mind.

Every time you do something uncomfortable, you build a callus on your mind. Over time, discomfort no longer stops you – it fuels you.

The 40% Rule: The next time your mind says stop, push further. Your real limit is far beyond where your brain tells you to quit.

Nobody is going to come and save you. The whole world doesn't owe you anything. You have to earn it.`
    },
    {
        id: "6",
        title: "Zero to One",
        author: "Peter Thiel",
        category: "Startup",
        rating: 4.7,
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780804139021-L.jpg",
        description: "Notes on startups, or how to build the future. The mood is bold, contrarian, and future-focused. Essential reading for entrepreneurs and innovators.",
        mood: "bold, innovative, contrarian, strategic, entrepreneurial",
        content: `Chapter 1: The Challenge of the Future

Every moment in business happens only once. The next Bill Gates will not build an operating system. The next Larry Page will not create a search engine.

If you are copying these people, you are not learning from them.

"Zero to one" means going from nothing to something – true innovation. "One to n" means copying something that already works.

Thiel's core insight: Competition is for losers. If you are competing, you are fighting over the same pie. Instead, create something entirely new – a monopoly in your own category.

The most important question to ask: What valuable company is nobody building?

The best startups might seem a little too small at first. But the goal is to dominate a small market first, then expand.

Secrets still exist. The people who look for secrets are the ones who build the future.`
    }
];

// ── Routes ────────────────────────────────────────────────────────────────────

// GET all books
app.get('/api/books', (req, res) => res.json(BOOKS));

// GET one book by id
app.get('/api/books/:id', (req, res) => {
    const book = BOOKS.find(b => b.id === req.params.id) || BOOKS[0];
    res.json(book);
});

// GET book content for reader
app.get('/api/books/read/:id', (req, res) => {
    const book = BOOKS.find(b => b.id === req.params.id) || BOOKS[0];
    res.json({ id: book.id, title: book.title, author: book.author, content: book.content });
});

// GET mood/keyword search
app.get('/api/books/search', async (req, res) => {
    const q = (req.query.q || "").trim();
    if (!q) return res.json({ results: BOOKS });

    const ql = q.toLowerCase();

    // 1️⃣ Return cached result if fresh
    const cached = cacheGet(ql);
    if (cached) {
        console.log(`Cache hit for "${q}"`);
        return res.json({ results: cached.results, source: cached.source + " (cached)" });
    }

    // 2️⃣ Smart keyword search (instant, always works)
    const words = ql.split(/\s+/);
    const scored = BOOKS.map(b => {
        let score = 0;
        const haystack = `${b.title} ${b.author} ${b.mood} ${b.description} ${b.category} ${b.content}`.toLowerCase();
        words.forEach(w => {
            if (w.length < 3) return;
            if (b.title.toLowerCase().includes(w)) score += 10;
            if (b.author.toLowerCase().includes(w)) score += 8;
            if (b.category.toLowerCase().includes(w)) score += 7;
            if (b.mood.toLowerCase().includes(w)) score += 6;
            if (haystack.includes(w)) score += 2;
        });
        return { ...b, score };
    }).filter(b => b.score > 0).sort((a, b) => b.score - a.score);

    const keywordResults = scored.length > 0 ? scored : BOOKS;

    // 3️⃣ Try Gemini AI only if rate-limit window has passed
    const now = Date.now();
    if (geminiModel && (now - lastAiCall) > AI_INTERVAL) {
        lastAiCall = now;
        try {
            const bookList = BOOKS.map(b =>
                `ID:${b.id} | "${b.title}" | Mood: ${b.mood} | Category: ${b.category}`
            ).join('\n');

            const prompt = `Reader request: "${q}"
Return ONLY a JSON array of book IDs that best match, e.g. ["1","3"]. At least 1 ID required.
Books:\n${bookList}`;

            const result = await geminiModel.generateContent(prompt);
            const text   = result.response.text().trim();
            console.log(`AI (${q}) →`, text);

            const ids      = [...text.matchAll(/(\d+)/g)].map(m => m[1]);
            const filtered = BOOKS.filter(b => ids.includes(b.id));

            if (filtered.length > 0) {
                cacheSet(ql, filtered, "ai");
                return res.json({ results: filtered, source: "ai" });
            }
        } catch (err) {
            if (err.message.includes('429')) {
                console.log("⚠️  AI quota exceeded – using keyword results");
            } else {
                console.log("AI error:", err.message);
            }
        }
    }

    // 4️⃣ Return keyword results as fallback
    cacheSet(ql, keywordResults, "keyword");
    res.json({ results: keywordResults, source: "keyword" });
});

// POST AI chat
app.post('/api/ai/chat', async (req, res) => {
    const { message, lang = 'English' } = req.body;
    if (!geminiModel) return res.json({ response: "AI is not configured. Please add GEMINI_API_KEY to your .env file." });
    try {
        const result = await geminiModel.generateContent(`Analyze this in ${lang}: ${message}`);
        res.json({ response: result.response.text() });
    } catch (e) {
        res.json({ response: "AI analysis: " + e.message });
    }
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Readify AI Server running on http://localhost:${PORT}`));
