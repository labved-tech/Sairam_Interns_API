/* DEPENDENCIES */
const express = require('express');

// MIDDLEWARE
const router = express.Router();
const userController = require('../controllers/userController');

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
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
