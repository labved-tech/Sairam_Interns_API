/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const commentEntriesController = require('./../../controllers/comments/commentEntriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in commentEntriesRoutes');
  next();
});

router.param('id', commentEntriesController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(commentEntriesController.getAllTableCommentEntries);

router
  .route('/')
  .get(commentEntriesController.getAllCommentEntries)
  .post(commentEntriesController.createCommentEntries);
router
  .route('/:id')
  .get(commentEntriesController.getCommentEntries)
  .patch(commentEntriesController.updateCommentEntries)
  .delete(commentEntriesController.deleteCommentEntries);

module.exports = router;