/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const projectTaskStatusController = require('../../controllers/project-management/projectTaskStatusController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in projectTaskStatus Routes');
  next();
});

router.param('id', projectTaskStatusController.checkID);

/* ROUTES */
router
  .route('/')
  .get(projectTaskStatusController.getAllProjectTaskStatus)
  .post(projectTaskStatusController.createProjectTaskStatus);
router
  .route('/:id')
  .get(projectTaskStatusController.getProjectTaskStatus)
  .patch(projectTaskStatusController.updateProjectTaskStatus)
  .delete(projectTaskStatusController.deleteProjectTaskStatus);

module.exports = router;
