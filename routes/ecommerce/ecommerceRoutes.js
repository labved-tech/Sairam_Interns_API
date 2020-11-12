/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const ecommerceAddressRouter = require('./ecommerceAddressRoutes');
const ecommerceLocationsRouter = require('./ecommerceLocationsRoutes');
const ecommerceProductsRouter = require('./ecommerceProductsRoutes');
const ecommerceOrderRouter = require('./ecommerceOrderRoutes');
const ecommerceStockRouter = require('./ecommerceStockRoutes');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in Ecommerce Routes');
  next();
});

/* ROUTES */
router.use('/address', ecommerceAddressRouter);
router.use('/locations', ecommerceLocationsRouter);
router.use('/order', ecommerceOrderRouter);
router.use('/products', ecommerceProductsRouter);
router.use('/stock', ecommerceStockRouter);

module.exports = router;
