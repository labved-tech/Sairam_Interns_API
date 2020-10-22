/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const projectActivityController = require('./../../controllers/project_man_n_tasks/projectActivityController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in projectActivity Routes');
  next();
});

router.param('id', projectActivityController.checkID);

/* ROUTES */
router
  .route('/')
  .get(projectActivityController.getAllProjectActivity)
  .post(projectActivityController.createProjectActivity);
router
  .route('/:id')
  .get(projectActivityController.getProjectActivity)
  .patch(projectActivityController.updateProjectActivity)
  .delete(projectActivityController.deleteProjectActivity);

module.exports = router;
