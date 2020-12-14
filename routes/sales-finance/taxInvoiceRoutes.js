/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const taxInvoiceController = require('./../../controllers/sales-finance/taxInvoiceController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in TaxInvoice Routes');
  next();
});

router.param('id', taxInvoiceController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(taxInvoiceController.getAllTableTaxInvoice);

router
  .route('/')
  .get(taxInvoiceController.getAllTaxInvoice)
  .post(taxInvoiceController.createTaxInvoice);
router
  .route('/:id')
  .get(taxInvoiceController.getTaxInvoice)
  .patch(taxInvoiceController.updateTaxInvoice)
  .delete(taxInvoiceController.deleteTaxInvoice);

module.exports = router;
