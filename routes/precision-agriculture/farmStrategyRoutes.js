/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const farmStrategyController = require('../../controllers/precision-agriculture/farmStrategyController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in farmStrategy Routes');
  next();
});

router.param('id', farmStrategyController.checkID);

/* ROUTES */
router
  .route('/')
  .get(farmStrategyController.getAllFarmStrategy)
  .post(farmStrategyController.createFarmStrategy);
router
  .route('/:id')
  .get(farmStrategyController.getFarmStrategy)
  .patch(farmStrategyController.updateFarmStrategy)
  .delete(farmStrategyController.deleteFarmStrategy);

module.exports = router;
