/* eslint-disable */
'use strict';

let arrows;
if (KTUtil.isRTL()) {
    arrows = {
    leftArrow: '<i class="la la-angle-right"></i>',
    rightArrow: '<i class="la la-angle-left"></i>',
    };
} else {
    arrows = {
    leftArrow: '<i class="la la-angle-left"></i>',
    rightArrow: '<i class="la la-angle-right"></i>',
    };
}  

/* Class definition */
const ProjectActivityCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    /*   Private functions */
    function _ProjectActivity() {
      var dataSet;

      /* Table Options */
      const options = {
          // datasource definition
          data: {
          type: 'remote',
          source: {
              read: {
              method: 'get',
              url: `${HOST_URL}/api/v1/project/activity/table`,
              params: {
                fields: '_id,_projectId,_userId,fullName,visibleToUser,descriptionKey,additionalData,dateadded,createdAt,updatedAt',
                },
              map: function(raw) {
                  // sample data mapping
                  // console.log('raw', raw);
                  dataSet = raw;

                  if (typeof raw.projectActivity !== 'undefined') {
                  dataSet = raw.projectActivity;
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
          input: $('#tablePa_search_query_2'),
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
            field: 'fullName',
            title: 'Full Name',
            template: function (row) {
              return '\
                <div>\
                <a href="#">' + row.fullName + '</a></div>\
              ';
            }
          },
          {
            field: '_projectId',
            title: 'Project ID',
          },
          {
            field: '_userId',
            title: 'User ID',
          },
          {
            field: 'visibleToUser',
            title: 'Visible To User',
          },
          {
            field: 'descriptionKey',
            title: 'Description Key',
          },
          {
            field: 'additionalData',
            title: 'Additional Data',
          },
          {
            field: 'dateadded',
            title: 'Date Added',
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
      const datatable = $('#tablePa').KTDatatable(options);

      /* Form */
      const PaForm = document.querySelector('#formPa');
      let FormSubmitButton = document.querySelector('#btnAddNewPaFormSubmitButton');
      // Options
      let formOptions = {
          fields: {
          
            paProjectId: {
                validators: {
                    notEmpty: {
                        message: 'Project ID is required',
                },
            },
            }, 
            paUserId: {
                validators: {
                    notEmpty: {
                        message: 'User ID is required',
                },
            },
            },  
            paFullName: {
                validators: {
                    notEmpty: {
                        message: 'Name is required',
                },
            },
            },  
            paDescriptionKey: {
                validators: {
                    notEmpty: {
                        message: 'Task Type is required',
                },
            },
            },
            paAdditionalData: {
                validators: {
                    notEmpty: {
                        message: 'This Field is required',
                },
            },
            },
            paDateAdded: {
                validators: {
                    notEmpty: {
                        message: 'Date is required',
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
      $('#tablePa_search_status_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Status');
      });

      // search based on type
      $('#tablePa_search_type_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Type');
      });

      $('#tablePa_search_status_2, #tablePa_search_type_2').selectpicker();

      // modal open
      $('#btnOpenPaModal').on('click', async function (e) {
          console.log('openButton is clicked');

          // enabling disabling buttons
          $('#btnAddNewPaFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
          $('#btnSavePaFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

          FormSubmitButton = document.querySelector('#btnAddNewPaFormSubmitButton');

          $('#modalPa').modal('show');   // open modal

          $('#modalPa').find('.modal-title').text('Add New Entries'); // Setting title for modal

      });

      // modal post closed
      $('#modalPa').on('hidden.bs.modal', function (e) {
          console.log('Modal closed');

          if (fv) {
              // clearing forms
              fv.resetForm();
              fv.destroy();
          }

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message

          // clearing fields
          $("#formPa").trigger('reset'); // clear form fields

          // manually resetting other fields
      });

      // modal post opened
      $('#modalPa').on('shown.bs.modal', function (e) {
          console.log('Modal open');

          // Initializing
        
          // Date & Time : Date
        $('#paDateAdded').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });
      });

      // form reset operation
      $('#formPa').on('click', '.btnReset', function (e) {
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
          $("#formPa").trigger('reset'); // clear form fields

          // clear manually
          // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
      })

      // form add operation
      $('#formPa').on('click', '.btnAdd', function (e) {
          // console.log('btnCreate is clicked');

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message
          
          FormSubmitButton = document.querySelector('#btnAddNewPaFormSubmitButton');

          // Validation
          fv = FormValidation.formValidation(PaForm, formOptions);

          // validation failed
          fv.on('core.form.invalid', async function () {
              // console.log('Something went wrong!!');    
          });

          // validation successful
          fv.on('core.form.valid', async function () {


              // Show loading state on button
              KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

              paVisibleToUser.value = (paVisibleToUser.value == 'on') ? true:false
              console.log(paVisibleToUser.value)

              // Accessing Restful API
              await axios({
                  method: 'post',   
                  url: `${HOST_URL}/api/v1/project/activity`,
                  data: { 
                      _projectId: document.querySelector('#paProjectId').value,
                      _userId: document.querySelector('#paUserId').value,
                      fullName:document.querySelector('#paFullName').value,
                      visibleToUser: document.querySelector('#paVisibleToUser').value,
                      descriptionKey: document.querySelector('#paDescriptionKey').value,
                      additionalData: document.querySelector('#paAdditionalData').value,
                      dateadded: document.querySelector('#paDateAdded').value,
                  },
              }).then(function (res) {
              
                  // Return valid JSON
                  // console.log(res);

                  // Release button
                  KTUtil.btnRelease(FormSubmitButton);

                  if (res.data.status == 'success') {
                      // reseting & clearing
                      $('#modalPa').modal('hide')  // hiding modal form
                      toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                      $('#tablePa').KTDatatable().reload(); // reload table
                  }
                  else if (res.data.status == 'error') {
                      $('#modalPa').modal('hide')  // hiding modal form
                      toastr.error(`${res.data.message}`, `${res.data.status}`)
                  }
                  else {
                      $('#modalPa').modal('hide')
                  };
              });
          });
      });

      // form save operation
      $('#formPa').on('click', '.btnSave', function (e) {
          console.log('btnSave is clicked');

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message
          
          FormSubmitButton = document.querySelector('#btnSavePaFormSubmitButton');

          // Validation
          fv = FormValidation.formValidation(PaForm, formOptions);

          // validation failed
          fv.on('core.form.invalid', async function () {
              // console.log('Something went wrong!!');    
          });

          // validation successful
          fv.on('core.form.valid', async function () {

              const id = document.querySelector('#paId').value;

              // Show loading state on button
              KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

              paVisibleToUser.value = (paVisibleToUser.value == 'on') ? true:false
              console.log(paVisibleToUser.value)

              // Accessing Restful API
              await axios({
                  method: 'patch',
                  url: `${HOST_URL}/api/v1/project/activity/${id}`,
                  data: {
                    _projectId: document.querySelector('#paProjectId').value,
                    _userId: document.querySelector('#paUserId').value,
                    fullName:document.querySelector('#paFullName').value,
                    visibleToUser: document.querySelector('#paVisibleToUser').value,
                    descriptionKey: document.querySelector('#paDescriptionKey').value,
                    additionalData: document.querySelector('#paAdditionalData').value,
                    dateadded: document.querySelector('#paDateAdded').value,
                  },
              }).then(function (res) {
                  // Return valid JSON
                  // console.log(res);

                  // Release button
                  KTUtil.btnRelease(FormSubmitButton);

                  if (res.data.status == 'success') {
                      // reseting & clearing
                      $('#modalPa').modal('hide')  // hiding modal form
                      toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                      $('#tablePa').KTDatatable().reload(); // reload table

                  }
                  else if (res.data.status == 'error') {
                      $('#modalPa').modal('hide')  // hiding modal form
                      toastr.error(`${res.data.message}`, `${res.data.status}`)
                  }
                  else {
                      $('#modalPa').modal('hide') // hiding modal form
                  };
              });
          });
      });

      // Edit Modal Window - opens modal with appropriate properties
      $('#tablePa').on('click', '.btnEdit', async function (e) {
          // console.log('btnEdit is clicked');

          var id = $(this).attr("aria-label");
          // console.log(id);

          FormSubmitButton = document.querySelector('#btnSavePaFormSubmitButton');

          // enabling disabling buttons
          $('#btnAddNewPaFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
          $('#btnSavePaFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

          $('#modalPa').modal('show');   // open modal

          $('#modalPa').find('.modal-title').text('Edit Entry'); // Setting title for modal

          // retrieving data
          await axios({
              method: 'GET',
              url: `${HOST_URL}/api/v1/project/activity/${id}`,
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
                  document.querySelector('#paId').value = res.data.projectActivity._id;
                  document.querySelector('#paProjectId').value = res.data.projectActivity._projectId;
                  document.querySelector('#paUserId').value = res.data.projectActivity._userId;
                  document.querySelector('#paFullName').value = res.data.projectActivity.fullName;
                  document.querySelector('#paVisibleToUser').value = res.data.projectActivity.visibleToUser;
                  document.querySelector('#paDescriptionKey').value = res.data.projectActivity.cosigneeEmail;
                  document.querySelector('#paAdditionalData').value = res.data.projectActivity.cosigneeContact;
                  document.querySelector('#paDateAdded').value = res.data.projectActivity.dateadded;
              }
              
          });
      });

      // deleteOne operation
      $('#tablePa').on('click', '.btnDelete', function (e) {
          console.log('btnDelete Clicked');
          let ids = $(this).attr("aria-label");

          ids = ids.toString();

          const requests = {
              params: {
                  _id: ids,
              }
          }

          axios.delete(`${HOST_URL}/api/v1/sales-finance/projectActivity`, requests);

          // reload table
          $('#tablePa').KTDatatable().reload();
          
      });

      // deleteAll mass operation
      datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
          // datatable.checkbox() access to extension methods
          const ids = datatable.checkbox().getSelectedId();
          const count = ids.length;
      
          $('#tablePa_selected_records_2').html(count);

          console.log(count)
      
          if (count > 0) {
              $('#tablePa_group_action_form_2').collapse('show');
          } else {
              $('#tablePa_group_action_form_2').collapse('hide');
          }
      });

      };


    return {
        // public functions
          init: function () {
          _ProjectActivity();
          
        },
      };
  })();
  
  jQuery(document).ready(function () {
      ProjectActivityCRUD.init();
  });    