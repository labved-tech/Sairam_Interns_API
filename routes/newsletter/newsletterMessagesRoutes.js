/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const newsletterMessagesController = require('./../../controllers/newsletter/newsletterMessagesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in Newsletter Meessage Routes');
  next();
});

router.param('id', newsletterMessagesController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(newsletterMessagesController.getAllTableNewsletterMessages);

router
  .route('/')
  .get(newsletterMessagesController.getAllNewsletterMessages)
  .post(newsletterMessagesController.createNewsletterMessages);
router
  .route('/:id')
  .get(newsletterMessagesController.getNewsletterMessages)
  .patch(newsletterMessagesController.updateNewsletterMessages)
  .delete(newsletterMessagesController.deleteNewsletterMessages);

module.exports = router;
