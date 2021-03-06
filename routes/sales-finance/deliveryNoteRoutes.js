/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const deliveryNoteController = require('./../../controllers/sales-finance/deliveryNoteController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in Delivery Note Routes');
  next();
});

router.param('id', deliveryNoteController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(deliveryNoteController.getAllTableDeliveryNote);
router
  .route('/')
  .get(deliveryNoteController.getAllDeliveryNote)
  .post(deliveryNoteController.createDeliveryNote);
router
  .route('/:id')
  .get(deliveryNoteController.getDeliveryNote)
  .patch(deliveryNoteController.updateDeliveryNote)
  .delete(deliveryNoteController.deleteDeliveryNote);

module.exports = router;
