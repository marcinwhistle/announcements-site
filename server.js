const express = require('express');
const path = require('path'); // Import the 'path' module
const mongoose = require('mongoose');
const cors = require('cors'); // Import the 'cors' middleware

const announcementsRoutes = require('./routes/announcements.routes');

const app = express();

app.use(cors());
//Serve static file from the 'public' directory
app.use(express.static(path.join(__dirname, '/public')));

app.use('api/', announcementsRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if (NODE_ENV === 'production') dbUri = 'url to remote db';
else if (NODE_ENV === 'test')
  dbUri = 'mongodb://localhost:27017/announcementSiteDB';
else dbUri = 'mongodb://localhost:27017/announcementSiteDB';

// connects our backend code with the database
mongoose.connect('mongodb://localhost:27017/announcementSiteDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to db');
});
db.on('error', (error) => console.log('Error' + error.message));

const server = app.listen('8000', () => {});

module.exports = server;
