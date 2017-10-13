'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');



router.get('/items', (req, res, next) => {
  knex('items')
    .where('deleted_at', null)
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

router.delete('/items/:id', (req, res, next) => {
  console.log('deleting items')
  // console.log('working')
  // console.log(req.params)
  let deleted;

  knex('items')
    .where('id', req.params.id)
    .update({
      deleted_at: new Date()
    }, '*')
    .then(function(item) {
      res.send(item);
    })
    // .then(function(row) {
    //   console.log(row)
    //
    //   deleted = row;
    //
    //   return knex('items')
    //     .del()
    //     .where('id', req.params.id)
    // })
    //
    //
    // .then(function() {
    //   res.send(deleted)
    // })

    .catch((err) => {
      next(err);
    })
})

module.exports = router;
