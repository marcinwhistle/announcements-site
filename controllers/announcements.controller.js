const Announcement = require('../models/announcement.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Announcement.find());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement)
      res.status(404).json({ message: 'Announcement not found...' });
    else res.json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
