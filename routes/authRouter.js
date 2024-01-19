const express = require('express');
const { checkUser, newUser, getAllUsers } = require('../controllers/auth');
const router = express.Router();

router.post('/check-user', checkUser);
router.post('/newUser', newUser);
router.get('/get-contacts', getAllUsers);

module.exports = router;