/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const ticketResponseController = require('./../../controllers/ticket-support/ticketResponseController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in TicketResponseRoutes');
  next();
});

router.param('id', ticketResponseController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(ticketResponseController.getAllTableTicketResponse);
router
  .route('/')
  .get(ticketResponseController.getAllTicketResponse)
  .post(ticketResponseController.createTicketResponse);
router
  .route('/:id')
  .get(ticketResponseController.getTicketResponse)
  .patch(ticketResponseController.updateTicketResponse)
  .delete(ticketResponseController.deleteTicketResponse);

module.exports = router;
