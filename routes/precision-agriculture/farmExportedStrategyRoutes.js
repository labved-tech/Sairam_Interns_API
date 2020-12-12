/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const farmExportedStrategyController = require('../../controllers/precision-agriculture/farmExportedStrategyController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in farmExportedStrategy Routes');
  next();
});

router.param('id', farmExportedStrategyController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(farmExportedStrategyController.getAllTableFarmExportedStrategy);
router
  .route('/')
  .get(farmExportedStrategyController.getAllFarmExportedStrategy)
  .post(farmExportedStrategyController.createFarmExportedStrategy);
router
  .route('/:id')
  .patch(farmExportedStrategyController.updateFarmExportedStrategy)
  .delete(farmExportedStrategyController.deleteFarmExportedStrategy);

router
  .route('/:id')
  .get(farmExportedStrategyController.getFarmExportedStrategy);

module.exports = router;
