'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken')

router.get('/users', (req, res, next) => {
  knex('users')
    .then((users) =>{
      res.send(users)
    })
    .catch((err) => {
      next(err);
    })
})

router.get('/users/:id', (req, res, next) =>{
  knex('users')
    .where('id', req.params.id)
    .then((user) => {
      console.log('user:', user)
      user = user[0];
      delete user.hashed_password;
      res.send(user)
    })
    .catch((err) => {
      next(err);
    })
})

router.post('/users', (req, res, next) => {
  console.log(req.body)
  const userData = req.body;

  console.log(userData)
  bcrypt.hash(userData.password, 12)
    .then(function(hashed_password) {
      delete userData.password;
      userData.hashed_password = hashed_password;
      console.log('after hash:', userData)

      knex('users')
        .insert(userData, '*')
        .then(function(result) {
          result = result[0]

          const claim = { userId: result.id };
          const token = jwt.sign(claim, process.env.JWT_KEY, {
            expiresIn: '7 days'
          });

          res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),  // 7 days
            secure: router.get('env') === 'production'
          });

          delete result.hashed_password;
          res.send(result)
        })
    })
})

module.exports = router;
