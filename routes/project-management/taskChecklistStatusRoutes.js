/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const taskChecklistStatusController = require('../../controllers/project-management/taskChecklistStatusController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in taskChecklistStatus Routes');
  next();
});

router.param('id', taskChecklistStatusController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(taskChecklistStatusController.getAllTableTaskChecklistStatus);
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
