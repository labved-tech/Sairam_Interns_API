/* eslint-disable */
'use strict';

// Class definition

const MenuFetch = (function () {

  // sourcing data
    const fetchMenu = async (queryStr) =>   {
        try {
            const { data } = await axios.get(`${HOST_URL}/api/v1/menu`, { params : {manager: queryStr}})
              return data;
          } catch (err) {
              console.log(err.message);
          }
    }
    

    // Aside Menu
    const generateAsideMenu = async () => {
      const queryStr = 'aside';
      const asideMenu = await fetchMenu(queryStr);
      //console.log(asideMenu);

        // Constructing Section
        const sectionLen = asideMenu.manager[0]._section.length;
        //console.log('sectionLen', sectionLen);
      for (let i = 0; i < sectionLen; i++) {
          $('#menuAside').append('\
          <!-- Begin::Section - Aside:'+ asideMenu.manager[0]._section[i].name +' -->  \
          \
          <li id="liAside'+ asideMenu.manager[0]._section[i].name +'"class="menu-section ">\
            <h4 class="menu-text">'+ asideMenu.manager[0]._section[i].name +'</h4>\
            <i class="menu-icon ki ki-bold-more-hor icon-md"></i>\
          </li>\
          <!-- End::Section: - Aside:'+ asideMenu.manager[0]._section[i].name +'-->  \
          ')
          
          // Constructing Item
          const itemLen = asideMenu.manager[0]._section[i]._item.length;
          //console.log('itemLen', itemLen);

          if (itemLen > 0) {
            for (let j = 0; j < itemLen; j++) {

              const subItem1Len = asideMenu.manager[0]._section[i]._item[j]._subItem1.length;
              //console.log('subItem1Len', subItem1Len);

              if (subItem1Len != 0) {
                // Adding li item with child item
                $('#menuAside').append('\
                <!-- Begin:: li Item - Aside:'+ asideMenu.manager[0]._section[i]._item[j].name +' -->  \
                <li id="liAside'+ asideMenu.manager[0]._section[i]._item[j].name +'" class="menu-item  menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">\
                    <a href="'+ asideMenu.manager[0]._section[i]._item[j].route + '" class="menu-link menu-toggle">\
                        <i class="menu-icon flaticon2-box-1">\
                            <span></span>\
                        </i>\
                        <span class="menu-text">'+ asideMenu.manager[0]._section[i]._item[j].name + '</span> \
                        <i id="iAside'+ asideMenu.manager[0]._section[i]._item[j].name +'" class= "menu-arrow" ></i >\
                    </a>\
              ');
              }
              else {
                // Adding li item no child item
                $('#menuAside').append('\
                <!-- Begin:: li Item - Aside:'+ asideMenu.manager[0]._section[i]._item[j].name +' -->  \
                <li id="liAside'+ asideMenu.manager[0]._section[i]._item[j].name +'" class="menu-item  menu-item-submenu" aria-haspopup="true">\
                    <a href="'+ asideMenu.manager[0]._section[i]._item[j].route + '" class="menu-link menu-toggle">\
                        <i class="menu-bullet menu-bullet-dot">\
                            <span></span>\
                        </i>\
                        <span class="menu-text">'+ asideMenu.manager[0]._section[i]._item[j].name + '</span> \
                    </a>\
              ');
              }

              
              // Constructing SubItem 1
              if (subItem1Len > 0) {
                for (let k = 0; k < subItem1Len; k++) {

                  // Adding Parent Item for Item
                  if (k == 0) {
                    $('#liAside'+ asideMenu.manager[0]._section[i]._item[j].name).append('\
                    <div class="menu-submenu ">\
                      <i class="menu-arrow"></i>\
                      <!-- Begin:: uL Item - Aside:'+ asideMenu.manager[0]._section[i]._item[j].name +' -->  \
                      <ul id= "ulAside'+ asideMenu.manager[0]._section[i]._item[j].name +'" class="menu-subnav">\
                          <li class="menu-item  menu-item-parent" aria-haspopup="true">\
                              <span class="menu-link">\
                                  <span class="menu-text">'+ asideMenu.manager[0]._section[i]._item[j].name +'</span>\
                              </span>\
                          </li>\
                  ');
                  }

                  const subItem2Len = asideMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2.length;
                  //console.log('subItem2Len', subItem2Len);

                  if (subItem2Len != 0) {
                    // Adding li subItem1 with child item
                    $('#ulAside'+ asideMenu.manager[0]._section[i]._item[j].name).append('\
                    <!-- Begin:: li subItem1 - Aside:'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name +' -->  \
                    <li id="liAside'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name +'" class="menu-item  menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover"> \
                      <a href="'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].route + '" class="menu-link menu-toggle"> \
                          <i class="menu-bullet menu-bullet-dot"> \
                              <span></span> \
                          </i> \
                          <span class="menu-text">'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name +'</span> \
                          <i id="iAside'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name +'" class="menu-arrow"></i>\
                      </a > \
                    '); 
                  }
                  else {
                    // Adding li item no child item
                    $('#ulAside'+ asideMenu.manager[0]._section[i]._item[j].name).append('\
                    <!-- Begin:: li subItem1 - Aside:'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name +' -->  \
                    <li id="liAside'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name +'" class="menu-item  menu-item-submenu" aria-haspopup="true"> \
                      <a href="'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].route + '" class="menu-link menu-toggle"> \
                          <i class="menu-bullet menu-bullet-dot"> \
                              <span></span> \
                          </i> \
                          <span class="menu-text">'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name +'</span> \
                      </a > \
                    '); 
                  }

                  
                  
                  // Constructing SubItem 2
                  if (subItem2Len > 0) {

                    // Opening ul subItem 1
                    $('#liAside' + asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name).append('\
                    <div class="menu-submenu ">\
                      <i class= "menu-arrow" ></i >\
                      <!-- Begin:: ul subItem1 - Aside:'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name + ' -->  \
                      <ul id="ulAside'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name +'" class="menu-subnav">\
                    ');

                    for (let l = 0; l < subItem2Len; l++) {
                      // Adding li subItem2
                      $('#ulAside' + asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name).append('\
                      <!-- Begin:: li subItem2 - Aside:'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2[l].name + ' -->  \
                      <li class="menu-item" aria-haspopup="true"> \
                        <a href="'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2[l].route + '" class="menu-link menu-toggle"> \
                            <i class="menu-bullet menu-bullet-dot"> \
                                <span></span> \
                            </i> \
                            <span class="menu-text">'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2[l].name + '</span> \
                      </li>\
                      <!-- End:: li subItem2 - Aside:'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2[l].name + ' -->  \
                        ');
                    }
                    // Closing ul subItem 1
                    $('#ulAside' + asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name).append('\
                    <!-- End:: ul subItem1 - Aside:'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name + ' -->  \
                    </ul>');
                  }
                  
                  // Closing li subItem 1
                  $('#liAside' + asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name).append('\
                    <\li>\
                    <!-- End:: li subItem1 - Aside:'+ asideMenu.manager[0]._section[i]._item[j]._subItem1[k].name +' -->  \
                  ')
                  // Closing ul Item
                  $('#ulAside' + asideMenu.manager[0]._section[i]._item[j].name).append('\
                    </ul>\
                    <!-- End:: uL Item - Aside :'+ asideMenu.manager[0]._section[i]._item[j].name +' -->  \
                  ')
              }
              }
            }
          }
        }
        $('#menuAside').append('</ul>');
    }
    // Top Menu
    const generateTopMenu = async () => {
      const queryStr = 'top';
      const topMenu = await fetchMenu(queryStr);
      console.log(topMenu);
  
        // Constructing Section
        const sectionLen = topMenu.manager[0]._section.length;
        console.log('sectionLen', sectionLen);
      for (let i = 0; i < sectionLen; i++) {
          
          // Constructing Item
          const itemLen = topMenu.manager[0]._section[i]._item.length;
          console.log('itemLen', itemLen);
  
          if (itemLen > 0) {
            for (let j = 0; j < itemLen; j++) {
  
              const subItem1Len = topMenu.manager[0]._section[i]._item[j]._subItem1.length;
              console.log('subItem1Len', subItem1Len);
  
              if (subItem1Len != 0) {
                // Adding li item with child item
                $('#menuTop').append('\
                <!-- Begin:: li Item - Top:'+ topMenu.manager[0]._section[i]._item[j].name +' -->  \
                <li id="liTop'+ topMenu.manager[0]._section[i]._item[j].name +'" class="menu-item  menu-item-submenu" aria-haspopup="true" data-menu-toggle="click">\
                    <a href="'+ topMenu.manager[0]._section[i]._item[j].route + '" class="menu-link menu-toggle">\
                        <span class="menu-text">'+ topMenu.manager[0]._section[i]._item[j].name + '</span> \
                        <i id="iTop'+ topMenu.manager[0]._section[i]._item[j].name +'" class= "menu-arrow" ></i >\
                    </a>\
              ');
              }
              else {
                // Adding li item no child item
                $('#menuTop').append('\
                <!-- Begin:: li Item - Top:'+ topMenu.manager[0]._section[i]._item[j].name +' -->  \
                <li id="liTop'+ topMenu.manager[0]._section[i]._item[j].name +'" class="menu-item" aria-haspopup="true">\
                    <a href="'+ topMenu.manager[0]._section[i]._item[j].route + '" class="menu-link">\
                        <span class="menu-text">'+ topMenu.manager[0]._section[i]._item[j].name + '</span> \
                    </a>\
              ');
              }
  
              
              // Constructing SubItem 1
              if (subItem1Len > 0) {
                for (let k = 0; k < subItem1Len; k++) {
  
                  // Adding Parent Item for Item
                  if (k == 0) {
                    $('#liTop'+ topMenu.manager[0]._section[i]._item[j].name).append('\
                    <div id="divTop'+ topMenu.manager[0]._section[i]._item[j].name + '" class="menu-submenu menu-submenu-classic menu-submenu-left">\
                      <!-- Begin:: uL Item - Top:'+ topMenu.manager[0]._section[i]._item[j].name +' -->  \
                      <ul id="ulTop'+ topMenu.manager[0]._section[i]._item[j].name +'" class="menu-subnav">\
                  ');
                  }
  
                  const subItem2Len = topMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2.length;
                  console.log('subItem2Len', subItem2Len);
  
                  if (subItem2Len != 0) {
                    // Adding li subItem1 with child item
                    $('#ulTop'+ topMenu.manager[0]._section[i]._item[j].name).append('\
                    <!-- Begin:: li subItem1 - Top:'+ topMenu.manager[0]._section[i]._item[j]._subItem1[k].name +' -->  \
                    <li id="liTop'+ topMenu.manager[0]._section[i]._item[j]._subItem1[k].name +'" class="menu-item menu-item-submenu" data-menu-toggle="hover" aria-haspopup="true" > \
                      <a href="'+ topMenu.manager[0]._section[i]._item[j]._subItem1[k].route + '" class="menu-link menu-toggle"> \
                          <i class="menu-icon flaticon2-chronometer"> \
                          </i> \
                          <span class="menu-text">'+ topMenu.manager[0]._section[i]._item[j]._subItem1[k].name +'</span> \
                          <i id="iTop'+ topMenu.manager[0]._section[i]._item[j]._subItem1[k].name +'" class="menu-arrow"></i>\
                      </a > \
                    '); 
                  }
                  else {
                    // Adding li item no child item
                    $('#ulTop'+ topMenu.manager[0]._section[i]._item[j].name).append('\
                    <!-- Begin:: li subItem1 - Top:'+ topMenu.manager[0]._section[i]._item[j]._subItem1[k].name +' -->  \
                    <li id="liTop'+ topMenu.manager[0]._section[i]._item[j]._subItem1[k].name +'" class="menu-item" aria-haspopup="true"> \
                      <a href="'+ topMenu.manager[0]._section[i]._item[j]._subItem1[k].route + '" class="menu-link"> \
                          <i class="menu-icon flaticon2-chronometer">  \
                          </i> \
                          <span class="menu-text">'+ topMenu.manager[0]._section[i]._item[j]._subItem1[k].name +'</span> \
                      </a > \
                    '); 
                  }
  
                  
                  
                  // Constructing SubItem 2
                  if (subItem2Len > 0) {

                    // Opening ul subItem 1
                    $('#liTop'+ topMenu.manager[0]._section[i]._item[j]._subItem1[k].name).append('\
                    <div id="divTop'+ topMenu.manager[0]._section[i]._item[j]._subItem1[k].name +'" class="menu-submenu menu-submenu-classic menu-submenu-right">\
                      <!-- Begin:: ul subItem1 - Top:'+  topMenu.manager[0]._section[i]._item[j]._subItem1[k].name + ' -->  \
                      <ul id="ulTop'+ topMenu.manager[0]._section[i]._item[j]._subItem1[k].name +'" class="menu-subnav">\
                    ');
  
                    console.log('inside subitem2')

                    for (let l = 0; l < subItem2Len; l++) {
                      // Adding li subItem2
                      $('#ulTop' + topMenu.manager[0]._section[i]._item[j]._subItem1[k].name).append('\
                      <!-- Begin:: li subItem2 - Top:'+ topMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2[l].name + ' -->  \
                      <li class="menu-item" aria-haspopup="true"> \
                        <a href="'+ topMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2[l].route + '" class="menu-link"> \
                            <i class="menu-bullet menu-bullet-dot"> \
                                <span></span> \
                            </i> \
                            <span class="menu-text">'+ topMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2[l].name + '</span> \
                        </a>\
                      </li>\
                      <!-- End:: li subItem2 - Top:'+ topMenu.manager[0]._section[i]._item[j]._subItem1[k]._subItem2[l].name + ' -->  \
                        ');
                    }
                    // Closing ul subItem 1
                    $('#ulTop'+ topMenu.manager[0]._section[i]._item[j]._subItem1[k].name).append('\
                      </ul>\
                    </div>\
                    <!-- End:: ul subItem1 - Top:'+ topMenu.manager[0]._section[i]._item[j]._subItem1[k].name + ' -->  \
                    ');
                  }
                  
                  // Closing li subItem 1
                  $('#liTop' + topMenu.manager[0]._section[i]._item[j]._subItem1[k].name).append('\
                    <\li>\
                    <!-- End:: li subItem1 - Top:'+ topMenu.manager[0]._section[i]._item[j]._subItem1[k].name +' -->  \
                  ')
                  // Closing ul Item
                  $('#ulTop' + topMenu.manager[0]._section[i]._item[j].name).append('\
                    </ul>\
                  </div>\
                  <!-- End:: uL Item - Top :'+ topMenu.manager[0]._section[i]._item[j].name +' -->  \
                  ')
                }
              }
            }
          }
        }
        $('#menuTop').append('</ul>');
    }


    return {
        // Public functions
        init: function () {
        // Aside Menu
        generateAsideMenu();
        // Top Menu
        generateTopMenu();
        },
      };
      
})();

jQuery(document).ready(function () {
    MenuFetch.init();
  });