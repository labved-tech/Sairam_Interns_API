/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const ticketEntriesController = require('./../../controllers/ticket-support/ticketEntriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in TicketEntriesRoutes');
  next();
});

router.param('id', ticketEntriesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(ticketEntriesController.getAllTicketEntries)
  .post(ticketEntriesController.createTicketEntries);
router
  .route('/:id')
  .get(ticketEntriesController.getTicketEntries)
  .patch(ticketEntriesController.updateTicketEntries)
  .delete(ticketEntriesController.deleteTicketEntries);

module.exports = router;
