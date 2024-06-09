const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const geminiController = require('../controllers/geminiController');
const nearbyyController = require('../controllers/nearbyyController');

router.post('/', chatController.getResponseChat);
router.post('/gemini', geminiController.getResponseChatGemini);
router.post('/nearbyy', nearbyyController.getContextResponse);

module.exports = router;