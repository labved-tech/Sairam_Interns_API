/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const authController = require('../../controllers/user/authController');
const exampleController = require('../../controllers/example/exampleController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in exampleRoutes');
  next();
});

router.param('id', exampleController.checkID);

/* ROUTES */
router
  .route('/')
  .get(exampleController.getAllExample)
  .post(exampleController.createExample);
router
  .route('/:id')
  .get(exampleController.getExample)
  .patch(exampleController.updateExample)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    exampleController.deleteExample
  );

module.exports = router;
