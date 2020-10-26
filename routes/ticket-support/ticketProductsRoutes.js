/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const ticketProductsController = require('./../../controllers/ticket-support/ticketProductsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in TicketProductsRoutes');
  next();
});

router.param('id', ticketProductsController.checkID);

/* ROUTES */
router
  .route('/')
  .get(ticketProductsController.getAllTicketProducts)
  .post(ticketProductsController.createTicketProducts);
router
  .route('/:id')
  .get(ticketProductsController.getTicketProducts)
  .patch(ticketProductsController.updateTicketProducts)
  .delete(ticketProductsController.deleteTicketProducts);

module.exports = router;
