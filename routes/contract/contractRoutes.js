/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const contractEntriesRouter = require('./contractEntriesRoutes');
const contractTemplatesRouter = require('./contractTemplatesRoutes');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in Contract Routes');
  next();
});

/* ROUTES */
router.use('/Entries', contractEntriesRouter);
router.use('/Templates', contractTemplatesRouter);

module.exports = router;
