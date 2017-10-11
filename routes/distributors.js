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

router.post('/distributors', (req, res, next) => {

  knex('distributors')
    .insert(req.body, '*')
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
