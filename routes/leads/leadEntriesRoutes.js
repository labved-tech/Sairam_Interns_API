/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const leadEntriesController = require('./../../controllers/leads/leadEntriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in leadEntries Routes');
  next();
});

router.param('id', leadEntriesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(leadEntriesController.getAllleadEntries)
  .post(leadEntriesController.createleadEntries);
router
  .route('/:id')
  .get(leadEntriesController.getleadEntries)
  .patch(leadEntriesController.updateleadEntries)
  .delete(leadEntriesController.deleteleadEntries);

module.exports = router;
