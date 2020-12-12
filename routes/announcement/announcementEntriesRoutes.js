/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const announcementEntriesController = require('../../controllers/announcement/announcementEntriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in Announcement Entry Routes');
  next();
});

router.param('id', announcementEntriesController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(announcementEntriesController.getAllTableAnnounementEntries);

router
  .route('/')
  .get(announcementEntriesController.getAllAnnouncementEntries)
  .post(announcementEntriesController.createAnnouncementEntries);
router
  .route('/:id')
  .get(announcementEntriesController.getAnnouncementEntries)
  .patch(announcementEntriesController.updateAnnouncementEntries)
  .delete(announcementEntriesController.deleteAnnouncementEntries);

module.exports = router;
