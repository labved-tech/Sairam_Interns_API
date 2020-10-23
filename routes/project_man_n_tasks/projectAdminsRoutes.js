/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const projectAdminsController = require('../../controllers/project_man_n_tasks/projectAdminsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in projectAdmins Routes');
  next();
});

router.param('id', projectAdminsController.checkID);

/* ROUTES */
router
  .route('/')
  .get(projectAdminsController.getAllProjectAdmins)
  .post(projectAdminsController.createProjectAdmins);
router
  .route('/:id')
  .get(projectAdminsController.getProjectAdmins)
  .patch(projectAdminsController.updateProjectAdmins)
  .delete(projectAdminsController.deleteProjectAdmins);

module.exports = router;
