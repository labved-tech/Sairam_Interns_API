/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const perfomaInvoiceController = require('./../../controllers/sales&finance/perfomaInvoiceController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in PerfomaInvoice Routes');
  next();
});

router.param('id', perfomaInvoiceController.checkID);

/* ROUTES */
router
  .route('/')
  .get(perfomaInvoiceController.getAllPerfomaInvoice)
  .post(perfomaInvoiceController.createPerfomaInvoice);
router
  .route('/:id')
  .get(perfomaInvoiceController.getPerfomaInvoice)
  .patch(perfomaInvoiceController.updatePerfomaInvoice)
  .delete(perfomaInvoiceController.deletePerfomaInvoice);

module.exports = router;
