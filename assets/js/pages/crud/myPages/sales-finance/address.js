/* eslint-disable */
'use strict';

/* Class definition */
const SalesFinanceCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    /*   Private functions */
    function _Address() {
      var dataSet;

      /* Table Options */
      const options = {
        // datasource definition
        data: {
          type: 'remote',
          source: {
            read: {
              method: 'get',
              url: `${HOST_URL}/api/v1/sales-finance/address/table`,
              params: {
                fields: '_id, address, city, state, country, status,pinCode, createdBy,createdAt,updatedAt',
              },
              map: function(raw) {
                // sample data mapping
                console.log('raw', raw);
                dataSet = raw;
            
                if (typeof raw.address !== 'undefined') {
                  dataSet = raw.address;
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
          input: $('#tableA_search_query_2'),
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
              field: 'address',
              title: 'Address',
            },
            {
              field: 'city',
              title: 'City',
            },
            {
              field: 'state',
              title: 'State',
            },
            {
              field: 'country',
              title: 'Country ',
            },
            {
              field: 'pinCode',
              title: 'Pin Code',
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
          {
              field: 'Actions',
              title: 'Actions',
              sortable: false,
              width: 125,
              overflow: 'visible',
                  autoHide: false,
              template: function (row) {
                  return '\
                              <div class="dropdown dropdown-inline">\
                                  <a href="javascript:;" class="btn btn-sm btn-clean btn-icon mr-2" data-toggle="dropdown">\
                                  <i class="fas fa-cog">\
                                  </i>\
                                  </a>\
                                  <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
                                      <ul class="navi flex-column navi-hover py-2">\
                                          <li class="navi-header font-weight-bolder text-uppercase font-size-xs text-primary pb-2">\
                                              Choose an action:\
                                          </li>\
                                          <li class="navi-item">\
                                              <a href="#" class="navi-link">\
                                                  <span class="navi-icon"><i class="fas fa-print"></i></span>\
                                                  <span class="navi-text">Print</span>\
                                              </a>\
                                          </li>\
                                          <li class="navi-item">\
                                              <a href="#" class="navi-link">\
                                                  <span class="navi-icon"><i class="fas fa-copy"></i></span>\
                                                  <span class="navi-text">Copy</span>\
                                              </a>\
                                          </li>\
                                          <li class="navi-item">\
                                              <a href="#" class="navi-link">\
                                                  <span class="navi-icon"><i class="fas fa-file-excel"></i></span>\
                                                  <span class="navi-text">Excel</span>\
                                              </a>\
                                          </li>\
                                          <li class="navi-item">\
                                              <a href="#" class="navi-link">\
                                                  <span class="navi-icon"><i class="fas fa-file-csv"></i></span>\
                                                  <span class="navi-text">CSV</span>\
                                              </a>\
                                          </li>\
                                          <li class="navi-item">\
                                              <a href="#" class="navi-link">\
                                                  <span class="navi-icon"><i class="fas fa-file-pdf"></i></span>\
                                                  <span class="navi-text">PDF</span>\
                                              </a>\
                                          </li>\
                                      </ul>\
                                  </div>\
                              </div>\
                              <a href="javascript:;" id="btnEdit" class="btn btn-sm btn-clean btn-icon btnEdit" title="Edit details" data-filed="_id" aria-label="'+ row._id +'">\
                              <i class="far fa-edit">\
                              </i>\
                              </a>\
                              <a href="javascript:;" id="btnDelete" class="btn btn-sm btn-clean btn-icon btnDelete" title="Delete" data-filed="_id" aria-label="'+ row._id +'">\
                              <i class="far fa-trash-alt">\
                              </i>\
                              </a>\
                          ';
            },
          },
        ],
      }
        options.extensions = {
        // boolean or object (extension options)
        checkbox: true,
      };

      /* Table Initialize */
      const datatable = $('#tableA').KTDatatable(options);

      /* Form */
      const AForm = document.querySelector('#formA');
      let FormSubmitButton = document.querySelector('#btnAddNewAFormSubmitButton');
      // Options
      let formOptions =    {
        fields: {
            adAddress: {
                validators: {
                    notEmpty: {
                        message: 'Newsletter ID is required',
                    },
                },
            },
            adCity: {
                validators: {
                    notEmpty: {
                        message: 'Subject is required',
                    },
                },
            },
            adState: {
                validators: {
                    notEmpty: {
                        message: 'Recipient Email is required',
                    },
                },
            },
            adCountry: {
                validators: {
                    notEmpty: {
                        message: 'Recipient Email is required',
                    },
                },
            },
            adPincode: {
                validators: {
                    notEmpty: {
                        message: 'Recipient Email is required',
                    },
                },
            },
        
            aeMessage: {
                validators: {
                callback: {
                    message: 'The content is required and cannot be empty',
                    callback: function (input) {
                    const code = $('[name="aeMessage"]').summernote('code');
                    // <p><br></p> is code generated by Summernote for empty content
                    return (code !== '' && code !== '<p><br></p>');
                }
            },
            },
            },
            },
          plugins: {
              //Learn more: https://formvalidation.io/guide/plugins
              trigger: new FormValidation.plugins.Trigger(),
              // Bootstrap Framework Integration
              bootstrap: new FormValidation.plugins.Bootstrap(),
              // Validate fields when clicking the Submit button
              FormSubmitButton: new FormValidation.plugins.SubmitButton(),
              // Submit the form when all fields are valid
              //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),     
          },
      }

/* Search Operations */
      // search based on status
      $('#tableA_search_status_2').on('change', function () {
        datatable.search($(this).val().toLowerCase(), 'Status');
      });

      // search based on type
      $('#tableA_search_type_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Type');
      });

        $('#tableA_search_status_2, #tableA_search_type_2').selectpicker();
        
      /* Modal Operations */
      // to open modal 
      $('#btnOpenAModal').on('click', async function (e) {
      // console.log('btnNewItem is clicked');

      FormSubmitButton = document.querySelector('#btnAddNewAFormSubmitButton');

      // enabling disabling buttons
      $('#btnAddNewAFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
      $('#btnSaveAFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

      $('#modalA').modal('show');   // open modal  

      $('#modalA').find('.modal-title').text('Add New Address Notification'); // Setting title for modal

      });
        
    //   // modal post closed
    //   $('#modalA').on('hidden.bs.modal', function (e) {
    //       //  console.log('Modal is closed');

    //       if (fv) {
    //           // clearing forms
    //           fv.resetForm();
    //           fv.destroy();
    //        }

    //        // clearing validator messages
    //        $('.fv-plugins-message-container').text(''); // remove message

    //        // clearing fields
    //        $("#formA").trigger('reset'); // clear form fields
           

    //   });
        
    //   // modal post opened
    //   $('#modalA').on('shown.bs.modal', function (e) {

    //   // Initializing 


    //   });
        
        
    };
    return {
        // public functions
          init: function () {
          _Address();
          
        },
      };
  })();
  
  jQuery(document).ready(function () {
      SalesFinanceCRUD.init();
  });    