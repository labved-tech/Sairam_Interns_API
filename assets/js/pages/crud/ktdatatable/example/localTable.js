/* eslint-disable */
'use strict';

// Class definition

const KTDatatableDataLocalDemo = (function () {
  // Private functions

  // sourcing data
  const getExampleData = async () => {
    try {
        const {data} = await axios.get(`${HOST_URL}/api/v1/example`);
        return data;
    } catch (err) {
        console.log(err.message);
    }
  }

  

  // demo initializer
  const demo = async () => {
    var data = await getExampleData();
    console.log(data);  

    const options = {
      // datasource definition
      data: {
        type: 'local',
        source: data.examples,
        pageSize: 10,
      },
  
      // layout definition
      layout: {
        scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
        // height: 450, // datatable's body's fixed height
        footer: false, // display/hide footer
      },
  
      // column sorting
      sortable: true,
  
      pagination: true,
  
      search: {
        input: $('#kt_datatable_search_query'),
        key: 'generalSearch',
      },
  
      // columns definition
      columns: [
        {
          field: '_id',
          title: '#',
          sortable: false,
          width: 20,
          type: 'number',
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
          type: 'date',
          format: 'MM/DD/YYYY',
        },
        {
          field: 'updatedAt',
          title: 'updatedAt',
        },
      ],
    }

    const datatable = $('#kt_datatable').KTDatatable(options);

    $('#kt_datatable_search_status').on('change', function () {
      datatable.search($(this).val().toLowerCase(), 'Status');
    });

    $('#kt_datatable_search_type').on('change', function () {
      datatable.search($(this).val().toLowerCase(), 'Type');
    });

    $('#kt_datatable_search_status, #kt_datatable_search_type').selectpicker();
  };

  return {
    // Public functions
    init: function () {
      // init dmeo
      demo();
    },
  };
})();

jQuery(document).ready(function () {
  KTDatatableDataLocalDemo.init();
});
