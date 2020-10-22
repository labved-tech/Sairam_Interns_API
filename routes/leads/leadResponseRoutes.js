/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const leadResponseController = require('./../../controllers/leads/leadResponseController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in leadResponse Routes');
  next();
});

router.param('id', leadResponseController.checkID);

/* ROUTES */
router
  .route('/')
  .get(leadResponseController.getAllleadResponse)
  .post(leadResponseController.createleadResponse);
router
  .route('/:id')
  .get(leadResponseController.getleadResponse)
  .patch(leadResponseController.updateleadResponse)
  .delete(leadResponseController.deleteleadResponse);

module.exports = router;
