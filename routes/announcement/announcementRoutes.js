/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const announcementController = require('./../../controllers/announcement/announcementController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in Announcement Entry Routes');
  next();
});

router.param('id', announcementController.checkID);

/* ROUTES */
router
  .route('/')
  .get(announcementController.getAllExample)
  .post(announcementController.createExample);
router
  .route('/:id')
  .get(announcementController.getExample)
  .patch(announcementController.updateExample)
  .delete(announcementController.deleteExample);

module.exports = router;


