/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const projectNotesController = require('./../../controllers/project_man_n_tasks/projectNotesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in projectNotes Routes');
  next();
});

router.param('id', projectNotesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(projectNotesController.getAllprojectNotes)
  .post(projectNotesController.createprojectNotes);
router
  .route('/:id')
  .get(projectNotesController.getprojectNotes)
  .patch(projectNotesController.updateprojectNotes)
  .delete(projectNotesController.deleteprojectNotes);

module.exports = router;
