/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const contractTemplatesController = require('../../controllers/contract/contractTemplatesControllers');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in contractTemplatesRoutes');
  next();
});

router.param('id', contractTemplatesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(contractTemplatesController.getAllContractTemplates)
  .post(contractTemplatesController.createContractTemplates);
router
  .route('/:id')
  .get(contractTemplatesController.getContractTemplates)
  .patch(contractTemplatesController.updateContractTemplates)
  .delete(contractTemplatesController.deleteContractTemplates);

module.exports = router;
