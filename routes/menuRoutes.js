/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const menuController = require('../controllers/menuController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in menuRoutes');
  next();
});

/* ROUTES */
router
  .route('/')
  .get(menuController.getAllMenu)
  .post(menuController.createMenu);
router
  .route('/:id')
  .get(menuController.getOneMenu)
  .patch(menuController.updateMenu)
  .delete(menuController.deleteMenu);

module.exports = router;
