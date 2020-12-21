/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const projectFilesController = require('../../controllers/project-management/projectFilesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in projectFiles Routes');
  next();
});

router.param('id', projectFilesController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(projectFilesController.getAllTableProjectFiles);

router
  .route('/')
  .get(projectFilesController.getAllProjectFiles)
  .post(projectFilesController.createProjectFiles);
router
  .route('/:id')
  .get(projectFilesController.getProjectFiles)
  .patch(projectFilesController.updateProjectFiles)
  .delete(projectFilesController.deleteProjectFiles);

module.exports = router;
