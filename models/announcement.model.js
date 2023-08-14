const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 10, maxLength: 50 },
  detail: { type: String, required: true, minLength: 20, maxLength: 1000 },
  date: { type: Date, required: true },
  photo: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  seller: { type: String, required: true },
});

module.exports = mongoose.model('Announcement', announcementSchema);
