/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const addressController = require('../../controllers/ecommerce/ecommerceAddressController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in addressRoutes');
  next();
});

router.param('id', addressController.checkID);

/* ROUTES */
router
  .route('/')
  .get(addressController.getAllEcommerceAddress)
  .post(addressController.createEcommerceAddress);
router
  .route('/:id')
  .get(addressController.getEcommerceAddress)
  .patch(addressController.updateEcommerceAddress)
  .delete(addressController.deleteEcommerceAddress);

module.exports = router;
