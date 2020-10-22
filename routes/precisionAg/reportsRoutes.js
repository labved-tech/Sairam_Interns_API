/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const reportsController = require('./../../controllers/precisionAg/reportsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in reports Routes');
  next();
});

router.param('id', reportsController.checkID);

/* ROUTES */
router
  .route('/')
  .get(reportsController.getAllreports)
  .post(reportsController.createreports);
router
  .route('/:id')
  .get(reportsController.getreports)
  .patch(reportsController.updatereports)
  .delete(reportsController.deletereports);

module.exports = router;
