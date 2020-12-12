/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const pagesController = require('../../controllers/pages/pagesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in pages Routes');
  next();
});

router.param('id', pagesController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(pagesController.getAllTablePages);
router
  .route('/')
  .get(pagesController.getAllPages)
  .post(pagesController.createPages);
router
  .route('/:id')
  .get(pagesController.getPages)
  .patch(pagesController.updatePages)
  .delete(pagesController.deletePages);

module.exports = router;
