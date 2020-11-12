/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const farmEntriesRouter = require('./farmEntriesRoutes');
const farmExportedStrategyRouter = require('./farmExportedStrategyRoutes');
const farmRegionsRouter = require('./farmRegionsRoutes');
const farmStrategyRouter = require('./farmStrategyRoutes');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in Precision Agriculture Routes');
  next();
});

/* ROUTES */
router.use('/entries', farmEntriesRouter);
router.use('/exported-strategy', farmExportedStrategyRouter);
router.use('/regions', farmRegionsRouter);
router.use('/strategy', farmStrategyRouter);

module.exports = router;