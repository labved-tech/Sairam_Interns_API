/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const reportsController = require('../../controllers/reports/reportsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in reports Routes');
  next();
});

router.param('id', reportsController.checkID);

/* ROUTES */
router
.route('/table')
.get(reportsController.getAllTableReports);
router
  .route('/')
  .get(reportsController.getAllReports)
  .post(reportsController.createReports);
router
  .route('/:id')
  .get(reportsController.getReports)
  .patch(reportsController.updateReports)
  .delete(reportsController.deleteReports);

module.exports = router;
