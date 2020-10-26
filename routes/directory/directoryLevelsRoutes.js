/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const directoryLevelsController = require('../../controllers/directory/directoryLevelsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in directoryLevelsRoutes');
  next();
});

router.param('id', directoryLevelsController.checkID);

/* ROUTES */
router
  .route('/')
  .get(directoryLevelsController.getAllDirectoryLevels)
  .post(directoryLevelsController.createDirectoryLevels);
router
  .route('/:id')
  .get(directoryLevelsController.getDirectoryLevels)
  .patch(directoryLevelsController.updateDirectoryLevels)
  .delete(directoryLevelsController.deleteDirectoryLevels);

module.exports = router;
