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

      // Constructing Section
      var sectionLen = asideMenu.manager[0]._section.length;
      console.log('sectionLen', sectionLen);
      for (let i = 0; i < sectionLen; i++) {
        $('#menuList').append('\
        <!-- Begin:: Section '+ asideMenu.manager[0]._section[i].name +' -->  \
        \
        <li id="'+ asideMenu.manager[0]._section[i].name +'"class="menu-section ">\
          <h4 class="menu-text">'+ asideMenu.manager[0]._section[i].name +'</h4>\
          <i class="menu-icon ki ki-bold-more-hor icon-md"></i>\
        </li>\
        <!-- End:: Section:'+ asideMenu.manager[0]._section[i].name +'-->  \
        ')
        
        // Constructing Item
        var itemLen = asideMenu.manager[0]._section[i]._item.length;
        console.log('itemLen', itemLen);

        if (itemLen > 0) {
          for (let j = 0; j < itemLen; j++) {
            $('#menuList').append('\
              <!-- Begin:: Item :'+ asideMenu.manager[0]._section[i]._item[j].name +' -->  \
              <li id="'+asideMenu.manager[0]._section[i]._item[j].name+'List" class="menu-item  menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">\
                  <a href="javascript:;" class="menu-link menu-toggle">\
                      <i class="menu-bullet menu-bullet-dot">\
                          <span></span>\
                      </i>\
                      <span class="menu-text">'+ asideMenu.manager[0]._section[i]._item[j].name +'</span><i class="menu-arrow"></i></a>\
                  <div class="menu-submenu "><i class="menu-arrow"></i>\
            ');
            
            // Constructing SubItem 1
            var subItem1Len = asideMenu.manager[0]._section[i]._item[j]._subItem1.length;
            console.log('subItem1Len', subItem1Len);

            if (subItem1Len > 0) {
              for (let k = 0; k < subItem1Len; k++) {

                // Adding Parent Item
                if (k == 0) {
                  $('#'+asideMenu.manager[0]._section[i]._item[j].name+'List').append('\
                  <div class="menu-submenu ">\
                  <i class="menu-arrow"></i>\
                    <ul id= "'+asideMenu.manager[0]._section[i]._item[j].name+'uList" class="menu-subnav">\
                        <li class="menu-item  menu-item-parent" aria-haspopup="true">\
                            <span class="menu-link">\
                                <span class="menu-text">'+ asideMenu.manager[0]._section[i]._item[j].name +'</span>\
                            </span>\
                        </li>\
                ');
                }

                // Adding Sub Item1
                $('#'+asideMenu.manager[0]._section[i]._item[j].name+'uList').append('\
                <!-- Begin:: subItem1 :'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name +' -->  \
                <li id="'+asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name+'List" class="menu-item  menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover"> \
                  <a href="javascript:;" class="menu-link menu-toggle"> \
                      <i class="menu-bullet menu-bullet-dot"> \
                          <span></span> \
                      </i> \
                      <span class="menu-text">'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name +'</span> \
                      <i class="menu-arrow"></i></a> \
              '); 
                
                
                // Constructing SubItem 2
                var subItem2Len = asideMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2.length;
                console.log('subItem1Len', subItem1Len);
                
                if (subItem2Len > 0) {
                  for (let l = 0; l < subItem2Len; l++) {
                    // Adding Parent Item
                    if (l == 0) {
                      $('#'+asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name+'List').append('\
                      <div class="menu-submenu ">\
                      <i class="menu-arrow"></i>\
                        <ul id="'+asideMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2[l].name+'uList" class="menu-subnav">\
                            <li class="menu-item  menu-item-parent" aria-haspopup="true">\
                                <span class="menu-link">\
                                    <span class="menu-text">'+ asideMenu.manager[0]._section[i]._item[j].name +'</span>\
                                </span>\
                            </li>\
                    ');
                    }

                    // Adding Sub Item2
                    $('#' + asideMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2[l].name + 'uList').append('\
                    <!-- Begin:: subItem2 :'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2[l].name + ' -->  \
                    <li class="menu-item  menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover"> \
                      <a href="javascript:;" class="menu-link menu-toggle"> \
                          <i class="menu-bullet menu-bullet-dot"> \
                              <span></span> \
                          </i> \
                          <span class="menu-text">'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2[l].name + '</span> \
                          <i class="menu-arrow"></i></a> \
                    </li>\
                    <!-- End:: subItem2:'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2[l].name + ' -->  \
                      ');
                    
                  }
                  // Closing Sub Item 2 Unordered List
                  $('#'+asideMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2[subItem2Len-1].name+'uList').append('\
                  </ul> \
                  '); 
                }
                
                // Closing Sub Item 1 List  
                $('#' + asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name + 'List').append('\
                </li>\
                <!-- End:: subItem1 '+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name + ' -->  \
                '); 
              }
              // Closing Sub Item 1 Unorder List
              $('#' + asideMenu.manager[0]._section[i]._item[j]._subItem1[subItem1Len-1].name + 'uList').append('\
              </ul>\
              ');
            }

            // Closing Item List
            $('#'+asideMenu.manager[0]._section[i]._item[j].name+'List').append('\
              </li>\
              <!-- End:: Item '+ asideMenu.manager[0]._section[i]._item[j].name +'-->  \
            ')
          }

        // Closing Item Unorder List
        $('#'+asideMenu.manager[0]._section[i]._item[itemLen-1].name+'uList').append('\
        </ul>\
        ');
        }
      }
      $('#menuList').append('</ul>');
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