/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const farmRegionsController = require('./../../controllers/precisionAg/farmRegionsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in farmRegions Routes');
  next();
});

router.param('id', farmRegionsController.checkID);

/* ROUTES */
router
  .route('/')
  .get(farmRegionsController.getAllFarmRegions)
  .post(farmRegionsController.createFarmRegions);
router
  .route('/:id')
  .get(farmRegionsController.getFarmRegions)
  .patch(farmRegionsController.updateFarmRegions)
  .delete(farmRegionsController.deleteFarmRegions);

module.exports = router;
