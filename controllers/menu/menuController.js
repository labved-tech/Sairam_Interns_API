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

  menuManagerStr = req.query.manager;
  // console.log('menuManagerStr', menuManagerStr);

  /*  
    const menuSubItems1 = await MenuSubItems1.find().then();
    const menuSubItems2 = await MenuSubItems2.find().then();

    console.log('menuSection', menuSection);
    console.log('menuItems', menuItems);
    console.log('menuSubItems1', menuSubItems1);
    console.log('menuSubItems2', menuSubItems2);  
        
    const menuSubItems1Len = menuSubItems1.length;
    const menuSubItems2Len = menuSubItems2.length;
     */

  const menu = {
    //new Object();
    name: '',
    sectionItems: [],
  };

  // Manager
  const menuManager = await MenuManager.find({ name: menuManagerStr }).then();
  const menuManagerLen = menuManager.length;
  // console.log('menuManager', menuManager);
  const menuManagerId = menuManager[0]._id;
  // console.log(menuManagerId);

  //menu[_id] = menuManager[i]._id;
  menu.name = menuManager[0].name;

  //console.log(menu);

  // Menu Section
  const menuSection = await MenuSection.find().sort('priority').then();
  const menuSectionLen = menuSection.length;
  console.log('menuSection', menuSection);
  // console.log('menuSectionLen', menuSectionLen)

  // Menu Items
  let menuItems;
  menuItems = await MenuItems.find({
    _menuId: menuManagerId,
    _sectionId: '5fc637299c475a195083d11e',
  });

  /*   for (let i = 0; i < menuSectionLen; i++) {
    menuItems = await MenuItems.find({
      _menuId: menuManagerId,
      _sectionId: menuSection[i]._Id,
    })
      .populate('_sectionId')
      .then();
    
    const menuItemsLen = menuItems.length;
    console.log('menuItems', menuItems);
    // console.log('menuItemsLen', menuItemsLen);  }
    console.log(menu);
  } */

  res.status(200).json({
    status: 'success',
    message: 'Got All Menu Items',
    menu,
    menuManager,
    menuSection,
    menuItems,
    //   menuSubItems1,
    //   menuSubItems2,
  });
});
