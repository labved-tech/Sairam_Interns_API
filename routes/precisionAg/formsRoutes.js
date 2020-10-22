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
  .get(formsController.getAllforms)
  .post(formsController.createforms);
router
  .route('/:id')
  .get(formsController.getforms)
  .patch(formsController.updateforms)
  .delete(formsController.deleteforms);

module.exports = router;
