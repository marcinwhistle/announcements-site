const Announcement = require('../models/announcement.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Announcement.find());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
