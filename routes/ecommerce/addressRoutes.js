/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const addressController = require('./../../controllers/ecommerce/addressController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in addressRoutes');
  next();
});

router.param('id', addressController.checkID);

/* ROUTES */
router
  .route('/')
  .get(addressController.getAllAddress)
  .post(addressController.createAddress);
router
  .route('/:id')
  .get(addressController.getAddress)
  .patch(addressController.updateAddress)
  .delete(addressController.deleteAddress);

module.exports = router;
