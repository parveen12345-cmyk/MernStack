const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

// @desc    Compare prices across Amazon and Flipkart
// @route   GET /api/prices/compare?title=book_title
exports.comparePrices = async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const results = [];

        // 1. Generate Amazon Link (Simple Strategy)
        const amazonSearchUrl = `https://www.amazon.in/s?k=${encodeURIComponent(title + ' book')}`;
        results.push({
            store: 'Amazon',
            url: amazonSearchUrl,
            price: 'Check Site', // Full API integration needed for real price
            logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
        });

        // 2. Scrape Flipkart (Advanced Strategy)
        try {
            const browser = await puppeteer.launch({ headless: "new" });
            const page = await browser.newPage();
            
            const flipkartUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(title + ' book')}`;
            await page.goto(flipkartUrl, { waitUntil: 'networkidle2' });

            // Extract first item price and link
            const flipkartData = await page.evaluate(() => {
                const priceEl = document.querySelector('._30jeq3');
                const linkEl = document.querySelector('._1fQZEK') || document.querySelector('._2rp_m_');
                
                return {
                    price: priceEl ? priceEl.innerText : 'N/A',
                    url: linkEl ? linkEl.href : window.location.href
                };
            });

            await browser.close();

            results.push({
                store: 'Flipkart',
                url: flipkartData.url,
                price: flipkartData.price,
                logo: 'https://static-assets-web.flixcart.com/batman-returns/static/img/fk-logo_9f5042.png'
            });
        } catch (scrapeError) {
            console.error('Flipkart Scraping failed:', scrapeError.message);
            results.push({
                store: 'Flipkart',
                url: `https://www.flipkart.com/search?q=${encodeURIComponent(title)}`,
                price: 'Check Site',
                logo: 'https://static-assets-web.flixcart.com/batman-returns/static/img/fk-logo_9f5042.png'
            });
        }

        res.json(results);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Price comparison failed' });
    }
};
