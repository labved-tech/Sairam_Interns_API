/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const ratingAttributeController = require('./../../controllers/ratings/ratingAttributeController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in ratingAttributeRoutes');
  next();
});

router.param('id', ratingAttributeController.checkID);

/* ROUTES */
router
  .route('/')
  .get(ratingAttributeController.getAllRatingAttribute)
  .post(ratingAttributeController.createRatingAttribute);
router
  .route('/:id')
  .get(ratingAttributeController.getRatingAttribute)
  .patch(ratingAttributeController.updateRatingAttribute)
  .delete(ratingAttributeController.deleteRatingAttribute);

module.exports = router;