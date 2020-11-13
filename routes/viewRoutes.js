/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/user/authController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in VIEW PAGES ROUTER');
  next();
});

/* ROUTES */
router.get('/overview', authController.protect, viewsController.getOverview);

// EXAMPLE RELATED ROUTES
router.get('/form', viewsController.getForm);
router.get('/example', viewsController.getExample);
router.get('/table', viewsController.getTable);

// LOGIN RELATED ROUTES
router.get('/signup', viewsController.getSignUp);
router.get('/login', viewsController.getLoginForm);
router.get('/forgotpassword', viewsController.getForgot);
router.get('/error', viewsController.getError);

// USERS RELATED ROUTES
router.get('/account-settings/users/view-all', viewsController.getAllUser);
router.get('/account-settings/users/add-new', viewsController.getAddUser);

// ANNOUNCEMENT RELATED ROUTES
router.get('/announcement-entries', viewsController.announcementEntries);
router.get('/announcement-notification', viewsController.announcementNotify);

// RATING RELATED ROUTES
router.get('/ratingAttributeGroups', viewsController.ratingAttributeGroups);
router.get('/ratingAttribute', viewsController.ratingAttribute);

// ANALYTICS RELATED ROUTES
router.get('/analytics', viewsController.analytics);

// CHARTS RELATED ROUTES
//router.get('/charts', viewsController.charts);

// NEWSLETTER RELATED ROUTES
router.get('/newsletter-messages', viewsController.newsletterMessages);

// EVENT RELATED ROUTES
router.get('/event-entries', viewsController.eventEntries);

module.exports = router;
