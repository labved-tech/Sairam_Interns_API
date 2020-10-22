/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const projectMembersController = require('./../../controllers/project_man_n_tasks/projectMembersController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in projectMembers Routes');
  next();
});

router.param('id', projectMembersController.checkID);

/* ROUTES */
router
  .route('/')
  .get(projectMembersController.getAllprojectMembers)
  .post(projectMembersController.createprojectMembers);
router
  .route('/:id')
  .get(projectMembersController.getprojectMembers)
  .patch(projectMembersController.updateprojectMembers)
  .delete(projectMembersController.deleteprojectMembers);

module.exports = router;
