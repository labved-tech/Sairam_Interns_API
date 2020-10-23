/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const quotationController = require('./../../controllers/sales&finance/quotationController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in Quotation Routes');
  next();
});

router.param('id', quotationController.checkID);

/* ROUTES */
router
  .route('/')
  .get(quotationController.getAllQuotation)
  .post(quotationController.createQuotation);
router
  .route('/:id')
  .get(quotationController.getQuotation)
  .patch(quotationController.updateQuotation)
  .delete(quotationController.deleteQuotation);

module.exports = router;
