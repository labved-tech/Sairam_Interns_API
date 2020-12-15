/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const ticketCategoriesController = require('../../controllers/ticket-support/ticketCategoriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in TicketCategoriesRoutes');
  next();
});

router.param('id', ticketCategoriesController.checkID);

/* ROUTES */
router
  .route('/table')
  .get(ticketCategoriesController.getAllTableTicketCategories);

router
  .route('/')
  .get(ticketCategoriesController.getAllTicketCategories)
  .post(ticketCategoriesController.createTicketCategories);
router
  .route('/:id')
  .get(ticketCategoriesController.getTicketCategories)
  .patch(ticketCategoriesController.updateTicketCategories)
  .delete(ticketCategoriesController.deleteTicketCategories);

module.exports = router;
