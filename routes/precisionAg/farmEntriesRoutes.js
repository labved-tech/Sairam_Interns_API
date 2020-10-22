/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const farmEntriesController = require('./../../controllers/precisionAg/farmEntriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in farmEntries Routes');
  next();
});

router.param('id', farmEntriesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(farmEntriesController.getAllfarmEntries)
  .post(farmEntriesController.createfarmEntries);
router
  .route('/:id')
  .get(farmEntriesController.getfarmEntries)
  .patch(farmEntriesController.updatefarmEntries)
  .delete(farmEntriesController.deletefarmEntries);

module.exports = router;
