/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const announcementNotifyController = require('../../controllers/announcement/announcementNotifyController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
    console.log('We are in Announcement Notify Routes');
    next();
  });
  
  router.param('id', announcementNotifyController.checkID);
  
  /* ROUTES */
  router
    .route('/')
    .get(announcementNotifyController.getAllAnnouncementNotify)
    .post(announcementNotifyController.createAnnouncementNotify);
  router
    .route('/:id')
    .get(announcementNotifyController.getAnnouncementNotify)
    .patch(announcementNotifyController.updateAnnouncementNotify)
    .delete(announcementNotifyController.deleteAnnouncementNotify);
  
  module.exports = router;
  