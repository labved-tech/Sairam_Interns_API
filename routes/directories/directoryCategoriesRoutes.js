/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const directoryCategoriesController = require('./../../controllers/directories/directoryCategoriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in directoryCategoriesRoutes');
  next();
});

router.param('id', directoryCategoriesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(directoryCategoriesController.getAllDirectoryCategories)
  .post(directoryCategoriesController.createDirectoryCategories);
router
  .route('/:id')
  .get(directoryCategoriesController.getDirectoryCategories)
  .patch(directoryCategoriesController.updateDirectoryCategories)
  .delete(directoryCategoriesController.deleteDirectoryCategories);

module.exports = router;
