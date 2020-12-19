/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const taskChecklistEntriesController = require('../../controllers/project-management/taskChecklistEntriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in taskChecklistEntries Routes');
  next();
});

router.param('id', taskChecklistEntriesController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(taskChecklistEntriesController.getAllTableTaskChecklistEntries);
router
  .route('/')
  .get(taskChecklistEntriesController.getAllTaskChecklistEntries)
  .post(taskChecklistEntriesController.createTaskChecklistEntries);
router
  .route('/:id')
  .get(taskChecklistEntriesController.getTaskChecklistEntries)
  .patch(taskChecklistEntriesController.updateTaskChecklistEntries)
  .delete(taskChecklistEntriesController.deleteTaskChecklistEntries);

module.exports = router;
