const express = require('express');
const router = express.Router();
const User = require('../models/users');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dataBase = require('../config/db');

router.post('/sign-up', (request, response) => {
  let newUser = new User({
    name: request.body.name,
    email: request.body.email,
    login: request.body.login,
    password: request.body.password
  });

  User.newUser(newUser, (error) => {
    if (error) {
      response.json({ success: false, message: 'The user has not been added' });
    } else {
      response.json({ success: true, message: 'The user has been added' });
    }
  });
});

router.post('/sign-in', (request, response) => {
  const login = request.body.login;
  const password = request.body.password;

  User.getUserByLogin(login, (error, user) => {
    if (error) {
      throw error;
    }
    if (!user) {
      return response.json({ success: false, message: 'Such user has not been found' });
    }
    User.comparePasswords(password, user.password, (error, isMatch) => {
      if (error) {
        throw error;
      }
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), dataBase.secret, {
          expiresIn: 3600 * 24
        });

        response.json({
          success: true,
          token: 'JWT' + token,
          user: {
            id: user._id,
            name: user.name,
            login: user.login,
            email: user.email
          }
        });
      } else {
        return response.json({ success: false, message: 'Passwords do not match' });
      }
    });
  });
});

// router.get('/workers', passport.authenticate('jwt', { session: false }), (request, response) => {
//   response.send('Workers');
// });

module.exports = router;
