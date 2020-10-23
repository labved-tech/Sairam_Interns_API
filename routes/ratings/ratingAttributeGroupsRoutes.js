/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const ratingAttributeGroupsController = require('./../../controllers/ratings/ratingAttributeGroupsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in ratingAttributeGroupsRoutes');
  next();
});

router.param('id', ratingAttributeGroupsController.checkID);

/* ROUTES */
router
  .route('/')
  .get(ratingAttributeGroupsController.getAllRatingAttributeGroups)
  .post(ratingAttributeGroupsController.createRatingAttributeGroups);
router
  .route('/:id')
  .get(ratingAttributeGroupsController.getRatingAttributeGroups)
  .patch(ratingAttributeGroupsController.updateRatingAttributeGroups)
  .delete(ratingAttributeGroupsController.deleteRatingAttributeGroups);

module.exports = router;