/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const leadCategoriesController = require('./../../controllers/leads/leadCategoriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in leadCategoriesRoutes');
  next();
});

router.param('id', leadCategoriesController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(leadCategoriesController.getAllTableLeadCategories);
router
  .route('/')
  .get(leadCategoriesController.getAllLeadCategories)
  .post(leadCategoriesController.createLeadCategories);
router
  .route('/:id')
  .get(leadCategoriesController.getLeadCategories)
  .patch(leadCategoriesController.updateLeadCategories)
  .delete(leadCategoriesController.deleteLeadCategories);

module.exports = router;
