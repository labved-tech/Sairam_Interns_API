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
  .get(projectNotesController.getAllProjectNotes)
  .post(projectNotesController.createProjectNotes);
router
  .route('/:id')
  .get(projectNotesController.getProjectNotes)
  .patch(projectNotesController.updateProjectNotes)
  .delete(projectNotesController.deleteProjectNotes);

module.exports = router;
