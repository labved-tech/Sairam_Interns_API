/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const analyticsController = require('../../controllers/analytics/analyticsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in analytics Routes');
  next();
});

router.param('id', analyticsController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(analyticsController.getAllTableAnalytics);
router
  .route('/')
  .get(analyticsController.getAllAnalytics)
  .post(analyticsController.createAnalytics);
router
  .route('/:id')
  .get(analyticsController.getAnalytics)
  .patch(analyticsController.updateAnalytics)
  .delete(analyticsController.deleteAnalytics);


module.exports = router;
