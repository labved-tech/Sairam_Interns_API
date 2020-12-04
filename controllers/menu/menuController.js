/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const MenuManager = require('../../models/menu/menuManagerModel');
const MenuSection = require('../../models/menu/menuSectionModel');
const MenuItems = require('../../models/menu/menuItemsModel');
const MenuSubItems1 = require('../../models/menu/menuSubItems1Model');
const MenuSubItems2 = require('../../models/menu/menuSubItems2Model');

/* DATABASE */

/* CONTROLLERS */
exports.getAllMenu = catchAsync(async (req, res, next) => {
  console.log('Getting All Menu Items');
  // console.log(req.query);

  const menuManagerStr = req.query.manager;

  const menuManager = await MenuManager.find({ name: menuManagerStr }).then();
  const menuMangerId = menuManager[0]._id;

  const section = await MenuSection.find().select('_id name priority').then();

  const items = await MenuItems.find({
    _menuId: { $all: [menuMangerId] },
  })
    .sort('priority')
    .populate('_menuId')
    .populate('_sectionId')
    .select('_id name priority route')
    .then();

  const subitems1 = await MenuSubItems1.find()
    .sort('priority')
    .populate('_parentId')
    .select('_id name priority route')
    .then();

  const subitems2 = await MenuSubItems2.find()
    .sort('priority')
    .populate('_parentId')
    .select('_id name priority route')
    .then();

  res.status(200).json({
    status: 'success',
    message: 'Got Aside Menu Items',
    section,
    items,
    subitems1,
    subitems2,
  });
});
