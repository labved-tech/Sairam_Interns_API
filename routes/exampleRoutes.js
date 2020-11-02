/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const exampleController = require('../controllers/exampleController');
const authController = require('../controllers/user/authController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in exampleRoutes');
  next();
});

router.param('id', exampleController.checkID);

/* ROUTES */
router
  .route('/')
  .get(authController.protect, exampleController.getAllExample)
  .post(authController.protect, exampleController.createExample);
router
  .route('/:id')
  .get(authController.protect, exampleController.getExample)
  .patch(authController.protect, exampleController.updateExample)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    exampleController.deleteExample
  );

module.exports = router;
