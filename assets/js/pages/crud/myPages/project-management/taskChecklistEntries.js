/* eslint-disable */
'use strict';

/* Class definition */
const TaskChecklistEntriesCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

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

    /*   Private functions */
    function _TaskChecklistEntries() {
      var dataSet;

      /* Table Options */
      const options = {
          // datasource definition
          data: {
          type: 'remote',
          source: {
              read: {
              method: 'get',
              url: `${HOST_URL}/api/v1/project/task-checklist-entries/table`,
              params: {
                fields: '_id,_taskId,finished,description,dateadded,addedBy,listOrder,createdAt,updatedAt',
            },
              map: function(raw) {
                  // sample data mapping
                  // console.log('raw', raw);
                  dataSet = raw;

                  if (typeof raw.taskChecklistEntries !== 'undefined') {
                  dataSet = raw.taskChecklistEntries;
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
          input: $('#tableTce_search_query_2'),
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
            field: 'addedBy',
            title: 'Added By',
            template: function (row) {
              return '\
                <div>\
                <a href="#">' + row.addedBy + '</a></div>\
              ';
            }
          },
          {
            field: '_taskId',
            title: 'Task ID',
          },
          {
            field: 'finished',
            title: 'FInished',
          },
          {
            field: 'description',
            title: 'Description',
          },
          {
            field: 'dateadded',
            title: 'Date Added',
          },
          {
            field: 'listOrder',
            title: 'List Order',
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
      const datatable = $('#tableTce').KTDatatable(options);

      /* Form */
      const TceForm = document.querySelector('#formTce');
      let FormSubmitButton = document.querySelector('#btnAddNewTceFormSubmitButton');
      // Options
      let formOptions = {
          fields: {
          
            tceTaskId: {
                validators: {
                    notEmpty: {
                        message: 'Task ID is required',
                },
            },
            },  
            tceDescription : {
                    validators: {
                    notEmpty: {
                            message: 'Description is required',
                },
                },
            },
            tceDateAdded: {
                validators: {
                    notEmpty: {
                        message: 'Date is required',
                },
            },
            },
            tceAddedBy: {
                validators: {
                    notEmpty: {
                        message: 'This Field is required',
                },
            },
            },
            tceListOrder: {
                validators: {
                    notEmpty: {
                        message: 'Current Repeat Number is required',
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
      $('#tableTce_search_status_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Status');
      });

      // search based on type
      $('#tableTce_search_type_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Type');
      });

      $('#tableTce_search_status_2, #tableTce_search_type_2').selectpicker();

      // modal open
      $('#btnOpenTceModal').on('click', async function (e) {
          console.log('openButton is clicked');

          // enabling disabling buttons
          $('#btnAddNewTceFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
          $('#btnSaveTceFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

          FormSubmitButton = document.querySelector('#btnAddNewTceFormSubmitButton');

          $('#modalTce').modal('show');   // open modal

          $('#modalTce').find('.modal-title').text('Add New Entries'); // Setting title for modal

      });

      // modal post closed
      $('#modalTce').on('hidden.bs.modal', function (e) {
          console.log('Modal closed');

          if (fv) {
              // clearing forms
              fv.resetForm();
              fv.destroy();
          }

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message

          // clearing fields
          $("#formTce").trigger('reset'); // clear form fields

          // manually resetting other fields
      });

      // modal post opened
      $('#modalTce').on('shown.bs.modal', function (e) {
          console.log('Modal open');

          // Initializing

        // Date & Time : Date
        $('#tceDateAdded').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });
        // List Order Number
        $('#tceListOrder').TouchSpin({
        buttondown_class: 'btn btn-secondary',
        buttonup_class: 'btn btn-secondary',
        verticalbuttons: true,
        verticalup: '<i class="ki ki-plus"></i>',
        verticaldown: '<i class="ki ki-minus"></i>',

        min: 0,
        max: 10000,
        step: 5,
        decimals: 0,
        boostat: 5,
        maxboostedstep: 10,
        prefix: ''
        });
      });

      // form reset operation
      $('#formTce').on('click', '.btnReset', function (e) {
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
          $("#formTce").trigger('reset'); // clear form fields

          // clear manually
          // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
      })

      // form add operation
      $('#formTce').on('click', '.btnAdd', function (e) {
          // console.log('btnCreate is clicked');

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message
          
          FormSubmitButton = document.querySelector('#btnAddNewTceFormSubmitButton');

          // Validation
          fv = FormValidation.formValidation(TceForm, formOptions);

          // validation failed
          fv.on('core.form.invalid', async function () {
              // console.log('Something went wrong!!');    
          });

          // validation successful
          fv.on('core.form.valid', async function () {


              // Show loading state on button
              KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

              tceFinished.value = (tceFinished.value == 'on') ? true:false
              console.log(tceFinished.value)

              // Accessing Restful API
              await axios({
                  method: 'post',
                  url: `${HOST_URL}/api/v1/project/task-checklist-entries`,
                  data: { 
                    _taskId: document.querySelector('#tceTaskId').value,
                    finished: document.querySelector('#tceFinished').value,
                    description: document.querySelector('#tceDescription').value,
                    dateadded: document.querySelector('#tceDateAdded').value,
                    addedBy: document.querySelector('#tceAddedBy').value,
                    listOrder: document.querySelector('#tceListOrder').value,
                  },
              }).then(function (res) {
              
                  // Return valid JSON
                  // console.log(res);

                  // Release button
                  KTUtil.btnRelease(FormSubmitButton);

                  if (res.data.status == 'success') {
                      // reseting & clearing
                      $('#modalTce').modal('hide')  // hiding modal form
                      toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                      $('#tableTce').KTDatatable().reload(); // reload table
                  }
                  else if (res.data.status == 'error') {
                      $('#modalTce').modal('hide')  // hiding modal form
                      toastr.error(`${res.data.message}`, `${res.data.status}`)
                  }
                  else {
                      $('#modalTce').modal('hide')
                  };
              });
          });
      });

      // form save operation
      $('#formTce').on('click', '.btnSave', function (e) {
          console.log('btnSave is clicked');

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message
          
          FormSubmitButton = document.querySelector('#btnSaveTceFormSubmitButton');

          // Validation
          fv = FormValidation.formValidation(TceForm, formOptions);

          // validation failed
          fv.on('core.form.invalid', async function () {
              // console.log('Something went wrong!!');    
          });

          // validation successful
          fv.on('core.form.valid', async function () {

              const id = document.querySelector('#tceId').value;

              // Show loading state on button
              KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

              tceFinished.value = (tceFinished.value == 'on') ? true:false
              console.log(tceFinished.value)

              // Accessing Restful API
              await axios({
                  method: 'patch',
                  url: `${HOST_URL}/api/v1/project/task-checklist-entries/${id}`,
                  data: {
                    _taskId: document.querySelector('#tceTaskId').value,
                    finished: document.querySelector('#tceFinished').value,
                    description: document.querySelector('#tceDescription').value,
                    dateadded: document.querySelector('#tceDateAdded').value,
                    addedBy: document.querySelector('#tceAddedBy').value,
                    listOrder: document.querySelector('#tceListOrder').value,
                  },
              }).then(function (res) {
                  // Return valid JSON
                  // console.log(res);

                  // Release button
                  KTUtil.btnRelease(FormSubmitButton);

                  if (res.data.status == 'success') {
                      // reseting & clearing
                      $('#modalTce').modal('hide')  // hiding modal form
                      toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                      $('#tableTce').KTDatatable().reload(); // reload table

                  }
                  else if (res.data.status == 'error') {
                      $('#modalTce').modal('hide')  // hiding modal form
                      toastr.error(`${res.data.message}`, `${res.data.status}`)
                  }
                  else {
                      $('#modalTce').modal('hide') // hiding modal form
                  };
              });
          });
      });

      // Edit Modal Window - opens modal with appropriate properties
      $('#tableTce').on('click', '.btnEdit', async function (e) {
          // console.log('btnEdit is clicked');

          var id = $(this).attr("aria-label");
          // console.log(id);

          FormSubmitButton = document.querySelector('#btnSaveTceFormSubmitButton');

          // enabling disabling buttons
          $('#btnAddNewTceFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
          $('#btnSaveTceFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

          $('#modalTce').modal('show');   // open modal

          $('#modalTce').find('.modal-title').text('Edit Entry'); // Setting title for modal

          // retrieving data
          await axios({
              method: 'GET',
              url: `${HOST_URL}/api/v1/project/task-checklist-entries/${id}`,
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
                  document.querySelector('#tceId').value = res.data.taskChecklistEntries._id;
                  document.querySelector('#tceTaskId').value = res.data.taskChecklistEntries._taskId;
                  document.querySelector('#tceFinished').value = res.data.taskChecklistEntries.finished;
                  document.querySelector('#tceDescription').value = res.data.taskChecklistEntries.description;
                  document.querySelector('#tceDateAdded').value = res.data.taskChecklistEntries.cosigneeEmail;
                  document.querySelector('#tceAddedBy').value = res.data.taskChecklistEntries.cosigneeContact;
                  document.querySelector('#tceListOrder').value = res.data.taskChecklistEntries.listOrder;
              }
              
          });
      });

      // deleteOne operation
      $('#tableTce').on('click', '.btnDelete', function (e) {
          console.log('btnDelete Clicked');
          let ids = $(this).attr("aria-label");

          ids = ids.toString();

          const requests = {
              params: {
                  _id: ids,
              }
          }

          axios.delete(`${HOST_URL}/api/v1/sales-finance/taskChecklistEntries`, requests);

          // reload table
          $('#tableTce').KTDatatable().reload();
          
      });

      // deleteAll mass operation
      datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
          // datatable.checkbox() access to extension methods
          const ids = datatable.checkbox().getSelectedId();
          const count = ids.length;
      
          $('#tableTce_selected_records_2').html(count);

          console.log(count)
      
          if (count > 0) {
              $('#tableTce_group_action_form_2').collapse('show');
          } else {
              $('#tableTce_group_action_form_2').collapse('hide');
          }
      });

      };


    return {
        // public functions
          init: function () {
          _TaskChecklistEntries();
          
        },
      };
  })();
  
  jQuery(document).ready(function () {
      TaskChecklistEntriesCRUD.init();
  });    