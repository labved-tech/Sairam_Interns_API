/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const projectDiscussionsController = require('./../../controllers/project_man_n_tasks/projectDiscussionsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in projectDiscussions Routes');
  next();
});

router.param('id', projectDiscussionsController.checkID);

/* ROUTES */
router
  .route('/')
  .get(projectDiscussionsController.getAllprojectDiscussions)
  .post(projectDiscussionsController.createprojectDiscussions);
router
  .route('/:id')
  .get(projectDiscussionsController.getprojectDiscussions)
  .patch(projectDiscussionsController.updateprojectDiscussions)
  .delete(projectDiscussionsController.deleteprojectDiscussions);

module.exports = router;
