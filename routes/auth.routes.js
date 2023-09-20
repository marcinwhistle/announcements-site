const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

const auth = require('../controllers/auth.controller');

router.post('/register', imageUpload.single('avatar'), auth.register);

router.post('/login', auth.login);

//Add authMiddleware for checking if req.session.user exists
router.get('/user', authMiddleware, auth.getUser);

router.delete('/logout', authMiddleware, auth.logout);

module.exports = router;
