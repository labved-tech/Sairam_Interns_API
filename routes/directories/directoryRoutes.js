/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const directoryController = require('./../../controllers/directories/directoryController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in directoryRoutes');
  next();
});

router.param('id', directoryController.checkID);

/* ROUTES */
router
  .route('/')
  .get(directoryController.getAllDirectory)
  .post(directoryController.createDirectory);
router
  .route('/:id')
  .get(directoryController.getDirectory)
  .patch(directoryController.updateDirectory)
  .delete(directoryController.deleteDirectory);

module.exports = router;
