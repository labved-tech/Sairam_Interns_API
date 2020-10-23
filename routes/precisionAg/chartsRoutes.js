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
  .get(chartsController.getAllCharts)
  .post(chartsController.createCharts);
router
  .route('/:id')
  .get(chartsController.getCharts)
  .patch(chartsController.updateCharts)
  .delete(chartsController.deleteCharts);

module.exports = router;
