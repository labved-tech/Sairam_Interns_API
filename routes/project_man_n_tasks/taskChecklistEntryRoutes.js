/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const taskChecklistEntryController = require('./../../controllers/project_man_n_tasks/taskChecklistEntryController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in taskChecklistEntry Routes');
  next();
});

router.param('id', taskChecklistEntryController.checkID);

/* ROUTES */
router
  .route('/')
  .get(taskChecklistEntryController.getAllTaskChecklistEntry)
  .post(taskChecklistEntryController.createTaskChecklistEntry);
router
  .route('/:id')
  .get(taskChecklistEntryController.getTaskChecklistEntry)
  .patch(taskChecklistEntryController.updateTaskChecklistEntry)
  .delete(taskChecklistEntryController.deleteTaskChecklistEntry);

module.exports = router;
