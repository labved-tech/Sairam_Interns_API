/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const chartsController = require('./../../controllers/precisionAg/chartsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in charts Routes');
  next();
});

router.param('id', chartsController.checkID);

/* ROUTES */
router
  .route('/')
  .get(chartsController.getAllcharts)
  .post(chartsController.createcharts);
router
  .route('/:id')
  .get(chartsController.getcharts)
  .patch(chartsController.updatecharts)
  .delete(chartsController.deletecharts);

module.exports = router;
