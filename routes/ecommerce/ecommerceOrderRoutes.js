/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const ecommerceOrderController = require('./../../controllers/ecommerce/ecommerceOrderController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in ecommerceOrderRoutes');
  next();
});

router.param('id', ecommerceOrderController.checkID);

/* ROUTES */
router
  .route('/')
  .get(ecommerceOrderController.getAllEcommerceOrder)
  .post(ecommerceOrderController.createEcommerceOrder);
router
  .route('/:id')
  .get(ecommerceOrderController.getEcommerceOrder)
  .patch(ecommerceOrderController.updateEcommerceOrder)
  .delete(ecommerceOrderController.deleteEcommerceOrder);

module.exports = router;