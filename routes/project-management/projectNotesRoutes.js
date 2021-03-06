/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const projectNotesController = require('../../controllers/project-management/projectNotesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in projectNotes Routes');
  next();
});

router.param('id', projectNotesController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(projectNotesController.getAllTableProjectNotes);
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
