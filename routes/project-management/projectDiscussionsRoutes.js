/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const projectDiscussionsController = require('../../controllers/project-management/projectDiscussionsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in Project Discussions Routes');
  next();
});

router.param('id', projectDiscussionsController.checkID);

/* ROUTES */
router
  .route('/')
  .get(projectDiscussionsController.getAllProjectDiscussions)
  .post(projectDiscussionsController.createProjectDiscussions);
router
  .route('/:id')
  .get(projectDiscussionsController.getProjectDiscussions)
  .patch(projectDiscussionsController.updateProjectDiscussions)
  .delete(projectDiscussionsController.deleteProjectDiscussions);

module.exports = router;
