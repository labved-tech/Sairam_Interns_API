/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const taskTimersController = require('../../controllers/project-management/taskTimersController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in taskTimers Routes');
  next();
});

router.param('id', taskTimersController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(taskTimersController.getAllTableTaskTimers);
router
  .route('/')
  .get(taskTimersController.getAllTaskTimers)
  .post(taskTimersController.createTaskTimers);
router
  .route('/:id')
  .get(taskTimersController.getTaskTimers)
  .patch(taskTimersController.updateTaskTimers)
  .delete(taskTimersController.deleteTaskTimers);

module.exports = router;
