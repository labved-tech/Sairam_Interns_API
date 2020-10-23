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
  .get(leadResponseController.getAllLeadResponse)
  .post(leadResponseController.createLeadResponse);
router
  .route('/:id')
  .get(leadResponseController.getLeadResponse)
  .patch(leadResponseController.updateLeadResponse)
  .delete(leadResponseController.deleteLeadResponse);

module.exports = router;
