const express = require('express');
const router = express.Router();
const AnnouncementController = require('../controllers/announcements.controller');

router.get('/announcements', AnnouncementController.getAll);

module.exports = router;
