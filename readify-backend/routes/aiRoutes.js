const express = require('express');
const router = express.Router();
const { getRecommendation, getSummary, getInsight, simplifyText, chatWithAI } = require('../controllers/aiController');

router.post('/recommend', getRecommendation);
router.post('/summary', getSummary);
router.post('/insight', getInsight);
router.post('/simplify', simplifyText);
router.post('/chat', chatWithAI);

module.exports = router;
