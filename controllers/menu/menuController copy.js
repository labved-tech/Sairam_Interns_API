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

  let menu = new Object();
  let menuItems;
  let subItems1;
  let subItems2;
  let sectionItemsArray = [];
  let menuItemsArray = [];
  let subItems1Array = [];
  let subItems2Array = [];

  // Manager
  const menuManager = await MenuManager.find({ name: menuManagerStr }).then();
  const menuManagerLen = menuManager.length;
  // console.log('menuManager', menuManager);
  const menuManagerId = menuManager[0]._id;
  // console.log(menuManagerId);
  //menu[_id] = menuManager[i]._id;
  menu.name = menuManager[0].name;
  Object.assign(menu, {sectionItems:  [] });
  console.log(menu);

  let menuSection;
  menuSection = await MenuSection.find()
    .sort('priority')
    .select('name priority')
    .then();
  const menuSectionLen = menuSection.length;
  // console.log('menuSection', menuSection);
  // console.log('menuSectionLen', menuSectionLen)
  Object.assign(menu, {sectionItems:  [] });

  // Constructing Section Array
  for (let i = 0; i < 1; i++) {
    console.log('Inside Section Items')

    const menuSectionId = menuSection[i]._id;
    // console.log(menuSectionId);


    menuItems = await MenuItems.find({
      _menuId: { $all: [menuManagerId] },
      _sectionId: { $all: [menuSectionId] },
    })
      .sort('priority')
      .select('_id name route priority')
      .then();

    const menuItemsLen = menuItems.length;
    console.log('menuItemsLen', menuItemsLen)


    if (menuItems[i] != null) {
      menu.sectionItems.push(menuSection[i]);
      sectionItemsArray.push(menuSection[i]);
      Object.assign(menu.sectionItems, {menuItemsNo: menuItemsLen });
      menu.sectionItems[0].menuItemsNo =  menuItemsLen ;

      console.log('menu', menu);
    }

    // Constructing Menu Items Array
    for (let j = 0; j < menuItemsLen; j++) {
      console.log('Inside menuItems')
      menuItemsArray.push(menuItems[j]);

      const menuItemsId = menuItems[j]._id;
      // console.log('menuItemsId', menuItemsId);

      subItems1 = await MenuSubItems1.find({
        _parentId : { $all: [menuItemsId]},
      })
        .sort('priority')
        .select('_id name route priority')
        .then();

      const subItems1Len = subItems1.length;
      // console.log('subItems1Len', subItems1Len);

      // console.log('subItems1',subItems1);

      // Constructing Sub Items 1 Array
      for (let k = 0; k < subItems1Len; k++) {
        console.log('Inside subItems1')
        subItems1Array.push(subItems1[k]);

        const subItems1Id = subItems1[k]._id;
        console.log('subItems1Id', subItems1Id);

        subItems2 = await MenuSubItems2.find({
          _parentId : { $all: [subItems1Id]},
        })
          .sort('priority')
          .select('_id name route priority')
          .then();

          const subItems2Len = subItems2.length;
          console.log('subItems2Len', subItems2Len);


          // Constructing Sub Items 2 Array
          for(let l=0;l<subItems2Len;l++) {
            console.log('Inside subItems2');
            subItems2Array.push(subItems2[l]);

          }
      }
    }

/*     console.log('sectionItemsArray :', sectionItemsArray);
    console.log('menuItemsArray :', menuItemsArray);
    console.log('subItems1Array :', subItems1Array);
    console.log('subItems2Array :', subItems2Array); */

    console.log(menu)
  
  }


/*   Object.prototype.recordLength = function () {
    this.recordNo: 10,
  }

  let obj1;

  obj1.recordLength();

  console.log('obj1', obj1) */



  /*     // console.log(menu);

    const menuItemsLen = menuItems.length;
    console.log('menuItems', menuItems);
    // console.log('menuItemsLen', menuItemsLen);  } */
  // console.log(menu);

  res.status(200).json({
    status: 'success',
    message: 'Got All Menu Items',
    subItems1Array,
    // menuManager,
    // menuSection,
    // menuItems,
    //   menuSubItems1,
    //   menuSubItems2,
  });
});
