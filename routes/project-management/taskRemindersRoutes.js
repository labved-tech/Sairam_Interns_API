/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const taskRemindersController = require('../../controllers/project-management/taskRemindersController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in taskReminders Routes');
  next();
});

router.param('id', taskRemindersController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(taskRemindersController.getAllTableTaskReminders);

router
  .route('/')
  .get(taskRemindersController.getAllTaskReminders)
  .post(taskRemindersController.createTaskReminders);
router
  .route('/:id')
  .get(taskRemindersController.getTaskReminders)
  .patch(taskRemindersController.updateTaskReminders)
  .delete(taskRemindersController.deleteTaskReminders);

module.exports = router;
