/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const projectEntriesController = require('../../controllers/project-management/projectEntriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in projectEntries Routes');
  next();
});

router.param('id', projectEntriesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(projectEntriesController.getAllProjectEntries)
  .post(projectEntriesController.createProjectEntries);
router
  .route('/:id')
  .get(projectEntriesController.getProjectEntries)
  .patch(projectEntriesController.updateProjectEntries)
  .delete(projectEntriesController.deleteProjectEntries);

module.exports = router;
