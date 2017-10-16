'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');



router.get('/users/:id/items', (req, res, next) => {
  knex('items')
    .where('user_id', req.params.id)
    .where('deleted_at', null)
    .then((items) =>{
      res.send(items)
    })
    .catch((err) => {
      next(err);
    })
})

router.post('/items', (req, res, next) => {
  knex('items')
    .insert(req.body, '*')
    .then(function(newItem) {
      res.send(newItem);
    })

    .catch((err) => {
      next(err);
    })
})

router.delete('/items/:id', (req, res, next) => {
  knex('items')
    .where('id', req.params.id)
    .update({
      deleted_at: new Date()
    }, '*')
    .then(function(item) {
      res.send(item);
    })

    .catch((err) => {
      next(err);
    })
})

module.exports = router;
