/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const TicketResponseController = require('./../../controllers/TicketResponseController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in TicketResponseRoutes');
  next();
});

router.param('id', TicketResponseController.checkID);

/* ROUTES */
router
  .route('/')
  .get(TicketResponseController.getAllTicketResponse)
  .post(TicketResponseController.createTicketResponse);
router
  .route('/:id')
  .get(TicketResponseController.getTicketResponse)
  .patch(TicketResponseController.updateTicketResponse)
  .delete(TicketResponseController.deleteTicketResponse);

module.exports = router;
