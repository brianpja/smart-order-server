'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised')
const boom = require('boom')
const jwt = require('jsonwebtoken')

router.get('/token', (req, res) => {
  console.log('req.cookies:', req.cookies)
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return res.send(false);
    }
    console.log('payload:', payload)
    res.send({loggedIn: true, id: payload.userId});
  });
});


router.post('/token', (req, res, next) => {
  let user;
  const login = req.body;
  console.log(login)

  knex('users')
    .where('email', login.email)
    .first()
    .then(function(row) {
      console.log(row)
      if(!row) {
        throw boom.create(400, 'Bad email or password')
      }
      user = row;
      return bcrypt.compare(login.password, user.hashed_password)
    })

    .then(function() {

      const claim = { userId: user.id };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days'
      });

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),  // 7 days
        secure: router.get('env') === 'production'
      });

      console.log('great work')
      delete user.hashed_password;
      res.send(user);
    })

    .catch(bcrypt.MISMATCH_ERROR, function() {
      console.log('you suck')
      throw boom.create(400, 'Bad email or password')
    })

    .catch((err) => {
      next(err);
    })
})


router.delete('/token', (req, res) => {
  res.clearCookie('token');
  res.end();
});

module.exports = router;
