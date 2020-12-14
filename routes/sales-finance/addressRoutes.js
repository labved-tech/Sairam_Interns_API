/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const addressController = require('./../../controllers/sales-finance/addressController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in Address Routes');
  next();
});

router.param('id', addressController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(addressController.getAllTableAddress);
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
