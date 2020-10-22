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
  .get(projectAdminsController.getAllprojectAdmins)
  .post(projectAdminsController.createprojectAdmins);
router
  .route('/:id')
  .get(projectAdminsController.getprojectAdmins)
  .patch(projectAdminsController.updateprojectAdmins)
  .delete(projectAdminsController.deleteprojectAdmins);

module.exports = router;
