/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const ratingEntriesController = require('./../../controllers/ratings/ratingEntriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in ratingEntriesRoutes');
  next();
});

router.param('id', ratingEntriesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(ratingEntriesController.getAllRatingEntries)
  .post(ratingEntriesController.createRatingEntries);
router
  .route('/:id')
  .get(ratingEntriesController.getRatingEntries)
  .patch(ratingEntriesController.updateRatingEntries)
  .delete(ratingEntriesController.deleteRatingEntries);

module.exports = router;