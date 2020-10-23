/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const ecommerceLocationsController = require('./../../controllers/ecommerce/ecommerceLocationsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in ecommerceLocationsRoutes');
  next();
});

router.param('id', ecommerceLocationsController.checkID);

/* ROUTES */
router
  .route('/')
  .get(ecommerceLocationsController.getAllEcommerceLocations)
  .post(ecommerceLocationsController.createEcommerceLocations);
router
  .route('/:id')
  .get(ecommerceLocationsController.getEcommerceLocations)
  .patch(ecommerceLocationsController.updateEcommerceLocations)
  .delete(ecommerceLocationsController.deleteEcommerceLocations);

module.exports = router;
