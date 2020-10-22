/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const farmStrategyController = require('./../../controllers/precisionAg/farmStrategyController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in farmStrategy Routes');
  next();
});

router.param('id', farmStrategyController.checkID);

/* ROUTES */
router
  .route('/')
  .get(farmStrategyController.getAllfarmStrategy)
  .post(farmStrategyController.createfarmStrategy);
router
  .route('/:id')
  .get(farmStrategyController.getfarmStrategy)
  .patch(farmStrategyController.updatefarmStrategy)
  .delete(farmStrategyController.deletefarmStrategy);

module.exports = router;
