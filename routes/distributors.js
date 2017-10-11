'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');


router.get('/distributors', (req, res, next) => {
  knex('distributors')
    .then((distributors) =>{
      res.send(distributors)
    })
    .catch((err) => {
      next(err);
    })
})

router.get('/distributors/:id/items', (req, res, next) => {
  console.log('working')

  knex('distributors')
    .where('distributors.id', req.params.id)
    .innerJoin('items', 'distributors.id', 'items.distributor_id')
    .select('contact', 'email', 'distributors.name as distributor', 'items.name as item', 'price')
    .then(function(data) {
      console.log(data)
      res.send(data);
    })


})

router.post('/distributors', (req, res, next) => {

  const postObj = req.body;
  postObj.user_id = 1;

  knex('distributors')
    .insert(postObj, '*')
    .then(function(distributor) {
      res.send(distributor)
    })

    .catch((err) => {
      next(err);
    })
})

router.delete('/distributors/:id', (req, res, next) => {
  console.log('working')
  console.log(req.params)
  let deleted;

  knex('distributors')
    .where('id', req.params.id)
    .then(function(row) {
      console.log(row)

      deleted = row;

      return knex('distributors')
        .del()
        .where('id', req.params.id)
    })


    .then(function() {
      res.send(deleted)
    })

    .catch((err) => {
      next(err);
    })
})

module.exports = router;
