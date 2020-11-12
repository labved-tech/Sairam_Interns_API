/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const ticketCategoriesRouter = require('./ticketCategoriesRoutes');
const ticketEntriesRouter = require('./ticketEntriesRoutes');
const ticketProductsRouter = require('./ticketProductsRoutes');
const ticketResponseRouter = require('./ticketResponseRoutes');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in Ticket & Support Routes');
  next();
});

/* ROUTES */
router.use('/categories', ticketCategoriesRouter);
router.use('/entries', ticketEntriesRouter);
router.use('/products', ticketProductsRouter);
router.use('/response', ticketResponseRouter);

module.exports = router;