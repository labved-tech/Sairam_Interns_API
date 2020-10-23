/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const newsletterEntriesController = require('./../../controllers/newsletter/newsletterEntriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in Newsletter Entry Routes');
  next();
});

router.param('id', newsletterEntriesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(newsletterEntriesController.getAllNewsletterEntries)
  .post(newsletterEntriesController.createNewsletterEntries);
router
  .route('/:id')
  .get(newsletterEntriesController.getNewsletterEntries)
  .patch(newsletterEntriesController.updateNewsletterEntries)
  .delete(newsletterEntriesController.deleteNewsletterEntries);

module.exports = router;
