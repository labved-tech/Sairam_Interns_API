/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const contractEntriesController = require('../../controllers/contract/contractEntriesControllers');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in contractEntriesRoutes');
  next();
});

router.param('id', contractEntriesController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(contractEntriesController.getAllTableContractCategories);
router
  .route('/')
  .get(contractEntriesController.getAllContractEntries)
  .post(contractEntriesController.createContractEntries);
router
  .route('/:id')
  .get(contractEntriesController.getContractEntries)
  .patch(contractEntriesController.updateContractEntries)
  .delete(contractEntriesController.deleteContractEntries);

module.exports = router;
