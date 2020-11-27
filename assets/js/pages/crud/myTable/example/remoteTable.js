/* eslint-disable */
//'use strict';

// Class definition

const KTDatatableRecordSelectionDemo = (function () {
  var dataSet;
  // Private functions

  const serverSelectorDemo = async () =>  {

    const options = {
      // datasource definition
      data: {
        type: 'remote',
        source: {
          read: {
            method: 'get',
            url: `${HOST_URL}/api/v1/example`,
            params: {
              fields: '_id,name,createdBy,createdAt,updatedAt',
            },
            map: function(raw) {
              // sample data mapping
              //console.log('raw', raw);
              dataSet = raw;
          
              if (typeof raw.examples !== 'undefined') {
                dataSet = raw.examples;
                console.log('dataSet', dataSet);
              }
              return dataSet;
            }
  
          },
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true,
        //autoColumns: true,  // newly added
      },
  
      // layout definition
      layout: {
        scroll: true, // enable/disable datatable scroll both horizontal and
        footer: false, // display/hide footer
        height: 450,
  
      },
  
      // column sorting
      sortable: true,
  
      pagination: true,
      search: {
        input: $('#kt_datatable_search_query_2'),
        key: 'generalSearch',
      },
  
      // columns definition
      columns: [
        {
          field: '_id',
          title: '#',
          sortable: false,
          width: 20,
          selector: {
            class: '',
          },
          textAlign: 'center',
        },
        {
          field: 'name',
          title: 'Name',
        },
        {
          field: 'createdBy',
          title: 'createdBy',
        },
        {
          field: 'createdAt',
          title: 'createdAt',
        },
        {
          field: 'updatedAt',
          title: 'updatedAt',
        },
      ],
    }
    
    // enable extension
    options.extensions = {
      // boolean or object (extension options)
      checkbox: true,
    };


    const datatable = $('#kt_datatable_2').KTDatatable(options);

    $('#kt_datatable_search_status_2').on('change', function () {
      datatable.search($(this).val().toLowerCase(), 'Status');
    });

    $('#kt_datatable_search_type_2').on('change', function () {
      datatable.search($(this).val().toLowerCase(), 'Type');
    });

    $(
      '#kt_datatable_search_status_2, #kt_datatable_search_type_2'
    ).selectpicker();

    datatable.on('datatable-on-click-checkbox', function (e) {
      // datatable.checkbox() access to extension methods
      const ids = datatable.checkbox().getSelectedId();
      const count = ids.length;

      $('#kt_datatable_selected_records_2').html(count);

      if (count > 0) {
        $('#kt_datatable_group_action_form_2').collapse('show');
      } else {
        $('#kt_datatable_group_action_form_2').collapse('hide');
      }
    });

  };

  return {
    // public functions
    init: function () {
      serverSelectorDemo();
    },
  };
})();

jQuery(document).ready(function () {
  KTDatatableRecordSelectionDemo.init();
});
