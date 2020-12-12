/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const formResponseController = require('../../controllers/forms/formResponseController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in formResponse Routes');
  next();
});

router.param('id', formResponseController.checkID);

/* ROUTES */
router
.route('/table')
.get(formResponseController.getAllTableFormResponse);
router
  .route('/')
  .get(formResponseController.getAllFormResponse)
  .post(formResponseController.createFormResponse);
router
  .route('/:id')
  .get(formResponseController.getFormResponse)
  .patch(formResponseController.updateFormResponse)
  .delete(formResponseController.deleteFormResponse);

module.exports = router;
