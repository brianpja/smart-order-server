'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised')

router.get('/users', (req, res, next) => {
  knex('users')
    .then((users) =>{
      res.send(users)
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
          console.log(result);
          res.send(result[0])
        })
    })
})

module.exports = router;
