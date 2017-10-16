'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');


router.post('/orders', (req, res, next) => {
  console.log('req.body for order post', req.body)
  knex('orders')
    .insert({user_id: req.body[0].user_id}, '*')
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

router.get('/users/:id/orders', (req, res, next) =>{
  knex('orders')
  .where('orders.user_id', req.params.id)
  .innerJoin('orders_items', 'orders.id', 'orders_items.order_id')
  .innerJoin('items', 'items.id', 'orders_items.item_id')
  .select('created_at', 'updated_at', 'items.name as item_name', 'quantity', 'orders_items.price as price_paid', 'order_id', 'orders_items.id as id', 'items.id as item_id', 'distributor_id')
  .then(function(orders) {
    console.log(orders);
    res.send(orders);
  })

  .catch((err) => {
    next(err);
  })
})
module.exports = router;
