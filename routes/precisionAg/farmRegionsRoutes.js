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
  .get(farmRegionsController.getAllfarmRegions)
  .post(farmRegionsController.createfarmRegions);
router
  .route('/:id')
  .get(farmRegionsController.getfarmRegions)
  .patch(farmRegionsController.updatefarmRegions)
  .delete(farmRegionsController.deletefarmRegions);

module.exports = router;
