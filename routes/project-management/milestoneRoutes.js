/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const milestoneController = require('../../controllers/project-management/milestoneController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in milestone Routes');
  next();
});

router.param('id', milestoneController.checkID);

/* ROUTES */
router
  .route('/')
  .get(milestoneController.getAllMilestone)
  .post(milestoneController.createMilestone);
router
  .route('/:id')
  .get(milestoneController.getMilestone)
  .patch(milestoneController.updateMilestone)
  .delete(milestoneController.deleteMilestone);

module.exports = router;
