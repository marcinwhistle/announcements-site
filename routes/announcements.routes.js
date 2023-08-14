const express = require('express');
const router = express.Router();
const AnnouncementController = require('../controllers/announcements.controller');

router.get('/announcements', AnnouncementController.getAll);

router.get('/announcements/:id', AnnouncementController.getById);

router.post('/announcements', AnnouncementController.addAnnouncement);

router.delete('/announcements/:id', AnnouncementController.deleteAnnouncement);

module.exports = router;
