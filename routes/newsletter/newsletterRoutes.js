/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const newsletterEntriesRouter = require('./newsletterEntriesRoutes');
const newsletterMessagesRouter = require('./newsletterMessagesRoutes');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in Newsletter Routes');
  next();
});

/* ROUTES */
router.use('/entries', newsletterEntriesRouter);
router.use('/messages', newsletterMessagesRouter);

module.exports = router;