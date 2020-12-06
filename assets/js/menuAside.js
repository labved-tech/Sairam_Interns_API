/* eslint-disable */
'use strict';

// Class definition

const MenuFetch = (function () {

  // sourcing data
    const fetchMenu = async () =>   {
        try {
            const { data } = await axios.get(`${HOST_URL}/api/v1/menu`, { params : {manager: 'aside'}})
              return data;
          } catch (err) {
              console.log(err.message);
          }
    }
    

      // demo initializer
    const fetchAsideMenu = async () =>   {
      var asideMenu = await fetchMenu();
      console.log(asideMenu);


      var sectionNo = asideMenu.section.length;
      console.log('sectionNo', sectionNo);
      var menuItemsNo = asideMenu.items.length;
      console.log('menuItemsNo', menuItemsNo);
      var subItems1No = asideMenu.subitems1.length;
      console.log('subItems1No', subItems1No);
      var subItems2No = asideMenu.subitems2.length;
      console.log('subItems2No', subItems2No);


      var managerId = asideMenu.manager[0]._id;
      console.log('managerId', managerId);
      var menuItemsId;
      var sectionId;

      for (let i = 0; i < menuItemsNo; i++) {
        $('#menuList').append('\
        <li class="menu-item  menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover"> \
              <a href="javascript:;" class="menu-link menu-toggle"><span class="svg-icon menu-icon">  \
                      <!--begin::Svg Icon | path:assets/media/svg/icons/Design/PenAndRuller.svg--> \
                      <!--end::Svg Icon--> \
                  </span> \
                  <span class="menu-text">Menu Item</span> \
                  <i class="menu-arrow"></i> \
              </a> \
        </li> \
        ');
        
      }


/*       for (let i = 0; i < menuItemsNo; i++) {
        $('#menuList').append('\
          <li class="menu-item  menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover"> \
              <a href="javascript:;" class="menu-link menu-toggle"><span class="svg-icon menu-icon">  \
                      <!--begin::Svg Icon | path:assets/media/svg/icons/Design/PenAndRuller.svg--> \
                      <!--end::Svg Icon--> \
                  </span> \
                  <span class="menu-text">Menu Item</span> \
                  <i class="menu-arrow"></i> \
              </a> \
            <div class="menu-submenu">  \
              <i class="menu-arrow"></i>  \
              <ul class="menu-subnav">  \
                <li class="menu-item  menu-item-parent" aria-haspopup="true"> \
                  <span class="menu-link">  \
                      <span class="menu-text">Menu Item</span>  \
                  </span> \
                </li> \
                <li class="menu-item  menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover"> \
                  <a href="javascript:;" class="menu-link menu-toggle"> \
                      <i class="menu-bullet menu-bullet-dot"> \
                          <span></span> \
                      </i>  \
                      <span class="menu-text">Sub Item 1</span> \
                      <i class="menu-arrow"></i>  \
                  </a>  \
                  <div class="menu-submenu "> \
                    <i class="menu-arrow"></i> \
                    <ul class="menu-subnav">  \
                        <li class="menu-item " aria-haspopup="true">  \
                          <a href="crud/forms/controls/base.html" class="menu-link "> \
                            <i class="menu-bullet menu-bullet-dot"> \
                              <span></span> \
                            </i> \
                            <span class="menu-text">Sub Item 2</span>\
                          </a>  \
                        </li> \
                    </ul> \
                  </div>  \
                </li> \
              </ul> \
            </div>  \
          </li> \
        ');
      } */
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