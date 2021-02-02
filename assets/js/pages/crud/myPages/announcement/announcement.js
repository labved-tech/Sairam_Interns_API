/* eslint-disable */
'use strict';

/* Class definition */
const AnnouncementCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    /*   Private functions */
    function _AnnouncementEntries() {
      var dataSet;

      /* Table Options */
      const options = {
        // datasource definition
        data: {
          type: 'remote',
          source: {
            read: {
              method: 'get',
              url: `${HOST_URL}/api/v1/announcement/entries/table`,
              params: {
                fields: '_id, title, from, priority, expires, status, createdBy,createdAt,updatedAt',
              },
              map: function(raw) {
                // sample data mapping
                console.log('raw', raw);
                dataSet = raw;
            
                if (typeof raw.announcementEntries !== 'undefined') {
                  dataSet = raw.announcementEntries;
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
          input: $('#tableAe_search_query_2'),
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
            field: 'title',
            title: 'Title',
          },
          {
            field: 'from',
            title: 'From',
          },
          {
            field: 'priority',
            title: 'Priority',
          },
          {
            field: 'expires',
            title: 'Expires In',
          },
          {
            field: 'status',
            title: 'Status',
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
            field: 'details',
            title: 'Details',
            textAlign: 'center',
            //width: 100,
            sortable: false,
            template: function () {
              return '\
                <a href="#" class="btn btn-sm btn-light" role="button">\
                  view details\
                </a >\
              '
              ;
            },
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
      const datatable = $('#tableAe').KTDatatable(options);

      /* Form */
      const AeForm = document.querySelector('#formAe');
      let FormSubmitButton = document.querySelector('#btnAddNewAeFormSubmitButton');
      // Options
      let formOptions =    {
        fields: {
          aeTitle: {
            validators: {
              notEmpty: {
                message: 'Title is required',
              },
            },
          },
          aeFrom: {
            validators: {
              notEmpty: {
                message: 'From email address cannot be empty',
              },
            },
          },
          aeExpires: {
            validators: {
              notEmpty: {
                message: 'Select expiry option',
              },
            },
          },
          aePriority: {
            validators: {
              notEmpty: {
                message: 'This field is required',
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
      $('#tableAe_search_status_2').on('change', function () {
        datatable.search($(this).val().toLowerCase(), 'Status');
      });

      // search based on type
      $('#tableAe_search_type_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Type');
      });

      $('#tableAe_search_status_2, #tableAe_search_type_2').selectpicker();

      $('#btnOpenAeModal').on('click', async function (e) { 
        console.log("openButton is clicked");

        // enabling disabling buttons
        $('#btnAddNewAeFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
        $('#btnSaveAeFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

        FormSubmitButton = document.querySelector('#btnAddNewAeFormSubmitButton');
  
        $('#modalAe').modal('show');   // open modal  
  
        $('#modalAe').find('.modal-title').text('Add New Entries'); // Setting title for modal
  
      });

    };

    /*   Private functions */
    function _AnnouncementNotification() {
        var dataSet;

        /* Table Options */
        const options = {
          // datasource definition
          data: {
            type: 'remote',
            source: {
              read: {
                method: 'get',
                url: `${HOST_URL}/api/v1/announcement/notification/table`,
                params: {
                  fields: '_id, _announcementId, priority, createdBy,createdAt,updatedAt,updatedBy',
                },
                map: function (raw) {
                  // sample data mapping
                  console.log('raw', raw);
                  dataSet = raw;
    
                  if (typeof raw.announcementNotification !== 'undefined') {
                    dataSet = raw.announcementNotification;
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
              field: '_announcementId',
              title: 'Announcement Id',
            },
    
            {
              field: 'priority',
              title: 'Priority',
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
              field: 'details',
              title: 'Details',
              textAlign: 'center',
              //width: 100,
              sortable: false,
              template: function () {
                return '\
                    <a href="#" class="btn btn-sm btn-light" role="button">\
                      view details\
                    </a >\
                  '
                  ;
              },
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
        const datatable = $('#tableAn').KTDatatable(options);

        /* Form Initialize */
        const AnForm = document.querySelector('#formAn');
        let FormSubmitButton = document.querySelector('#btnAddNewAnFormSubmitButton');
        let formOptions =    {
            fields: {
              anID: {
                validators: {
                  notEmpty: {
                    message: 'Announcement ID is required',
                  },
                },
              },
      
              anRecipientID: {
                validators: {
                  notEmpty: {
                    message: 'Recipient ID is required',
                  },
                },
              },
      
              anPriority: {
                validators: {
                  notEmpty: {
                    message: 'Priority is required',
                  },
                },
              },
      
              anName: {
                validators: {
                  notEmpty: {
                    message: 'Name is required',
                  },
                },
              },
      
              anEmail: {
                validators: {
                  notEmpty: {
                    message: 'Email is required',
                  },
                },
              },
      
              anIsEmailSent: {
                validators: {
                  notEmpty: {
                    message: 'This Field is required',
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
      $('#tableAn_search_status_2').on('change', function () {
        datatable.search($(this).val().toLowerCase(), 'Status');
      });

      // search based on type
      $('#tableAn_search_type_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Type');
      });

        $('#tableAn_search_status_2, #tableAn_search_type_2').selectpicker();
        
      /* Modal Operations */
      // to open modal 
      $('#btnOpenAnModal').on('click', async function (e) {
      // console.log('btnNewItem is clicked');

      FormSubmitButton = document.querySelector('#btnAddNewAnFormSubmitButton');

      // enabling disabling buttons
      $('#btnAddNewAnFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
      $('#btnSaveAnFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

      $('#modalAn').modal('show');   // open modal  

      $('#modalAn').find('.modal-title').text('Add New Announcement Notification'); // Setting title for modal

      });
        
      // modal post closed
      $('#modalAn').on('hidden.bs.modal', function (e) {
          //  console.log('Modal is closed');

          if (fv) {
              // clearing forms
              fv.resetForm();
              fv.destroy();
           }

           // clearing validator messages
           $('.fv-plugins-message-container').text(''); // remove message

           // clearing fields
           $("#formAn").trigger('reset'); // clear form fields
           
           // manually resetting other fields
           $('#anEmail').empty().trigger('change');  // clearing select2  */

      });
        
      // modal post opened
      $('#modalAn').on('shown.bs.modal', function (e) {

      // Initializing 


      });
        
        
    };

    return {
      // public functions
        init: function () {
        _AnnouncementEntries();
        _AnnouncementNotification();
      },
    };
})();

jQuery(document).ready(function () {
    AnnouncementCRUD.init();
});