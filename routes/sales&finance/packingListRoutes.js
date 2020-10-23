/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const packingListController = require('../../controllers/sales&finance/packingListController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in Packing List Routes');
  next();
});

router.param('id', packingListController.checkID);

/* ROUTES */
router
  .route('/')
  .get(packingListController.getAllPackingList)
  .post(packingListController.createPackingList);
router
  .route('/:id')
  .get(packingListController.getPackingList)
  .patch(packingListController.updatePackingList)
  .delete(packingListController.deletePackingList);

module.exports = router;
