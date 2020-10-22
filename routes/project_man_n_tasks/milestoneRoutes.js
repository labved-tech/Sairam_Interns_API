/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const milestoneController = require('./../../controllers/project_man_n_tasks/milestoneController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in milestone Routes');
  next();
});

router.param('id', milestoneController.checkID);

/* ROUTES */
router
  .route('/')
  .get(milestoneController.getAllmilestone)
  .post(milestoneController.createmilestone);
router
  .route('/:id')
  .get(milestoneController.getmilestone)
  .patch(milestoneController.updatemilestone)
  .delete(milestoneController.deletemilestone);

module.exports = router;
