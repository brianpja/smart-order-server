'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');


router.get('/users/:id/distributors', (req, res, next) => {
  knex('distributors')
    .where('user_id', req.params.id)
    .where('deleted_at', null)
    .then((distributors) =>{
      res.send(distributors)
    })
    .catch((err) => {
      next(err);
    })
})

router.get('/distributors/:id/items', (req, res, next) => {
  knex('distributors')
    .where('distributors.id', req.params.id)
    .innerJoin('items', 'distributors.id', 'items.distributor_id')
    .where('items.deleted_at', null)
    .select('distributors.id as dist_id', 'items.id as id', 'contact', 'email', 'distributors.name as distributor', 'items.name as item', 'price')

    .then(function(data) {
      res.send(data);
    })


})

router.post('/distributors', (req, res, next) => {
  const postObj = req.body;

  knex('distributors')
    .insert(postObj, '*')
    .then(function(distributor) {
      res.send(distributor)
    })

    .catch((err) => {
      next(err);
    })
})

router.patch('/distributors/:id', (req, res, next) => {
  knex('distributors')
    .where('id', req.params.id)
    .update({
      user_id: req.body.user_id,
      name: req.body.name,
      contact: req.body.contact,
      email: req.body.email
    }, '*')
    .then(function(dist) {
      res.send(dist[0]);
    })
    .catch((err) => {
      next(err);
    })
})

router.delete('/distributors/:id', (req, res, next) => {
  knex('distributors')
    .where('id', req.params.id)
    .update({
      deleted_at: new Date()
    }, '*')
    .then(function() {
      return knex('items')
        .where('distributor_id', req.params.id)
        .update({
          deleted_at: new Date()
        }, '*')
    })
    .then(function(result) {
      res.send(result)
    })

    .catch((err) => {
      next(err);
    })
})

module.exports = router;
