/* eslint-disable */
'use strict';

// Class definition

const MenuFetch = (function () {

  // sourcing data
    const fetchMenu = async () => {
        try {
            const { data } = await axios.get(`${HOST_URL}/api/v1/menu`, { params : {manager: 'aside'}})
              return data;
          } catch (err) {
              console.log(err.message);
          }
    }
    

      // demo initializer
    const fetchAsideMenu = async () => {
      var asideMenu = await fetchMenu();
      console.log(asideMenu);

      var managerId = asideMenu.manager[0]._id;
      console.log('managerId', managerId);
      var sectionNo = asideMenu.section.length;
      console.log('sectionNo', sectionNo);
      var sectionId;
      var menuItemsNo = asideMenu.items.length;
      console.log('menuItemsNo', menuItemsNo);
      var menuItemsNo;

      for (let x = 0; x < sectionNo; x++)
      {
        for (let i = 0; x < menuItemsNo; x++) {
          $('#asideMenuItemUl').append('\
        <!-- begin::Section Container -->\
        <li class= "menu-section" >\
          <h4 class="menu-text">' + asideMenu.section[x].name + '</h4>\
          <i class="menu-icon ki ki-bold-more-hor icon-md" ></i>\
        </li>\
        \
        <!-- begin::Menu Container -->\
        <li class= "menu-item  menu-item-submenu" aria - haspopup="true" >\
          <a href="'+ asideMenu.items[i].route +'" class="menu-link ">\
            <i class="menu-icon flaticon2-poll-symbol"></i>\
            <span class="menu-text">' + asideMenu.items[i].name + '</span></a>\
            <i class="menu-arrow"></i>\
        </li>\
        \
        ');
        }
      }


    }

    return {
        // Public functions
        init: function () {
          // init dmeo
          fetchAsideMenu();
        },
      };
      
})();

jQuery(document).ready(function () {
    MenuFetch.init();
  });