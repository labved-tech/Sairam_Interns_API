/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const projectTaskStatusController = require('./../../controllers/project_man_n_tasks/projectTaskStatusController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in projectTaskStatus Routes');
  next();
});

router.param('id', projectTaskStatusController.checkID);

/* ROUTES */
router
  .route('/')
  .get(projectTaskStatusController.getAllprojectTaskStatus)
  .post(projectTaskStatusController.createprojectTaskStatus);
router
  .route('/:id')
  .get(projectTaskStatusController.getprojectTaskStatus)
  .patch(projectTaskStatusController.updateprojectTaskStatus)
  .delete(projectTaskStatusController.deleteprojectTaskStatus);

module.exports = router;
