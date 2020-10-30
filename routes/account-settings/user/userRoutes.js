/* DEPENDENCIES */
const express = require('express');

// MIDDLEWARE
const router = express.Router();
const userInformationController = require('../../../controllers/account-settings/user/userController');
const authController = require('../../../controllers/account-settings/user/authController');

/* GLOBAL MIDDLEWARE USAGE*/
router.param('id', (req, res, next, val) => {
  console.log(`user Id is : ${val}`);
  next();
});

router.use((req, res, next) => {
  console.log('We are in userRoutes');
  next();
});

// ROUTES
router.post('/signup', authController.signup);

router
  .route('/')
  .get(userInformationController.getAllUser)
  .post(userInformationController.createUser);
router
  .route('/:id')
  .get(userInformationController.getUser)
  .patch(userInformationController.updateUser)
  .delete(userInformationController.deleteUser);

module.exports = router;
