/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const announcementEntriesRouter = require('./announcementEntriesRoutes');
const announcementNotifyRouter = require('./announcementNotifyRoutes');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('Router : Announcement Routes');
  next();
});

/* ROUTES */
router.use('/entries', announcementEntriesRouter);
router.use('/notification', announcementNotifyRouter);

module.exports = router;
