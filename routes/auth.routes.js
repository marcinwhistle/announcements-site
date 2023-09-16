const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');

const auth = require('../controllers/auth.controller');

router.post('/register', auth.register);

router.post('/login', auth.login);

//Add authMiddleware for checking if req.session.user exists
router.get('/user', authMiddleware, auth.getUser);

module.exports = router;
