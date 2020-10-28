/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const ecommerceAddressController = require('../../controllers/ecommerce/ecommerceAddressController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in Ecommerce Address Routes');
  next();
});

router.param('id', ecommerceAddressController.checkID);

/* ROUTES */
router
  .route('/')
  .get(ecommerceAddressController.getAllEcommerceAddress)
  .post(ecommerceAddressController.createEcommerceAddress);
router
  .route('/:id')
  .get(ecommerceAddressController.getEcommerceAddress)
  .patch(ecommerceAddressController.updateEcommerceAddress)
  .delete(ecommerceAddressController.deleteEcommerceAddress);

module.exports = router;
