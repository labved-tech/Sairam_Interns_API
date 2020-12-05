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
      
      $('#asideMenuItemUl').append('\
        <!-- begin::Section Container -->\
        <li class= "menu-section" >\
          <h4 class="menu-text">Section Name</h4>\
          <i class="menu-icon ki ki-bold-more-hor icon-md" ></i>\
        </li>\
        \
        <!-- begin::Menu Container -->\
        <li class= "menu-item  menu-item-submenu" aria - haspopup="true" >\
          <a href="index.html" class="menu-link ">\
            <i class="menu-icon flaticon2-poll-symbol"></i>\
            <span class="menu-text"> Test Link </span></a>\
            <i class="menu-arrow"></i>\
        </li>\
        \
        ');
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