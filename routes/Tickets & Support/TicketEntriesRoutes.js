/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const TicketEntriesController = require('./../../controllers/TicketEntriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in TicketEntriesRoutes');
  next();
});

router.param('id', TicketEntriesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(TicketEntriesController.getAllTicketEntries)
  .post(TicketEntriesController.createTicketEntries);
router
  .route('/:id')
  .get(TicketEntriesController.getTicketEntries)
  .patch(TicketEntriesController.updateTicketEntries)
  .delete(TicketEntriesController.deleteTicketEntries);

module.exports = router;
