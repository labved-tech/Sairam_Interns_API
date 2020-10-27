/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const projectTaskFilesController = require('../../controllers/project-management/projectTaskFilesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in projectTaskFiles Routes');
  next();
});

router.param('id', projectTaskFilesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(projectTaskFilesController.getAllProjectTaskFiles)
  .post(projectTaskFilesController.createProjectTaskFiles);
router
  .route('/:id')
  .get(projectTaskFilesController.getProjectTaskFiles)
  .patch(projectTaskFilesController.updateProjectTaskFiles)
  .delete(projectTaskFilesController.deleteProjectTaskFiles);

module.exports = router;
