/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const directoryAttributesGroupsController = require('./../../controllers/directory/directoryAttributesGroupsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in directoryAtributeGroupsRoutes');
  next();
});

router.param('id', directoryAttributesGroupsController.checkID);

/* ROUTES */
router
  .route('/')
  .get(directoryAttributesGroupsController.getAllDirectoryAttributesGroups)
  .post(directoryAttributesGroupsController.createDirectoryAttributesGroups);
router
  .route('/:id')
  .get(directoryAttributesGroupsController.getDirectoryAttributesGroups)
  .patch(directoryAttributesGroupsController.updateDirectoryAttributesGroups)
  .delete(directoryAttributesGroupsController.deleteDirectoryAttributesGroups);

module.exports = router;
