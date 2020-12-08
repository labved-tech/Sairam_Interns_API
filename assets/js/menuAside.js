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
        <!-- Begin::Section - '+ asideMenu.manager[0]._section[i].name +' -->  \
        \
        <li id="'+ asideMenu.manager[0]._section[i].name +'"class="menu-section ">\
          <h4 class="menu-text">'+ asideMenu.manager[0]._section[i].name +'</h4>\
          <i class="menu-icon ki ki-bold-more-hor icon-md"></i>\
        </li>\
        <!-- End::Section: - '+ asideMenu.manager[0]._section[i].name +'-->  \
        ')
        
        // Constructing Item
        var itemLen = asideMenu.manager[0]._section[i]._item.length;
        console.log('itemLen', itemLen);

        if (itemLen > 0) {
          for (let j = 0; j < itemLen; j++) {
            $('#menuList').append('\
              <!-- Begin:: li Item :'+ asideMenu.manager[0]._section[i]._item[j].name +' -->  \
              <li id="li'+ asideMenu.manager[0]._section[i]._item[j].name +'" class="menu-item  menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">\
                  <a href="'+ asideMenu.manager[0]._section[i]._item[j].route + '" class="menu-link menu-toggle">\
                      <i class="menu-bullet menu-bullet-dot">\
                          <span></span>\
                      </i>\
                      <span class="menu-text">'+ asideMenu.manager[0]._section[i]._item[j].name + '</span> \
                      <i id="i'+ asideMenu.manager[0]._section[i]._item[j].name +'" class= "menu-arrow" ></i >\
                  </a>\
            ');
            
            // Constructing SubItem 1
            var subItem1Len = asideMenu.manager[0]._section[i]._item[j]._subItem1.length;
            console.log('subItem1Len', subItem1Len);

            if (subItem1Len > 0) {
              for (let k = 0; k < subItem1Len; k++) {

                // Adding Parent Item for Item
                if (k == 0) {
                  $('#li'+ asideMenu.manager[0]._section[i]._item[j].name).append('\
                  <div class="menu-submenu ">\
                    <i class="menu-arrow"></i>\
                    <!-- Begin:: uL Item :'+ asideMenu.manager[0]._section[i]._item[j].name +' -->  \
                    <ul id= "ul'+ asideMenu.manager[0]._section[i]._item[j].name +'" class="menu-subnav">\
                        <li class="menu-item  menu-item-parent" aria-haspopup="true">\
                            <span class="menu-link">\
                                <span class="menu-text">'+ asideMenu.manager[0]._section[i]._item[j].name +'</span>\
                            </span>\
                        </li>\
                ');
                }

                // Adding li subItem1
                $('#ul'+ asideMenu.manager[0]._section[i]._item[j].name).append('\
                <!-- Begin:: li subItem1 :'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name +' -->  \
                <li id="li'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name +'" class="menu-item  menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover"> \
                  <a href="'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].route + '" class="menu-link menu-toggle"> \
                      <i class="menu-bullet menu-bullet-dot"> \
                          <span></span> \
                      </i> \
                      <span class="menu-text">'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name +'</span> \
                      <i id="'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name +'" class="menu-arrow"></i>\
                  </a > \
              '); 
                
                
                // Constructing SubItem 2
                var subItem2Len = asideMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2.length;
                console.log('subItem1Len', subItem1Len);
                
                if (subItem2Len > 0) {

                  // Opening ul subItem 1
                  $('#li' + asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name).append('\
                  <div class="menu-submenu ">\
                    <i class= "menu-arrow" ></i >\
                    <!-- Begin:: ul subItem1 :'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name + ' -->  \
                    <ul id="ul'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name +'" class="menu-subnav">\
                  ');

                  for (let l = 0; l < subItem2Len; l++) {
                    // Adding li subItem2
                    $('#ul' + asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name).append('\
                    <!-- Begin:: li subItem2 :'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2[l].name + ' -->  \
                    <li class="menu-item" aria-haspopup="true"> \
                      <a href="'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2[l].route + '" class="menu-link menu-toggle"> \
                          <i class="menu-bullet menu-bullet-dot"> \
                              <span></span> \
                          </i> \
                          <span class="menu-text">'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2[l].name + '</span> \
                    </li>\
                    <!-- End:: li subItem2:'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2[l].name + ' -->  \
                      ');
                  }
                  // Closing ul subItem 1
                  $('#ul' + asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name).append('\
                  <!-- End:: ul subItem1 :'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name + ' -->  \
                  </ul>');
                }
                else {
                  $('#li' + asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name).removeAttr("data-menu-toggle");
                  $('#i'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name).remove();
                }
                // Closing li subItem 1
                $('#li' + asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name).append('\
                  <\li>\
                  <!-- End:: li subItem1 :'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name +' -->  \
                ')
                // Closing ul Item
                $('#ul' + asideMenu.manager[0]._section[i]._item[j].name).append('\
                  </ul>\
                  <!-- End:: uL Item :'+ asideMenu.manager[0]._section[i]._item[j].name +' -->  \
                ')
             }
            }
            else {
              console.log($('#li' + asideMenu.manager[0]._section[i]._item[j].name).html());
              $('#li'+ asideMenu.manager[0]._section[i]._item[j].name).removeAttr("data-menu-toggle");
              $('#i'+ asideMenu.manager[0]._section[i]._item[j].name).remove();
            }
          }
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