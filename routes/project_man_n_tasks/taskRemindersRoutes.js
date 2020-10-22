/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const taskRemindersController = require('./../../controllers/project_man_n_tasks/taskRemindersController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in taskReminders Routes');
  next();
});

router.param('id', taskRemindersController.checkID);

/* ROUTES */
router
  .route('/')
  .get(taskRemindersController.getAlltaskReminders)
  .post(taskRemindersController.createtaskReminders);
router
  .route('/:id')
  .get(taskRemindersController.gettaskReminders)
  .patch(taskRemindersController.updatetaskReminders)
  .delete(taskRemindersController.deletetaskReminders);

module.exports = router;
