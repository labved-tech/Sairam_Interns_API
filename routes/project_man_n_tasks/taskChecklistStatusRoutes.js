/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const taskChecklistStatusController = require('./../../controllers/project_man_n_tasks/taskChecklistStatusController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in taskChecklistStatus Routes');
  next();
});

router.param('id', taskChecklistStatusController.checkID);

/* ROUTES */
router
  .route('/')
  .get(taskChecklistStatusController.getAllTaskChecklistStatus)
  .post(taskChecklistStatusController.createTaskChecklistStatus);
router
  .route('/:id')
  .get(taskChecklistStatusController.getTaskChecklistStatus)
  .patch(taskChecklistStatusController.updateTaskChecklistStatus)
  .delete(taskChecklistStatusController.deleteTaskChecklistStatus);

module.exports = router;
