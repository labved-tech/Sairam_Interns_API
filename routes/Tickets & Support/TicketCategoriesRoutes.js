/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const TicketCategoriesController = require('./../../controllers/TicketCategoriesController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in TicketCategoriesRoutes');
  next();
});

router.param('id', TicketCategoriesController.checkID);

/* ROUTES */
router
  .route('/')
  .get(TicketCategoriesController.getAllTicketCategories)
  .post(TicketCategoriesController.createTicketCategories);
router
  .route('/:id')
  .get(TicketCategoriesController.getTicketCategories)
  .patch(TicketCategoriesController.updateTicketCategories)
  .delete(TicketCategoriesController.deleteTicketCategories);

module.exports = router;
