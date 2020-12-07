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

  const manager = await MenuManager.find({ name: menuManagerStr })
    .populate({
      path: '_section',
      populate: {
        path: '_item',
        populate: {
          path: '_subItem1',
          populate: { path: '_subItem2' },
        },
      },
    })
    .then();

  res.status(200).json({
    status: 'success',
    message: 'Got Aside Menu Items',
    manager,
  });
});
