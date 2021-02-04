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
 
          // manually resetting other fields
          $('#nmExpires').empty().trigger('change');  // clearing select2  */
 
      });
        
      // modal post opened
      $('modalNm').on('shown.bs.modal', function (e) {

      // Initializing 
      $('#nmMessage').summernote({
        height: 400,
        tabsize: 2,
      });

      $('#nmEmail').select2({
        placeholder: "Select expiry"
      });

    });

     // Edit Modal Window - opens modal with appropriate properties
     $('#tableNm').on('click', '.btnEdit', async function (e) {
      // console.log('btnEdit is clicked');

      var id = $(this).attr("aria-label");
      // console.log(id);

      FormSubmitButton = document.querySelector('#btnSaveNmFormSubmitButton');

      // enabling disabling buttons
      $('#btnAddNewNmFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
      $('#btnSaveNmFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

      $('#modalNm').modal('show');   // open modal

      $('#modalNm').find('.modal-title').text('Edit Entry'); // Setting title for modal
        // retrieving data
        await axios({
          method: 'GET',
          url: `${HOST_URL}/api/v1/newsletter/messages/${id}`,
      }).then(async function (res) {
          // Return valid JSON
          console.log(res);

        if (res.data.status == 'success') {
            
              // // fetching menu manager select2
              // await axios({
              //     method: 'GET',
              //     url: `${HOST_URL}/api/v1/menu/manager/popSel2/`+ res.data.menuManager._id,
              // }).then(function (res) {
              //     //Return valid JSON
              //     console.log(res);

              //     if (res.data.status === 'success') {
              //         // updating menuManagerSelect values
              //         var option = new Option(res.data.manager.text, res.data.manager.id, true, true);
              //         $('#menuManagerSelect').append(option).trigger('change');
              //     }
              // });

              // updating fields with data
              document.querySelector('#nmId').value = res.data.newsletterMessages._id;
              document.querySelector('#nmSubject').value = res.data.newsletterMessages.subject;
              document.querySelector('#nmMessage').value = res.data.newsletterMessages.message;
              document.querySelector('#nmEmail').value = res.data.newsletterMessages.email;
              document.querySelector('#nmSent').value = res.data.newsletterMessages.sent;
              document.querySelector('#nmVisited').value = res.data.newsletterMessages.visited;                
          }
      });
    });
      // form reset operation
      $('#formNm').on('click', '.btnReset', function (e) {
        // console.log('btnResetMenuSectionForm is clicked');

        if (fv) {
            // clearing forms
            fv.resetForm();
            fv.destroy();
        }
        else {
            // initiate validation
            fv = FormValidation.formValidation(menuSectionForm, formOptions);
        }

        // clearing validator messages
        $('.fv-plugins-message-container').text(''); // remove message

        // clearing fields
        $("#formNm").trigger('reset'); // clear form fields

        // clear manually
        // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
      })
      // form add operation
      $('#formNm').on('click', '.btnAdd', function (e) {
        // console.log('addMenuSectionFormSubmitButton is clicked');

        // clearing validator messages
        $('.fv-plugins-message-container').text(''); // remove message
        
        FormSubmitButton = document.querySelector('#btnAddNewNmFormSubmitButton');

        // Validation
        fv = FormValidation.formValidation(NmForm, formOptions);

        // validation failed
        fv.on('core.form.invalid', async function () {
            // console.log('Something went wrong!!');    
        });

        // validation successful
        fv.on('core.form.valid', async function () {

            // Show loading state on button
            KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

            // Accessing Restful API
            await axios({
                method: 'post',
                url: `${HOST_URL}/api/v1/newsletter/messages`,
                data: {
                    title: document.querySelector('#nmID').value,
                    message: $('#nmMessage').summernote('code'),   // not working - Summernote WYSIWYG
                    subject: document.querySelector('#nmSubject').value,
                    email: document.querySelector('#nmEmail').value,   //if(aeIsEmailReq.value=== 'on') return true
                    sent: document.querySelector('#nmSent').value * 1,
                    visited: document.querySelector('#nmVisited').value,
                },
            }).then(function (res) {
                // Release button
                KTUtil.btnRelease(FormSubmitButton);

                if (res.data.status == 'success') {
                    // reseting & clearing
                    $('#modalNm').modal('hide')  // hiding modal form
                    toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                    $('#modalNm').KTDatatable().reload(); // reload table
                }
                else if (res.data.status == 'error') {
                    $('#modalNm').modal('hide')  // hiding modal form
                    toastr.error(`${res.data.message}`, `${res.data.status}`)
                }
                else {
                    $('#modalNm').modal('hide')
                };
            });
        });
      });

    };

        
        
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

