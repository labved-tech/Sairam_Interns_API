/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const leadEntriesController = require('./../../controllers/leads/leadEntriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in leadEntriesRoutes');
  next();
});

router.param('id', leadEntriesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(leadEntriesController.getAllLeadEntries)
  .post(leadEntriesController.createLeadEntries);
router
  .route('/:id')
  .get(leadEntriesController.getLeadEntries)
  .patch(leadEntriesController.updateLeadEntries)
  .delete(leadEntriesController.deleteLeadEntries);

module.exports = router;

