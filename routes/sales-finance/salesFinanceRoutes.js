/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const addressRouter = require('./addressRoutes');
const deliveryNoteRouter = require('./deliveryNoteRoutes');
const packingListRouter = require('./packingListRoutes');
const perfomaInvoiceRouter = require('./perfomaInvoiceRoutes');
const quotationRouter = require('./quotationRoutes');
const taxInvoiceRouter = require('./taxInvoiceRoutes');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in Sales & Finance Routes');
  next();
});

/* ROUTES */
router.use('/address', addressRouter);
router.use('/delivery-note', deliveryNoteRouter);
router.use('/packing-list', packingListRouter);
router.use('/perfoma-invoice', perfomaInvoiceRouter);
router.use('/quotation', quotationRouter);
router.use('/tax-invoice', taxInvoiceRouter);

module.exports = router;