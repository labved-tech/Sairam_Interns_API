/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const eventEntriesController = require('./../../controllers/eventEntriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in eventEntriesRoutes');
  next();
});

router.param('id', eventEntriesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(eventEntriesController.getAlleventEntries)
  .post(eventEntriesController.createeventEntries);
router
  .route('/:id')
  .get(eventEntriesController.geteventEntries)
  .patch(eventEntriesController.updateeventEntries)
  .delete(eventEntriesController.deleteeventEntries);

module.exports = router;
