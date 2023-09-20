const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.register = async (req, res) => {
  try {
    const { login, password, phoneNumber } = req.body;

    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    console.log(req.body, req.file);

    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string' &&
      req.file &&
      ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {
      const [, ext] = req.file.originalname.split('.');

      if (ext !== 'jpg' && ext !== 'png' && ext !== 'jpeg') {
        //delete file when something went wrong
        fs.unlinkSync(req.file.path);
        res.status(400).send({ message: 'File ext is not correct' });
      }

      const userWithLogin = await User.findOne({ login });

      if (userWithLogin) {
        //delete file if there is user with login already
        fs.unlinkSync(req.file.path);
        return res
          .status(409)
          .send({ message: 'User with this login already exists' });
      }

      const user = await User.create({
        login,
        password: await bcrypt.hash(password, 10),
        avatar: req.file.filename,
        phoneNumber,
      });

      res.status(201).send({ message: 'User created ' + user.login });
    } else {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string'
    ) {
      const user = await User.findOne({ login });

      if (!user) {
        res.status(400).send({ message: 'Login or password are incorrect' });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          //add user object with properties login and _id
          req.session.user = {
            login: user.login,
            userId: user._id,
          };
          res.status(200).send({ message: 'Login successful' });
        } else {
          res.status(400).send({ message: 'Login or password are incorrect' });
        }
      }
    } else {
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  res.send({ message: req.session.user });
};

exports.logout = async (req, res) => {
  req.session.destroy();
  res.send({ message: 'Logout successful' });
};
