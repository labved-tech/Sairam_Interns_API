/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const taskTimersController = require('./../../controllers/project_man_n_tasks/taskTimersController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in taskTimers Routes');
  next();
});

router.param('id', taskTimersController.checkID);

/* ROUTES */
router
  .route('/')
  .get(taskTimersController.getAlltaskTimers)
  .post(taskTimersController.createtaskTimers);
router
  .route('/:id')
  .get(taskTimersController.gettaskTimers)
  .patch(taskTimersController.updatetaskTimers)
  .delete(taskTimersController.deletetaskTimers);

module.exports = router;
  