/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const viewsController = require('../controllers/viewsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in viewRoutes');
  next();
});

/* ROUTES */
router.get('/', viewsController.getOverview);

// LOGIN RELATED ROUTES
router.get('/sign-up', viewsController.getSignUp);
router.get('/sign-in', viewsController.getSignIn);
router.get('/forgot', viewsController.getForgot);
router.get('/error', viewsController.getError);

// USERS RELATED ROUTES
router.get('/account-settings/users/view-all', viewsController.getAllUser);
router.get('/account-settings/users/add-new', viewsController.getAddUser);

// EXAMPLE RELATED ROUTES
router.get('/example', viewsController.example);

module.exports = router;
