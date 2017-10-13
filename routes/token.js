'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised')
const boom = require('boom')



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

module.exports = router;
