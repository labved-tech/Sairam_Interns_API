/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const ecommerceStockController = require('./../../controllers/ecommerce/ecommerceStockController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in ecommerceStockRoutes');
  next();
});

router.param('id', ecommerceStockController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(ecommerceStockController.getAllTableEcommerceStock);
router
  .route('/')
  .get(ecommerceStockController.getAllEcommerceStock)
  .post(ecommerceStockController.createEcommerceStock);
router
  .route('/:id')
  .get(ecommerceStockController.getEcommerceStock)
  .patch(ecommerceStockController.updateEcommerceStock)
  .delete(ecommerceStockController.deleteEcommerceStock);

module.exports = router;