'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');


router.post('/orders', (req, res, next) => {
  
  knex('orders')
    .insert({ user_id: 1 }, '*')
    .then((order) => {

      const orderArray = req.body.map(function(item) {
        const retObj = {
          order_id: order[0].id,
          item_id: item.id,
          quantity: item.qty,
          price: item.price
        }
        return retObj;
      })

      knex('orders_items')
        .insert(orderArray, '*')
        .then((orderedItems) => {
          res.send(orderedItems)
        })
    })
    .catch((err) => {
      next(err);
    })

})

module.exports = router;
