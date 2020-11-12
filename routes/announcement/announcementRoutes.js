/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const announcementEntriesRouter = require('./announcementEntriesRoutes');
const announcementNotifyRouter = require('./announcementNotifyRoutes');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in Announcement Routes');
  next();
});

/* ROUTES */
router.use('/entries', announcementEntriesRouter);
router.use('/notify', announcementNotifyRouter);

module.exports = router;
