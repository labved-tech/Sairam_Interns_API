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
        //console.log(asideMenu);
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