/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const projectTaskFilesController = require('./../../controllers/project_man_n_tasks/projectTaskFilesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in projectTaskFiles Routes');
  next();
});

router.param('id', projectTaskFilesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(projectTaskFilesController.getAllprojectTaskFiles)
  .post(projectTaskFilesController.createprojectTaskFiles);
router
  .route('/:id')
  .get(projectTaskFilesController.getprojectTaskFiles)
  .patch(projectTaskFilesController.updateprojectTaskFiles)
  .delete(projectTaskFilesController.deleteprojectTaskFiles);

module.exports = router;
