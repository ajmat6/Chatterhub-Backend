const express = require('express');
const { checkUser, newUser } = require('../controllers/auth');
const router = express.Router();

router.post('/check-user', checkUser);
router.post('/newUser', newUser);

module.exports = router;