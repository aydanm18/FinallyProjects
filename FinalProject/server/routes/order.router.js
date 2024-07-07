const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const order_controller = require('../controllers/order.controller');
const endpoints = require('../constants/endpoints');
const OrderModel = require('../models/order.model');
const bodyParser = require('body-parser');
const order_router = express.Router();



order_router.get(endpoints.orders.getAll, order_controller.getAll);
order_router.get(endpoints.orders.getOne, order_controller.getOne);
order_router.delete(endpoints.orders.delete, order_controller.delete);
order_router.patch(endpoints.orders.update, order_controller.update);
order_router.post(endpoints.orders.post, order_controller.post);


order_router.post('/create-checkout-session', async (req, res) => {
  const { formFields, userId, username, email, totalPrice, items } = req.body;

  const newOrder = new OrderModel({
    userId,
    username,
    email,
    totalPrice,
    items,
  formFields,
  });

  try {
    await newOrder.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.itemName,
            images: [item.itemImg],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.count,
      })),
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}success`,
      cancel_url: `${process.env.CLIENT_URL}cancel`,
      metadata: {
        orderId: newOrder._id.toString(),
        userId,
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = order_router;
