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

  const manager = await MenuManager.find({ name: menuManagerStr }).then();
  const managerId = manager[0]._id;

  const section = await MenuSection.find({ _menu: { $all: [managerId] } })
    .populate('_menu')
    .select('_id name priority _menu')
    .then();

  const items = await MenuItems.find({
    _menu: { $all: [managerId] },
  })
    .sort('priority _section:priority')
    .populate('_menu')
    .populate('_section')
    .select('_id name priority route _menu _section')
    .then();

  const subitems1 = await MenuSubItems1.find()
    .sort('priority')
    .populate('_parent')
    .select('_id name priority route _parent')
    .then();

  const subitems2 = await MenuSubItems2.find()
    .sort('priority')
    .populate('_parent')
    .select('_id name priority route _parent')
    .then();

  res.status(200).json({
    status: 'success',
    message: 'Got Aside Menu Items',
    manager,
    section,
    items,
    subitems1,
    subitems2,
  });
});
