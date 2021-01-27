const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dataBase = require('../config/db');

const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = (module.exports = mongoose.model('User', UserSchema));

module.exports.getUserByLogin = (login, callback) => {
  const query = { login: login };
  User.findOne(query, callback);
};

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
};

module.exports.newUser = (newUser, callback) => {
  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(newUser.password, salt, (error, hash) => {
      if (error) {
        throw error;
      }
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePasswords = (passFromUser, userDBPass, callback) => {
  bcrypt.compare(passFromUser, userDBPass, (error, isMatch) => {
    if (error) {
      throw error;
    }
    callback(null, isMatch);
  });
};
