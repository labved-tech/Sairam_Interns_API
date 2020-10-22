/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const projectFilesController = require('./../../controllers/project_man_n_tasks/projectFilesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in projectFiles Routes');
  next();
});

router.param('id', projectFilesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(projectFilesController.getAllprojectFiles)
  .post(projectFilesController.createprojectFiles);
router
  .route('/:id')
  .get(projectFilesController.getprojectFiles)
  .patch(projectFilesController.updateprojectFiles)
  .delete(projectFilesController.deleteprojectFiles);

module.exports = router;
