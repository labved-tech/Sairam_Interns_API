/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const contractTemplatesController = require('./../../controllers/contractTemplatesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in contractTemplatesRoutes');
  next();
});

router.param('id', contractTemplatesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(contractTemplatesController.getAllcontractTemplates)
  .post(contractTemplatesController.createcontractTemplates);
router
  .route('/:id')
  .get(contractTemplatesController.getcontractTemplates)
  .patch(contractTemplatesController.updatecontractTemplates)
  .delete(contractTemplatesController.deletecontractTemplates);

module.exports = router;
