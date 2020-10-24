/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const contractEntriesController = require('./../../controllers/contractEntriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in contractEntriesRoutes');
  next();
});

router.param('id', contractEntriesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(contractEntriesController.getAllcontractEntries)
  .post(contractEntriesController.createcontractEntries);
router
  .route('/:id')
  .get(contractEntriesController.getcontractEntries)
  .patch(contractEntriesController.updatecontractEntries)
  .delete(contractEntriesController.deletecontractEntries);

module.exports = router;
