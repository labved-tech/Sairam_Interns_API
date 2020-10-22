/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const leadCategoriesController = require('./../../controllers/leads/leadCategoriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in leadCategories Routes');
  next();
});

router.param('id', leadCategoriesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(leadCategoriesController.getAllleadCategories)
  .post(leadCategoriesController.createleadCategories);
router
  .route('/:id')
  .get(leadCategoriesController.getleadCategories)
  .patch(leadCategoriesController.updateleadCategories)
  .delete(leadCategoriesController.deleteleadCategories);

module.exports = router;
