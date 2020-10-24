/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const ratingAttributeGroupsController = require('../../controllers/ratings/ratingAttributeGroupsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in ratingAttributeGroupsRoutes');
  next();
});

router.param('id', ratingAttributeGroupsController.checkID);

/* ROUTES */
router
  .route('/')
  .get(ratingAttributeGroupsController.getAllRatingAttributeGroup)
  .post(ratingAttributeGroupsController.createRatingAttributeGroup);
router
  .route('/:id')
  .get(ratingAttributeGroupsController.getRatingAttributeGroup)
  .patch(ratingAttributeGroupsController.updateRatingAttributeGroup)
  .delete(ratingAttributeGroupsController.deleteRatingAttributeGroup);

module.exports = router;