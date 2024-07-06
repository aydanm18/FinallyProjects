const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const order_controller = require('../controllers/order.controller');
const endpoints = require('../constants/endpoints');
const order_router = express.Router();

order_router.get(endpoints.orders.getAll, order_controller.getAll);
order_router.get(endpoints.orders.getOne, order_controller.getOne);
order_router.delete(endpoints.orders.delete, order_controller.delete);
order_router.patch(endpoints.orders.update, order_controller.update);
order_router.post(endpoints.orders.post, order_controller.post);

order_router.post('/create-checkout-session', async (req, res) => {
    try {
      const { menues } = req.body;
  
     
      if (!menues || !Array.isArray(menues)) {
        return res.status(400).json({ error: 'Invalid request body' });
      }
  
     
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: menues.map(menu => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: menu.title,
              images: [menu.image],
            },
            unit_amount: menu.price * 100,
          },
          quantity: menu.count,
        })),
        mode: 'payment',
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
      });
  
      res.json({ id: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = order_router;