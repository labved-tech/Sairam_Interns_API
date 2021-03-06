/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const menuSectionRouter = require('./menuSectionRoutes');
const menuManagerRouter = require('./menuManagerRoutes');
const menuController = require('../../controllers/menu/menuController');
const menuItemsController = require('../../controllers/menu/menuItemsController');
const menuSubItems1Controller = require('../../controllers/menu/menuSubItems1Controller');
const menuSubItems2Controller = require('../../controllers/menu/menuSubItems2Controller');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in menuRoutes');
  next();
});

/* ROUTES */
router.route('/genMenu').get(menuController.getAllMenu);
router.route('/genMenuTree').get(menuController.getAllMenuTree);

router.use('/manager', menuManagerRouter);
router.use('/section', menuSectionRouter);

// ITEM
router
  .route('/items')
  .get(menuItemsController.getAllMenuItem)
  .post(menuItemsController.createMenuItem);
router
  .route('/items/:id')
  .get(menuItemsController.getMenuItem)
  .patch(menuItemsController.updateMenuItem)
  .delete(menuItemsController.deleteMenuItem);

// SUB-ITEM1
router
  .route('/subItems1')
  .get(menuSubItems1Controller.getAllMenuSubItem1)
  .post(menuSubItems1Controller.createMenuSubItem1);
router
  .route('/subItems1/:id')
  .get(menuSubItems1Controller.getMenuSubItem1)
  .patch(menuSubItems1Controller.updateMenuSubItem1)
  .delete(menuSubItems1Controller.deleteMenuSubItem1);

// SUB-ITEM2

router
  .route('/subItems2')
  .get(menuSubItems2Controller.getAllMenuSubItem2)
  .post(menuSubItems2Controller.createMenuSubItem2);
router
  .route('/subItems2/:id')
  .get(menuSubItems2Controller.getMenuSubItem2)
  .patch(menuSubItems2Controller.updateMenuSubItem2)
  .delete(menuSubItems2Controller.deleteMenuSubItem2);

module.exports = router;
