/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const leadEntriesRouter = require('./leadEntriesRoutes');
const leadCategoriesRouter = require('./leadCategoriesRoutes');
const leadResponseRouter = require('./leadResponseRoutes');
/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in Leads Routes');
  next();
});

/* ROUTES */
router.use('/entries', leadEntriesRouter);
router.use('/response', leadResponseRouter);
router.use('/categories', leadCategoriesRouter);

module.exports = router;