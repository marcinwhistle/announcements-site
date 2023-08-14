const express = require('express');
const router = express.Router();
const AnnouncementController = require('../controllers/announcements.controller');

router.get('/announcements', AnnouncementController.getAll);

router.get('/announcements/:id', AnnouncementController.getById);

router.post('/announcements', AnnouncementController.addAnnouncement);

module.exports = router;
