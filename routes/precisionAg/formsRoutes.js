/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const formsController = require('./../../controllers/precisionAg/formsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in forms Routes');
  next();
});

router.param('id', formsController.checkID);

/* ROUTES */
router
  .route('/')
  .get(formsController.getAllForms)
  .post(formsController.createForms);
router
  .route('/:id')
  .get(formsController.getForms)
  .patch(formsController.updateForms)
  .delete(formsController.deleteForms);

module.exports = router;
