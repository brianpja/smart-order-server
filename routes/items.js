'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');



router.get('/items', (req, res, next) => {
  knex('items')
    .then((items) =>{
      res.send(items)
    })
    .catch((err) => {
      next(err);
    })
})

router.post('/items', (req, res, next) => {
  console.log(req.body);
  knex('items')
    .insert(req.body, '*')
    .then(function(newItem) {
      res.send(newItem);
    })

    .catch((err) => {
      next(err);
    })
})

module.exports = router;
