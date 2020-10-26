/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const directoryAtributeGroupsController = require('./../../controllers/directories/directoryAtributeGroupsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in directoryAtributeGroupsRoutes');
  next();
});

router.param('id', directoryAtributeGroupsController.checkID);

/* ROUTES */
router
  .route('/')
  .get(directoryAtributeGroupsController.getAllDirectoryAtributeGroups)
  .post(directoryAtributeGroupsController.createDirectoryAtributeGroups);
router
  .route('/:id')
  .get(directoryAtributeGroupsController.getDirectoryAtributeGroups)
  .patch(directoryAtributeGroupsController.updateDirectoryAtributeGroups)
  .delete(directoryAtributeGroupsController.deleteDirectoryAtributeGroups);

module.exports = router;
