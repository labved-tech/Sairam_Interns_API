/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const directoryEntriesController = require('./../../controllers/directories/directoryEntriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in directoryEntriesRoutes');
  next();
});

router.param('id', directoryEntriesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(directoryEntriesController.getAllDirectoryEntries)
  .post(directoryEntriesController.createDirectoryEntries);
router
  .route('/:id')
  .get(directoryEntriesController.getDirectoryEntries)
  .patch(directoryEntriesController.updateDirectoryEntries)
  .delete(directoryEntriesController.deleteDirectoryEntries);

module.exports = router;
