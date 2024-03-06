const express = require('express');
const { addMessage, getMessages } = require('../controllers/messagesController');
const router = express.Router();

router.post('/add-message', addMessage);
router.get('/get-messages/:from/:to', getMessages);

module.exports = router;