const express = require('express');
const { checkUser } = require('../controllers/auth');
const router = express.Router();

router.post('/check-user', checkUser);

module.exports = router;