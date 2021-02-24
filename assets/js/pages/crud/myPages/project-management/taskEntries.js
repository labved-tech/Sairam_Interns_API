/* eslint-disable */
'use strict';

/* Class definition */
const TaskEntriesCRUD = (function () {
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
    function _TaskEntries() {
      var dataSet;

      /* Table Options */
      const options = {
          // datasource definition
          data: {
          type: 'remote',
          source: {
              read: {
              method: 'get',
              url: `${HOST_URL}/api/v1/project/task-entries/table`,
              params: {
                fields: '_id,_projectId,name,taskType,description,status,dateFinished,isRepeat,repeatFromDate,repeatLastDate,repeatInterval,repeatIntervalType,currentRepeatNumber,totalRepeatAllowed,deadlineNotified,milestone,milestoneOrder,kanbanOrder,taskFormURL,startDate,dateadded,dueDate,assignedTo,createdAt,updatedAt',
            },
              map: function(raw) {
                  // sample data mapping
                  // console.log('raw', raw);
                  dataSet = raw;

                  if (typeof raw.taskEntries !== 'undefined') {
                  dataSet = raw.taskEntries;
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
          input: $('#tableTe_search_query_2'),
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
            template: function (row) {
              return '\
                <div>\
                <a href="#">' + row.name + '</a></div>\
              ';
            }
          },
          {
            field: 'taskType',
            title: 'Task Type',
          },
          {
            field: 'description',
            title: 'Description',
          },
          {
            field: 'status',
            title: 'Status',
          },
          {
            field: 'dateFinished',
            title: 'Date Finished',
          },
          {
            field: 'isRepeat',
            title: 'Is Repeat',
          },
          {
            field: 'repeatFromDate',
            title: 'Repeat From Date',
          },
          {
            field: 'repeatLastDate',
            title: 'Repeat Last Date',
          },
          {
            field: 'repeatInterval',
            title: 'Repeat Interval',
          },
          {
            field: 'repeatIntervalType',
            title: 'Repeat Interval Type',
          },
          {
            field: 'currentRepeatNumber',
            title: 'Current Repeat Number',
          },
          {
            field: 'totalRepeatAllowed',
            title: 'Total Repeat Allowed',
          },
          {
            field: 'deadlineNotified',
            title: 'Deadline Notified',
          },
          {
            field: 'milestone',
            title: 'Milestone',
          },
          {
            field: 'milestoneOrder',
            title: 'Milestone Order',
          },
          {
            field: 'kanbanOrder',
            title: 'Kanban Order',
          },
          {
            field: 'taskFormURL',
            title: 'Task Form URL',
          },
          {
            field: 'startDate',
            title: 'Start Date',
          },
          {
            field: 'dateadded',
            title: 'Date Added',
          },
          {
            field: 'dueDate',
            title: 'Due Date',
          },
          {
            field: 'assignedTo',
            title: 'Assigned To',
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
      const datatable = $('#tableTe').KTDatatable(options);

      /* Form */
      const TeForm = document.querySelector('#formTe');
      let FormSubmitButton = document.querySelector('#btnAddNewTeFormSubmitButton');
      // Options
      let formOptions = {
          fields: {
            teProjectId: {
                validators: {
                    notEmpty: {
                        message: 'Project ID is required',
                },
            },
            },  
            teName: {
                validators: {
                    notEmpty: {
                        message: 'Name is required',
                },
            },
            },  
            teTaskType: {
                validators: {
                    notEmpty: {
                        message: 'Task Type is required',
                },
            },
            },
            teDescription : {
                    validators: {
                    notEmpty: {
                            message: 'Description is required',
                },
                },
            },
            teStatus: {
                validators: {
                    notEmpty: {
                        message: 'Status is required',
                },
            },
            }, 
            teDateFinished: {
                validators: {
                    notEmpty: {
                        message: 'Date is required',
                },
            },
            },
            teRepeatFormDate: {
                validators: {
                    notEmpty: {
                        message: 'Date is required',
                },
            },
            },
            teRepeatLastDate: {
                validators: {
                    notEmpty: {
                        message: 'Date is required',
                },
            },
            },
            teRepeatInterval: {
                validators: {
                    notEmpty: {
                        message: 'Repeat Interval is required',
                },
            },
            },
            teRepeatIntervalType: {
                validators: {
                    notEmpty: {
                        message: 'This Field is required',
                },
            },
            },
            teCurrentRepeatNumber: {
                validators: {
                    notEmpty: {
                        message: 'Current Repeat Number is required',
                },
            },
            },
            teTotalRepeatAllowed: {
                validators: {
                    notEmpty: {
                        message: 'This Field is required',
                },
            },
            },
            teMilestone: {
                validators: {
                    notEmpty: {
                        message: 'This Field is required',
                },
            },
            },
            teMilestoneOrder: {
                validators: {
                    notEmpty: {
                        message: 'This Field is required',
                },
            },
            },
            teKanbanOrder: {
                validators: {
                    notEmpty: {
                        message: 'This Field is required',
                },
            },
            },
            teTaskFormURL: {
                validators: {
                    notEmpty: {
                        message: 'URL is required',
                },
            },
            },
            teStartDate: {
                validators: {
                    notEmpty: {
                        message: 'Date is required',
                },
            },
            },
            teDateAdded: {
                validators: {
                    notEmpty: {
                        message: 'Date is required',
                },
            },
            },
            teDueDate: {
                validators: {
                    notEmpty: {
                        message: 'Date is required',
                },
            },
            },
            teAssignedTo: {
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
      };

      let fv;

      /* Search Operations */
      // search based on status
      $('#tableTe_search_status_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Status');
      });

      // search based on type
      $('#tableTe_search_type_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Type');
      });

      $('#tableTe_search_status_2, #tableTe_search_type_2').selectpicker();

      // modal open
      $('#btnOpenTeModal').on('click', async function (e) {
          console.log('openButton is clicked');

          // enabling disabling buttons
          $('#btnAddNewTeFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
          $('#btnSaveTeFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

          FormSubmitButton = document.querySelector('#btnAddNewTeFormSubmitButton');

          $('#modalTe').modal('show');   // open modal

          $('#modalTe').find('.modal-title').text('Add New Entries'); // Setting title for modal

      });

      // modal post closed
      $('#modalTe').on('hidden.bs.modal', function (e) {
          console.log('Modal closed');

          if (fv) {
              // clearing forms
              fv.resetForm();
              fv.destroy();
          }

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message

          // clearing fields
          $("#formTe").trigger('reset'); // clear form fields

          // manually resetting other fields
      });

      // modal post opened
      $('#modalTe').on('shown.bs.modal', function (e) {
          console.log('Modal open');

          // Initializing

        // Date & Time : Date
        $('#teDateFinished').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });
        $('#teRepeatFormDate').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });    
        $('#teRepeatLastDate').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
            });
        $('#teStartDate').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });
        $('#teDateAdded').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });    
        $('#teDueDate').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
            });


        // Dropdown List : Multiple Select1  W Seacrh
        $('teAssignedTo').selectpicker({
        });


        // Repeat Interval
        $('#teRepeatInterval').TouchSpin({
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
        prefix:''
        });

        // Current Repeat Number
        $('#teCurrentRepeatNumber').TouchSpin({
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
        
        // Total Repeat Allowed
        $('#teTotalRepeatAllowed').TouchSpin({
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
        prefix:''
        });
    
        // Milestone Order
        $('#teMilestoneOrder').TouchSpin({
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

        // Kanban Order 
        $('#teKanbanOrder').TouchSpin({
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
      $('#formTe').on('click', '.btnReset', function (e) {
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
          $("#formTe").trigger('reset'); // clear form fields

          // clear manually
          // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
      })

      // form add operation
      $('#formTe').on('click', '.btnAdd', function (e) {
          // console.log('btnCreate is clicked');

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message
          
          FormSubmitButton = document.querySelector('#btnAddNewTeFormSubmitButton');

          // Validation
          fv = FormValidation.formValidation(TeForm, formOptions);

          // validation failed
          fv.on('core.form.invalid', async function () {
              // console.log('Something went wrong!!');    
          });

          // validation successful
          fv.on('core.form.valid', async function () {


              // Show loading state on button
              KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

              teDeadlineNotified.value = (teDeadlineNotified.value == 'on') ? true:false
              teIsRepeat.value = (teIsRepeat.value == 'on') ? true:false
              console.log(teDeadlineNotified.value)
              console.log(teIsRepeat.value)

              // Accessing Restful API
              await axios({
                  method: 'post',
                  url: `${HOST_URL}/api/v1/project/task-entries`,
                  data: { 
                      _projectId: document.querySelector('#teProjectId').value ,
                      name: document.querySelector('#teName').value ,
                      taskType: document.querySelector('#teTaskType').value,
                      description: document.querySelector('#teDescription').value,
                      status: document.querySelector('#teStatus').value,
                      dateFinished:document.querySelector('#teDateFinished').value,
                      isRepeat:document.querySelector('#teIsRepeat').value,
                      repeatFromDate: document.querySelector('#teRepeatFormDate').value,
                      repeatLastDate: document.querySelector('#teRepeatLastDate').value,
                      repeatInterval: document.querySelector('#teRepeatInterval').value,
                      repeatIntervalType: document.querySelector('#teRepeatIntervalType').value,
                      currentRepeatNumber: document.querySelector('#teCurrentRepeatNumber').value,
                      totalRepeatAllowed: document.querySelector('#teTotalRepeatAllowed').value,
                      deadlineNotified: document.querySelector('#teDeadlineNotified').value,
                      milestone: document.querySelector('#teMilestone').value,
                      milestoneOrder: document.querySelector('#teMilestoneOrder').value,
                      kanbanOrder: document.querySelector('#teKanbanOrder').value,
                      taskFormURL: document.querySelector('#teTaskFormURL').value,
                      startDate: document.querySelector('#teStartDate').value,
                      dateadded: document.querySelector('#teDateAdded').value,
                      dueDate: document.querySelector('#teDueDate').value,
                      assignedTo: document.querySelector('#teAssignedTo').value,

                  },
              }).then(function (res) {
              
                  // Return valid JSON
                  // console.log(res);

                  // Release button
                  KTUtil.btnRelease(FormSubmitButton);

                  if (res.data.status == 'success') {
                      // reseting & clearing
                      $('#modalTe').modal('hide')  // hiding modal form
                      toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                      $('#tableTe').KTDatatable().reload(); // reload table
                  }
                  else if (res.data.status == 'error') {
                      $('#modalTe').modal('hide')  // hiding modal form
                      toastr.error(`${res.data.message}`, `${res.data.status}`)
                  }
                  else {
                      $('#modalTe').modal('hide')
                  };
              });
          });
      });

      // form save operation
      $('#formTe').on('click', '.btnSave', function (e) {
          console.log('btnSave is clicked');

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message
          
          FormSubmitButton = document.querySelector('#btnSaveTeFormSubmitButton');

          // Validation
          fv = FormValidation.formValidation(TeForm, formOptions);

          // validation failed
          fv.on('core.form.invalid', async function () {
              // console.log('Something went wrong!!');    
          });

          // validation successful
          fv.on('core.form.valid', async function () {

              const id = document.querySelector('#teId').value;

              // Show loading state on button
              KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

              teDeadlineNotified.value = (teDeadlineNotified.value == 'on') ? true:false
              teIsRepeat.value = (teIsRepeat.value == 'on') ? true:false
              console.log(teDeadlineNotified.value)
              console.log(teIsRepeat.value)

              // Accessing Restful API
              await axios({
                  method: 'patch',
                  url: `${HOST_URL}/api/v1/project/task-entries/${id}`,
                  data: {
                    _projectId: document.querySelector('#teProjectId').value,
                    name: document.querySelector('#teName').value ,
                    taskType: document.querySelector('#teTaskType').value,
                    description: document.querySelector('#teDescription').value,
                    status: document.querySelector('#teStatus').value,
                    dateFinished:document.querySelector('#teDateFinished').value,
                    isRepeat:document.querySelector('#teIsRepeat').value,
                    repeatFromDate: document.querySelector('#teRepeatFormDate').value,
                    repeatLastDate: document.querySelector('#teRepeatLastDate').value,
                    repeatInterval: document.querySelector('#teRepeatInterval').value,
                    repeatIntervalType: document.querySelector('#teRepeatIntervalType').value,
                    currentRepeatNumber: document.querySelector('#teCurrentRepeatNumber').value,
                    totalRepeatAllowed: document.querySelector('#teTotalRepeatAllowed').value,
                    deadlineNotified: document.querySelector('#teDeadlineNotified').value,
                    milestone: document.querySelector('#teMilestone').value,
                    milestoneOrder: document.querySelector('#teMilestoneOrder').value,
                    kanbanOrder: document.querySelector('#teKanbanOrder').value,
                    taskFormURL: document.querySelector('#teTaskFormURL').value,
                    startDate: document.querySelector('#teStartDate').value,
                    dateadded: document.querySelector('#teDateAdded').value,
                    dueDate: document.querySelector('#teDueDate').value,
                    assignedTo: document.querySelector('#teAssignedTo').value,
                  },
              }).then(function (res) {
                  // Return valid JSON
                  // console.log(res);

                  // Release button
                  KTUtil.btnRelease(FormSubmitButton);

                  if (res.data.status == 'success') {
                      // reseting & clearing
                      $('#modalTe').modal('hide')  // hiding modal form
                      toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                      $('#tableTe').KTDatatable().reload(); // reload table

                  }
                  else if (res.data.status == 'error') {
                      $('#modalTe').modal('hide')  // hiding modal form
                      toastr.error(`${res.data.message}`, `${res.data.status}`)
                  }
                  else {
                      $('#modalTe').modal('hide') // hiding modal form
                  };
              });
          });
      });

      // Edit Modal Window - opens modal with appropriate properties
      $('#tableTe').on('click', '.btnEdit', async function (e) {
          // console.log('btnEdit is clicked');

          var id = $(this).attr("aria-label");
          // console.log(id);

          FormSubmitButton = document.querySelector('#btnSaveTeFormSubmitButton');

          // enabling disabling buttons
          $('#btnAddNewTeFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
          $('#btnSaveTeFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

          $('#modalTe').modal('show');   // open modal

          $('#modalTe').find('.modal-title').text('Edit Entry'); // Setting title for modal

          // retrieving data
          await axios({
              method: 'GET',
              url: `${HOST_URL}/api/v1/project/task-entries/${id}`,
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
                  document.querySelector('#teId').value = res.data.taskEntries._id;
                  document.querySelector('#teProjectId').value  = res.data.taskEntries._projectId;
                  document.querySelector('#teName').value  = res.data.taskEntries.name;
                  document.querySelector('#teTaskType').value = res.data.taskEntries.taskType;
                  document.querySelector('#teDescription').value = res.data.taskEntries.description;
                  document.querySelector('#teStatus').value = res.data.taskEntries.status;
                  document.querySelector('#teDateFinished').value = res.data.taskEntries.dateFinished;
                  document.querySelector('#teIsRepeat').value = res.data.taskEntries.isRepeat;
                  document.querySelector('#teRepeatFormDate').value = res.data.taskEntries.repeatFromDate;
                  document.querySelector('#teRepeatLastDate').value = res.data.taskEntries.repeatLastDate;
                  document.querySelector('#teRepeatInterval').value = res.data.taskEntries.repeatInterval;
                  document.querySelector('#teRepeatIntervalType').value = res.data.taskEntries.repeatIntervalType;
                  document.querySelector('#teCurrentRepeatNumber').value = res.data.taskEntries.currentRepeatNumber;
                  document.querySelector('#teTotalRepeatAllowed').value = res.data.taskEntries.totalRepeatAllowed;
                  document.querySelector('#teDeadlineNotified').value = res.data.taskEntries.deadlineNotified;
                  document.querySelector('#teMilestone').value  = res.data.taskEntries.milestone;
                  document.querySelector('#teMilestoneOrder').value = res.data.taskEntries.milestoneOrder;
                  document.querySelector('#teKanbanOrder').value = res.data.taskEntries.kanbanOrder;
                  document.querySelector('#teTaskFormURL').value = res.data.taskEntries.taskFormURL;
              }
              
          });
      });

      // deleteOne operation
      $('#tableTe').on('click', '.btnDelete', function (e) {
          console.log('btnDelete Clicked');
          let ids = $(this).attr("aria-label");

          ids = ids.toString();

          const requests = {
              params: {
                  _id: ids,
              }
          }

          axios.delete(`${HOST_URL}/api/v1/project/task-entries`, requests);

          // reload table
          $('#tableTe').KTDatatable().reload();
          
      });

      // deleteAll mass operation
      datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
          // datatable.checkbox() access to extension methods
          const ids = datatable.checkbox().getSelectedId();
          const count = ids.length;
      
          $('#tableTe_selected_records_2').html(count);

          console.log(count)
      
          if (count > 0) {
              $('#tableTe_group_action_form_2').collapse('show');
          } else {
              $('#tableTe_group_action_form_2').collapse('hide');
          }
      });

      };


    return {
        // public functions
          init: function () {
          _TaskEntries();
          
        },
      };
  })();
  
  jQuery(document).ready(function () {
      TaskEntriesCRUD.init();
  });    