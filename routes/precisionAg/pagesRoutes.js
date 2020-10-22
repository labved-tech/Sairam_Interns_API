/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const pagesController = require('./../../controllers/precisionAg/pagesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in pages Routes');
  next();
});

router.param('id', pagesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(pagesController.getAllpages)
  .post(pagesController.createpages);
router
  .route('/:id')
  .get(pagesController.getpages)
  .patch(pagesController.updatepages)
  .delete(pagesController.deletepages);

module.exports = router;
