const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


//Controllers
const contactRouter = require('./controllers/contact');
const checkRouter = require('./controllers/checkout');
const cancel = require('./controllers/cancel');



(async() => {
  try{
    await mongoose.connect(process.env.MONGO_URI_TEST);
    console.log('Conectado a MongoDB');
  }  catch(error) {
    console.log(error);
  }
})();


//middleware
app.use(cors());

//RUTAS FRONTEND
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/styles', express.static(path.resolve('views', 'styles')));
app.use('/assests', express.static(path.resolve('views', 'assests')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/success', express.static(path.resolve('views', 'success')));
app.use('/home_cart', express.static(path.resolve('views', 'home_cart')));
app.use('/checkout', express.static(path.resolve('views', 'checkout')));
app.use('/shop_cart', express.static(path.resolve('views', 'shop_cart')))



//RUTAS BACKEND
app.use('/api/contact', contactRouter);
app.use('/api/checkout', checkRouter);
// app.use('/api/checkoutsuccess', successCheckout);
app.get('/cancel', (req, res) => {
  res.redirect('/');
});

module.exports = app;

