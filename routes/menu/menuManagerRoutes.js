/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const menuManagerController = require('../../controllers/menu/menuManagerController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in menuManagerRoutes');
  next();
});

/* ROUTES */
// router.route('/table').get(menuManagerController.getAllTableMenuManager);
router.route('/popSel2').get(menuManagerController.getAllMenuManagerSel2);

router
  .route('/')
  .get(menuManagerController.getAllMenuManager)
  .post(menuManagerController.createMenuManager);
router
  .route('/:id')
  .get(menuManagerController.getMenuManager)
  .patch(menuManagerController.updateMenuManager)
  .delete(menuManagerController.deleteMenuManager);

module.exports = router;
