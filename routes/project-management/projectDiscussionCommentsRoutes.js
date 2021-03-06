/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const projectDiscussionCommentsController = require('../../controllers/project-management/projectDiscussionCommentsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in projectDiscussionComments Routes');
  next();
});

router.param('id', projectDiscussionCommentsController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(projectDiscussionCommentsController.getAllTableProjectDiscussionComments);

router
  .route('/')
  .get(projectDiscussionCommentsController.getAllProjectDiscussionComments)
  .post(projectDiscussionCommentsController.createProjectDiscussionComments);
router
  .route('/:id')
  .get(projectDiscussionCommentsController.getProjectDiscussionComments)
  .patch(projectDiscussionCommentsController.updateProjectDiscussionComments)
  .delete(projectDiscussionCommentsController.deleteProjectDiscussionComments);

module.exports = router;
