/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const analyticsController = require('./../../controllers/precisionAg/analyticsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in analytics Routes');
  next();
});

router.param('id', analyticsController.checkID);

/* ROUTES */
router
  .route('/')
  .get(analyticsController.getAllanalytics)
  .post(analyticsController.createanalytics);
router
  .route('/:id')
  .get(analyticsController.getanalytics)
  .patch(analyticsController.updateanalytics)
  .delete(analyticsController.deleteanalytics);

module.exports = router;
