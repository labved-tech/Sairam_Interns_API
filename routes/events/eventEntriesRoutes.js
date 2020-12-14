/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const eventEntriesController = require('./../../controllers/events/eventEntriesControllers');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in eventEntriesRoutes');
  next();
});

router.param('id', eventEntriesController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(eventEntriesController.getAllTableEventEntries);

router
  .route('/')
  .get(eventEntriesController.getAllEventEntries)
  .post(eventEntriesController.createEventEntries);
router
  .route('/:id')
  .get(eventEntriesController.getEventEntries)
  .patch(eventEntriesController.updateEventEntries)
  .delete(eventEntriesController.deleteEventEntries);

module.exports = router;
