/* eslint-disable */
'use strict';

/* Class definition */
const LeadResponseCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    /*   Private functions */
    function _LeadResponse() {
      var dataSet;

      /* Table Options */
      const options = {
          // datasource definition
          data: {
          type: 'remote',
          source: {
              read: {
              method: 'get',
              url: `${HOST_URL}/api/v1/lead/response/table`,
              params: {
                fields: '_id,_leadId,_responderId,emailSent,isStatusChange,message,status,createdBy,createdAt,updatedAt',
                },
              map: function(raw) {
                  // sample data mapping
                  // console.log('raw', raw);
                  dataSet = raw;

                  if (typeof raw.leadResponse !== 'undefined') {
                  dataSet = raw.leadResponse;
                  // console.log('dataSet', dataSet);
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
          input: $('#tableLr_search_query_2'),
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
            field: '_leadId',
            title: 'Lead ID',
            template: function (row) {
              return '\
                <div>\
                <a href="#">' + row._leadId + '</a></div>\
              ';
            }
          },
          {
            field: '_responderId',
            title: 'Responder ID',
          },
          {
            field: 'emailSent',
            title: 'Email Sent',
          },
          {
            field: 'isStatusChange',
            title: 'Status Change',
          },
          {
            field: 'message',
            title: 'Message',
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
      const datatable = $('#tableLr').KTDatatable(options);

      /* Form */
      const LrForm = document.querySelector('#formLr');
      let FormSubmitButton = document.querySelector('#btnAddNewLrFormSubmitButton');
      // Options
      let formOptions = {
          fields: {
            lrLeadId: {
                validators: {
                  notEmpty: {
                    message: 'Lead ID is required',
                  },
                },
              },
              lrResponderId: {
                validators: {
                  notEmpty: {
                    message: 'Responder ID is required',
                  },
                },
              },
              // lrEmailSent: {         
              //   validators: {
              //     notEmpty: {
              //       message: 'Is Email Sent is required',
              //     },
              //   },
              // },
              // lrIsStatusChange: {
              //   validators: {
              //     notEmpty: {
              //       message: 'Status Change is required',
              //     },
              //   },
              // },
              lrMessage: {
                validators: {
                  notEmpty: {
                    message: 'Message is required',
                  },
                },
              },
              lrStatus: {
                validators: {
                  notEmpty: {
                    message: 'Status is required',
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
      };

      let fv;

      /* Search Operations */
      // search based on status
      $('#tableLr_search_status_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Status');
      });

      // search based on type
      $('#tableLr_search_type_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Type');
      });

      $('#tableLr_search_status_2, #tableLr_search_type_2').selectpicker();

      // modal open
      $('#btnOpenLrModal').on('click', async function (e) {
          console.log('openButton is clicked');

          // enabling disabling buttons
          $('#btnAddNewLrFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
          $('#btnSaveLrFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

          FormSubmitButton = document.querySelector('#btnAddNewLrFormSubmitButton');

          $('#modalLr').modal('show');   // open modal

          $('#modalLr').find('.modal-title').text('Add New Entries'); // Setting title for modal

      });

      // modal post closed
      $('#modalLr').on('hidden.bs.modal', function (e) {
          console.log('Modal closed');

          if (fv) {
              // clearing forms
              fv.resetForm();
              fv.destroy();
          }

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message

          // clearing fields
          $("#formLr").trigger('reset'); // clear form fields

          // manually resetting other fields
      });

      // modal post opened
      $('#modalLr').on('shown.bs.modal', function (e) {
          console.log('Modal open');

          // Initializing

      });

      // form reset operation
      $('#formLr').on('click', '.btnReset', function (e) {
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
          $("#formLr").trigger('reset'); // clear form fields

          // clear manually
          // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
      })

      // form add operation
      $('#formLr').on('click', '.btnAdd', function (e) {
          // console.log('btnCreate is clicked');

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message
          
          FormSubmitButton = document.querySelector('#btnAddNewLrFormSubmitButton');

          // Validation
          fv = FormValidation.formValidation(LrForm, formOptions);

          // validation failed
          fv.on('core.form.invalid', async function () {
              // console.log('Something went wrong!!');    
          });

          // validation successful
          fv.on('core.form.valid', async function () {


              // Show loading state on button
              KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');
              
              lrIsStatusChange.value = (lrIsStatusChange.value == 'on') ? true:false
              lrEmailSent.value = (lrEmailSent.value == 'on') ? true:false
              console.log(lrIsStatusChange.value)
              console.log(lrEmailSent.value)
    
              // Accessing Restful API
              await axios({
                  method: 'post',
                  url: `${HOST_URL}/api/v1/lead/response`,
                  data: { 

                      _leadId: document.querySelector('#lrLeadId').value,
                      _responderId: document.querySelector('#lrResponderId').value,
                      emailSent:document.querySelector('#lrEmailSent').value,
                      isStatusChange: document.querySelector('#lrIsStatusChange').value,
                      message: document.querySelector('#lrMessage').value,
                      status: document.querySelector('#lrStatus').value
                  },
              }).then(function (res) {
              
                  // Return valid JSON
                  // console.log(res);

                  // Release button
                  KTUtil.btnRelease(FormSubmitButton);

                  if (res.data.status == 'success') {
                      // reseting & clearing
                      $('#modalLr').modal('hide')  // hiding modal form
                      toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                      $('#tableLr').KTDatatable().reload(); // reload table
                  }
                  else if (res.data.status == 'error') {
                      $('#modalLr').modal('hide')  // hiding modal form
                      toastr.error(`${res.data.message}`, `${res.data.status}`)
                  }
                  else {
                      $('#modalLr').modal('hide')
                  };
              });
          });
      });

      // form save operation
      $('#formLr').on('click', '.btnSave', function (e) {
          console.log('btnSave is clicked');

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message
          
          FormSubmitButton = document.querySelector('#btnSaveLrFormSubmitButton');

          // Validation
          fv = FormValidation.formValidation(LrForm, formOptions);

          // validation failed
          fv.on('core.form.invalid', async function () {
              // console.log('Something went wrong!!');    
          });

          // validation successful
          fv.on('core.form.valid', async function () {

              const id = document.querySelector('#lrId').value;

              // Show loading state on button
              KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');
              
              lrIsStatusChange.value = (lrIsStatusChange.value == 'on') ? true:false
              lrEmailSent.value = (lrEmailSent.value == 'on') ? true:false
              console.log(lrIsStatusChange.value)
              console.log(lrEmailSent.value)
              
              // Accessing Restful API
              await axios({
                  method: 'patch',
                  url: `${HOST_URL}/api/v1/lead/response/${id}`,
                  data: {
                    _leadId: document.querySelector('#lrLeadId').value,
                    _responderId: document.querySelector('#lrResponderId').value,
                    emailSent:document.querySelector('#lrEmailSent').value,
                    isStatusChange: document.querySelector('#lrIsStatusChange').value,
                    message: document.querySelector('#lrMessage').value,
                    status: document.querySelector('#lrStatus').value
                  },
              }).then(function (res) {
                  // Return valid JSON
                  // console.log(res);

                  // Release button
                  KTUtil.btnRelease(FormSubmitButton);

                  if (res.data.status == 'success') {
                      // reseting & clearing
                      $('#modalLr').modal('hide')  // hiding modal form
                      toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                      $('#tableLr').KTDatatable().reload(); // reload table

                  }
                  else if (res.data.status == 'error') {
                      $('#modalLr').modal('hide')  // hiding modal form
                      toastr.error(`${res.data.message}`, `${res.data.status}`)
                  }
                  else {
                      $('#modalLr').modal('hide') // hiding modal form
                  };
              });
          });
      });

      // Edit Modal Window - opens modal with appropriate properties
      $('#tableLr').on('click', '.btnEdit', async function (e) {
          // console.log('btnEdit is clicked');

          var id = $(this).attr("aria-label");
          // console.log(id);

          FormSubmitButton = document.querySelector('#btnSaveLrFormSubmitButton');

          // enabling disabling buttons
          $('#btnAddNewLrFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
          $('#btnSaveLrFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

          $('#modalLr').modal('show');   // open modal

          $('#modalLr').find('.modal-title').text('Edit Entry'); // Setting title for modal

          // retrieving data
          await axios({
              method: 'GET',
              url: `${HOST_URL}/api/v1/lead/response/${id}`,
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
                  document.querySelector('#lrId').value = res.data.leadResponse._id;
                  document.querySelector('#lrLeadId').value = res.data.leadResponse._leadId;
                  document.querySelector('#lrResponderId').value = res.data.leadResponse._responderId;
                  document.querySelector('#lrEmailSent').value = res.data.leadResponse.emailSent;
                  document.querySelector('#lrIsStatusChange').value = res.data.leadResponse.isStatusChange;
                  document.querySelector('#lrMessage').value = res.data.leadResponse.message;
                  document.querySelector('#lrStatus').value = res.data.leadResponse.status;
              }
              
          });
      });

      // deleteOne operation
      $('#tableLr').on('click', '.btnDelete', function (e) {
          console.log('btnDelete Clicked');
          let ids = $(this).attr("aria-label");

          ids = ids.toString();

          const requests = {
              params: {
                  _id: ids,
              }
          }

          axios.delete(`${HOST_URL}/api/v1/sales-finance/leadResponse`, requests);

          // reload table
          $('#tableLr').KTDatatable().reload();
          
      });

      // deleteAll mass operation
      datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
          // datatable.checkbox() access to extension methods
          const ids = datatable.checkbox().getSelectedId();
          const count = ids.length;
      
          $('#tableLr_selected_records_2').html(count);

          console.log(count)
      
          if (count > 0) {
              $('#tableLr_group_action_form_2').collapse('show');
          } else {
              $('#tableLr_group_action_form_2').collapse('hide');
          }
      });

      };


    return {
        // public functions
          init: function () {
          _LeadResponse();
          
        },
      };
  })();
  
  jQuery(document).ready(function () {
      LeadResponseCRUD.init();
  });    