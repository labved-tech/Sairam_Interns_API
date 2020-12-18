/* DEPENDENCIES */
const express = require('express');

/* MIDDLEWARE */
const router = express.Router();
const menuSectionController = require('../../controllers/menu/menuSectionController');

/* GLOBAL MIDDLEWARE USAGE*/
router.use((req, res, next) => {
  console.log('We are in menuSectionRoutes');
  next();
});

/* ROUTES */
router.route('/table').get(menuSectionController.getAllTableMenuSection);

router
  .route('/')
  .get(menuSectionController.getAllMenuSection)
  .post(menuSectionController.createMenuSection)
  .delete(menuSectionController.deleteMenuSection);

router
  .route('/:id')
  .get(menuSectionController.getMenuSection)
  .patch(menuSectionController.updateMenuSection);

module.exports = router;
