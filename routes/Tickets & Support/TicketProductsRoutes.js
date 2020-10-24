/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const TicketProductsController = require('./../../controllers/TicketProductsController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in TicketProductsRoutes');
  next();
});

router.param('id', TicketProductsController.checkID);

/* ROUTES */
router
  .route('/')
  .get(TicketProductsController.getAllTicketProducts)
  .post(TicketProductsController.createTicketProducts);
router
  .route('/:id')
  .get(TicketProductsController.getTicketProducts)
  .patch(TicketProductsController.updateTicketProducts)
  .delete(TicketProductsController.deleteTicketProducts);

module.exports = router;
