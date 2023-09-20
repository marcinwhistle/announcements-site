const express = require('express');
const path = require('path'); // Import the 'path' module
const mongoose = require('mongoose');
const cors = require('cors'); // Import the 'cors' middleware
const session = require('express-session');
const MongoStore = require('connect-mongo');
//Load dotenv configure file .env
require('dotenv').config();

const sessionSecret = process.env.SESSION_SECRET;

const announcementsRoutes = require('./routes/announcements.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

//add middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: sessionSecret,
    cookie: {
      secure: process.env.NODE_ENV == 'production',
    },
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/announcementSiteDB',
    }),
    resave: false,
    saveUninitialized: false,
  })
);

// add routes
app.use('/api', announcementsRoutes);
app.use('/auth', authRoutes);
//Serve static file from the 'public' directory
app.use(express.static(path.join(__dirname, 'client/public')));
app.use(express.static(path.join(__dirname, '/public')));

//at any other link, just server react app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

const dbURI = 'mongodb://localhost:27017/announcementSiteDB';
// connects our backend code with the database
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once('open', () => {
  console.log(`Connected to DB ${dbURI}`);
});
db.on('error', (error) => console.log('Error' + error.message));

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
