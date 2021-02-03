/* eslint-disable */
'use strict';

/* Class definition */
const NewsletterCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';
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
                url: `${HOST_URL}/api/v1/newsletter/messages/table`,
                params: {
                  fields: '_id, _newsletterId, subject,message,recipientEmail,sent,visited, createdBy,createdAt,updatedAt,updatedBy',
                },
                map: function (raw) {
                  // sample data mapping
                  console.log('raw', raw);
                  dataSet = raw;
    
                  if (typeof raw.newsletterMessages !== 'undefined') {
                    dataSet = raw.newsletterMessages;
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
                field: '_newsletterId',
                title: 'Newsletter Id',
              },
      
              {
                field: 'subject',
                title: 'Subject',
              },
              {
                  field: 'message',
                  title: 'Message',
              },
              {
                  field: 'recipientEmail',
                  title: 'Recipient Email',
              },
              {
                  field: 'sent',
                  title: 'Sent',
              },
              {
                  field: 'visited',
                  title: 'Visited',
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
        const datatable = $('#tableNm').KTDatatable(options);

        /* Form Initialize */
        const NmForm = document.querySelector('#formNm');
        let FormSubmitButton = document.querySelector('#btnAddNewNmFormSubmitButton');
        let formOptions =    {
            fields: {
                nmID: {
                    validators: {
                        notEmpty: {
                            message: 'Newsletter ID is required',
                        },
                    },
                },
                nmSubject: {
                    validators: {
                        notEmpty: {
                            message: 'Subject is required',
                        },
                    },
                },
                nmEmail: {
                    validators: {
                        notEmpty: {
                            message: 'Recipient Email is required',
                        },
                    },
                },
                nmMessage: {
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
      $('tableNm_search_status_2').on('change', function () {
        datatable.search($(this).val().toLowerCase(), 'Status');
      });

      // search based on type
      $('#tableNm_search_status_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Type');
      });

        $('#tableNm_search_status_2, #tableNm_search_status_2').selectpicker();
        
      /* Modal Operations */
      // to open modal 
      $('#btnOpenNmModal').on('click', async function (e) {
      // console.log('btnNewItem is clicked');

      FormSubmitButton = document.querySelector('#btnAddNewNmFormSubmitButton');

      // enabling disabling buttons
      $('#btnAddNewNmFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
      $('#btnSaveNmFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

      $('#modalNm').modal('show');   // open modal  

      $('#modalNm').find('.modal-title').text('Add New Newsletter Messages'); // Setting title for modal

      });
        
      // modal post closed
      $('#modalNm').on('hidden.bs.modal', function (e) {
          //  console.log('Modal is closed');

          if (fv) {
              // clearing forms
              fv.resetForm();
              fv.destroy();
           }

           // clearing validator messages
           $('.fv-plugins-message-container').text(''); // remove message

           // clearing fields
           $("#formNm").trigger('reset'); // clear form fields
           

      });
        
      // modal post opened
      $('modalNm').on('shown.bs.modal', function (e) {

      // Initializing 


      });
        
        
    };
    return {
        // public functions
          init: function () {
          _NewsletterMessages();
          
        },
      };
  })();
  
jQuery(document).ready(function () {
      NewsletterCRUD.init();
});    

