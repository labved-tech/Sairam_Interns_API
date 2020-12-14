/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const performaInvoiceController = require('../../controllers/sales-finance/performaInvoiceController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in PerformaInvoice Routes');
  next();
});

router.param('id', performaInvoiceController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(performaInvoiceController.getAllTablePerformaInvoice);

router
  .route('/')
  .get(performaInvoiceController.getAllPerformaInvoice)
  .post(performaInvoiceController.createPerformaInvoice);
router
  .route('/:id')
  .get(performaInvoiceController.getPerformaInvoice)
  .patch(performaInvoiceController.updatePerformaInvoice)
  .delete(performaInvoiceController.deletePerformaInvoice);

module.exports = router;
