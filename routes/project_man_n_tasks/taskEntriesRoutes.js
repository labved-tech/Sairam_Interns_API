/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const taskEntriesController = require('./../../controllers/project_man_n_tasks/taskEntriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in taskEntries Routes');
  next();
});

router.param('id', taskEntriesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(taskEntriesController.getAlltaskEntries)
  .post(taskEntriesController.createtaskEntries);
router
  .route('/:id')
  .get(taskEntriesController.gettaskEntries)
  .patch(taskEntriesController.updatetaskEntries)
  .delete(taskEntriesController.deletetaskEntries);

module.exports = router;
