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

exports.addAnnouncement = async (req, res) => {
  try {
    const { title, detail, date, photo, price, location, seller } = req.body;
    const newAnnouncement = new Announcement({
      title: title,
      detail: detail,
      date: date,
      photo: photo,
      price: price,
      location: location,
      seller: seller,
    });
    await newAnnouncement.save();
    res.json({ message: 'Announcement has been added' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(
      req.params.id
    );
    if (deletedAnnouncement) {
      res.json(deletedAnnouncement);
    } else res.status(404).json({ message: 'Announcement not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAnnouncement = async (req, res) => {
  const { title, detail, date, photo, price, location, seller } = req.body;
  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        detail: detail,
        date: date,
        photo: photo,
        price: price,
        location: location,
        seller: seller,
      },
      { returnDocument: 'after' }
    );
    if (updatedAnnouncement) {
      res.json(updatedAnnouncement);
    } else res.status(404).json({ message: 'Announcement not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchByPhrase = async (req, res) => {
  try {
    const searchPhrase = req.params.searchPhrase;

    const matchingAnnouncements = await Announcement.find({
      title: { $regex: searchPhrase, $options: 'i' },
    });

    if (matchingAnnouncements.length > 0) {
      res.json(matchingAnnouncements);
    } else {
      res.status(404).json({ message: 'No mathing announcements found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
