/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const projectDiscussionCommentsController = require('../../controllers/project_man_n_tasks/projectDiscussionCommentsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in projectDiscussionComments Routes');
  next();
});

router.param('id', projectDiscussionCommentsController.checkID);

/* ROUTES */
router
  .route('/')
  .get(projectDiscussionCommentsController.getAllprojectDiscussionComments)
  .post(projectDiscussionCommentsController.createprojectDiscussionComments);
router
  .route('/:id')
  .get(projectDiscussionCommentsController.getprojectDiscussionComments)
  .patch(projectDiscussionCommentsController.updateprojectDiscussionComments)
  .delete(projectDiscussionCommentsController.deleteprojectDiscussionComments);

module.exports = router;
