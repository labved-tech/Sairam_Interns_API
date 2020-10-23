/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const farmExportedStrategyController = require('./../../controllers/precisionAg/farmExportedStrategyController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in farmExportedStrategy Routes');
  next();
});

router.param('id', farmExportedStrategyController.checkID);

/* ROUTES */
router
  .route('/')
  .get(farmExportedStrategyController.getAllFarmExportedStrategy)
  .post(farmExportedStrategyController.createFarmExportedStrategy);
router
  .route('/:id')
  .get(farmExportedStrategyController.getFarmExportedStrategy)
  .patch(farmExportedStrategyController.updateFarmExportedStrategy)
  .delete(farmExportedStrategyController.deleteFarmExportedStrategy);

module.exports = router;
