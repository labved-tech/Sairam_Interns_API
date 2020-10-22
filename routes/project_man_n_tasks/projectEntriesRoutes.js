
/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const projectEntriesController = require('./../../controllers/project_man_n_tasks/projectEntriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in projectEntries Routes');
  next();
});

router.param('id', projectEntriesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(projectEntriesController.getAllprojectEntries)
  .post(projectEntriesController.createprojectEntries);
router
  .route('/:id')
  .get(projectEntriesController.getprojectEntries)
  .patch(projectEntriesController.updateprojectEntries)
  .delete(projectEntriesController.deleteprojectEntries);

module.exports = router;
