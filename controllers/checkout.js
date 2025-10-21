const express = require('express');
const checkRouter = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

checkRouter.post('/', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Cono̅ tipo Arábico' },
            unit_amount: 800,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Cono̅ Geisha - Grande' },
            unit_amount: 1600,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      shipping_address_collection: { allowed_countries: ['US', 'CA', 'VE', 'CO'] },
      success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: 'Error al crear la sesión de pago' });
  }
});

module.exports = checkRouter;
