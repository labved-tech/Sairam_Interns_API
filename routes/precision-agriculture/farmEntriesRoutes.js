/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const farmEntriesController = require('../../controllers/precision-agriculture/farmEntriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in farmEntries Routes');
  next();
});

router.param('id', farmEntriesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(farmEntriesController.getAllFarmEntries)
  .post(farmEntriesController.createFarmEntries);
router
  .route('/:id')
  .get(farmEntriesController.getFarmEntries)
  .patch(farmEntriesController.updateFarmEntries)
  .delete(farmEntriesController.deleteFarmEntries);

module.exports = router;
