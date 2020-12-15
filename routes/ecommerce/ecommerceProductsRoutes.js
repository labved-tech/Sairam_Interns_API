/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const ecommerceProductsController = require('./../../controllers/ecommerce/ecommerceProductsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in ecommerceProductsRoutes');
  next();
});

router.param('id', ecommerceProductsController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(ecommerceProductsController.getAllTableEcommerceProducts);

router
  .route('/')
  .get(ecommerceProductsController.getAllEcommerceProducts)
  .post(ecommerceProductsController.createEcommerceProducts);
router
  .route('/:id')
  .get(ecommerceProductsController.getEcommerceProducts)
  .patch(ecommerceProductsController.updateEcommerceProducts)
  .delete(ecommerceProductsController.deleteEcommerceProducts);

module.exports = router;