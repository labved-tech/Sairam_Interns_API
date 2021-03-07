/* eslint-disable */
'use strict';

/* Class definition */
const ProjectCRUD = (function () {
  const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

  /*   Private functions */
  function _ProjectTaskStatus() {
    var dataSet;

    /* Table Options */
    const options = {
      // datasource definition
      data: {
        type: 'remote',
        source: {
          read: {
            method: 'get',
            url: `${HOST_URL}/api/v1/project/task-status/table`,
            params: {
              fields: '_id,status,deadlineNotified,kanbanOrder,milestoneOrder,_taskId,_projectId,_userId,progress,createdBy,createdAt,updatedAt,updatedBy',
            },
            map: function (raw) {
              // sample data mapping
              // console.log('raw', raw);
              dataSet = raw;

              if (typeof raw.projectTaskStatus !== 'undefined') {
                dataSet = raw.projectTaskStatus;
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
        input: $('#tableTs_search_query_2'),
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
                              <a href="javascript:;" id="btnEdit" class="btn btn-sm btn-clean btn-icon btnEdit" title="Edit details" data-filed="_id" aria-label="'+ row._id + '">\
                              <i class="far fa-edit">\
                              </i>\
                              </a>\
                              <a href="javascript:;" id="btnDelete" class="btn btn-sm btn-clean btn-icon btnDelete" title="Delete" data-filed="_id" aria-label="'+ row._id + '">\
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
    const datatable = $('#tableTs').KTDatatable(options);

    /* Form */
    const TsForm = document.querySelector('#formTs');
    let FormSubmitButton = document.querySelector('#btnAddNewTsFormSubmitButton');
    // Options
    let formOptions = {
      fields: {
        ptsStatus: {
          validators: {
            notEmpty: {
              message: 'Status is required',
            },
          },
        },
        ptsDeadlineNotified: {
          validators: {
            notEmpty: {
              message: 'This field is required',
            },
          },
        },
        ptsKanbanOrder: {
          validators: {
            notEmpty: {
              message: 'This field is required',
            },
          },
        },
        ptsMilestoneOrder: {
          validators: {
            notEmpty: {
              message: 'This field is required',
            },
          },
        },
        ptstaskID: {
          validators: {
            notEmpty: {
              message: 'This field is required',
            },
          },
        },
        ptsProjectID: {
            validators: {
              notEmpty: {
                message: 'This field is required',
              },
            },
          },
          ptsUserID: {
            validators: {
              notEmpty: {
                message: 'This field is required',
              },
            },
          },
          ptsProgress: {
            validators: {
              notEmpty: {
                message: 'This field is required',
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
    $('#tableTs_search_status_2').on('change', function () {
      datatable.search($(this).val().toLowerCase(), 'Status');
    });

    // search based on type
    $('#tableTs_search_type_2').on('change', function () {
      datatable.search($(this).val().toLowerCase(), 'Type');
    });

    $('#tableTs_search_status_2, #tableTs_search_type_2').selectpicker();

    // modal open
    $('#btnOpenTsModal').on('click', async function (e) {
      console.log('openButton is clicked');

      // enabling disabling buttons
      $('#btnAddNewTsFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
      $('#btnSaveTsFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

      FormSubmitButton = document.querySelector('#btnAddNewTsFormSubmitButton');

      $('#modalTs').modal('show');   // open modal

      $('#modalTs').find('.modal-title').text('Add New Entries'); // Setting title for modal

    });

    // modal post closed
    $('#modalTs').on('hidden.bs.modal', function (e) {
      console.log('Modal closed');

      if (fv) {
        // clearing forms
        fv.resetForm();
        fv.destroy();
      }

      // clearing validator messages
      $('.fv-plugins-message-container').text(''); // remove message

      // clearing fields
      $("#formTs").trigger('reset'); // clear form fields

      // manually resetting other fields
      $('#TsExpires').empty().trigger('change');  // clearing select2  */

    });

    // modal post opened
    $('#modalTs').on('shown.bs.modal', function (e) {
      console.log('Modal open');

      // Initializing
      $('#TsMessage').summernote({
        height: 400,
        tabsize: 2,
      });

      $('#TsExpires').select2({
        placeholder: "Select expiry"
      });

    });

    // form reset operation
    $('#formTs').on('click', '.btnReset', function (e) {
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
      $("#formTs").trigger('reset'); // clear form fields

      // clear manually
      // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
    })

    // form add operation
    $('#formTs').on('click', '.btnAdd', function (e) {
      // console.log('btnCreate is clicked');

      // clearing validator messages
      $('.fv-plugins-message-container').text(''); // remove message

      FormSubmitButton = document.querySelector('#btnAddNewTsFormSubmitButton');

      // Validation
      fv = FormValidation.formValidation(TsForm, formOptions);

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
          url: `${HOST_URL}/api/v1/project/status`,
          data: {
                    // _projectId: pdID.value,
                    status: ptsStatus.value,
                    deadlineNotified: true,
                    kanbanOrder: (ptsKanbanOrder.value)*1,
                    milestoneOrder: (ptsMilestoneOrder.value)*1,
                    // _taskId: ptstaskID.value,
                    // _projectId: ptsProjectID.value, 
                    // _userId: ptsUserID.value,
                    progress: (ptsProgress.value)*1,        

          },
        }).then(function (res) {

          // Return valid JSON
          // console.log(res);

          // Release button
          KTUtil.btnRelease(FormSubmitButton);

          if (res.data.status == 'success') {
            // reseting & clearing
            $('#modalTs').modal('hide')  // hiding modal form
            toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
            $('#tableTs').KTDatatable().reload(); // reload table
          }
          else if (res.data.status == 'error') {
            $('#modalTs').modal('hide')  // hiding modal form
            toastr.error(`${res.data.message}`, `${res.data.status}`)
          }
          else {
            $('#modalTs').modal('hide')
          };
        });
      });
    });

    // form save operation
    $('#formTs').on('click', '.btnSave', function (e) {
      console.log('btnSave is clicked');

      // clearing validator messages
      $('.fv-plugins-message-container').text(''); // remove message

      FormSubmitButton = document.querySelector('#btnSaveTsFormSubmitButton');

      // Validation
      fv = FormValidation.formValidation(TsForm, formOptions);

      // validation failed
      fv.on('core.form.invalid', async function () {
        // console.log('Something went wrong!!');    
      });

      // validation successful
      fv.on('core.form.valid', async function () {

        const id = document.querySelector('#TsId').value;

        // Show loading state on button
        KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

        // Accessing Restful API
        await axios({
          method: 'patch',
          url: `${HOST_URL}/api/v1/project/status/${id}`,
          data: {
                                // _projectId: pdID.value,
                                status: ptsStatus.value,
                                deadlineNotified: true,
                                kanbanOrder: (ptsKanbanOrder.value)*1,
                                milestoneOrder: (ptsMilestoneOrder.value)*1,
                                // _taskId: ptstaskID.value,
                                // _projectId: ptsProjectID.value, 
                                // _userId: ptsUserID.value,
                                progress: (ptsProgress.value)*1,        
            
          },
        }).then(function (res) {
          // Return valid JSON
          // console.log(res);

          // Release button
          KTUtil.btnRelease(FormSubmitButton);

          if (res.data.status == 'success') {
            // reseting & clearing
            $('#modalTs').modal('hide')  // hiding modal form
            toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
            $('#tableTs').KTDatatable().reload(); // reload table

          }
          else if (res.data.status == 'error') {
            $('#modalTs').modal('hide')  // hiding modal form
            toastr.error(`${res.data.message}`, `${res.data.status}`)
          }
          else {
            $('#modalTs').modal('hide') // hiding modal form
          };
        });
      });
    });

    // Edit Modal Window - opens modal with appropriate properties
    $('#tableTs').on('click', '.btnEdit', async function (e) {
      // console.log('btnEdit is clicked');

      var id = $(this).attr("aria-label");
      // console.log(id);

      FormSubmitButton = document.querySelector('#btnSaveTsFormSubmitButton');

      // enabling disabling buttons
      $('#btnAddNewTsFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
      $('#btnSaveTsFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

      $('#modalTs').modal('show');   // open modal

      $('#modalTs').find('.modal-title').text('Edit Entry'); // Setting title for modal

      // retrieving data
      await axios({
        method: 'GET',
        url: `${HOST_URL}/api/v1/project/status/${id}`,
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
          document.querySelector('#tsId').value = res.data.projectTaskStatus._id;
          document.querySelector('#ptsStatus').value = res.data.projectTaskStatus.status;
          document.querySelector('#ptsDeadlineNotified').value = res.data.projectTaskStatus.deadlineNotified;
          document.querySelector('#ptsKanbanOrder').value = res.data.projectTaskStatus.kanbanOrder;
          document.querySelector('#ptsMilestoneOrder').value = res.data.projectTaskStatus.milestoneOrder;
          document.querySelector('#ptsProgress').value = res.data.projectTaskStatus.progress;
        }
      });
    });

    // deleteOne operation
    $('#tableTs').on('click', '.btnDelete', function (e) {
      console.log('btnDelete Clicked');
      let ids = $(this).attr("aria-label");

      ids = ids.toString();

      const requests = {
        params: {
          _id: ids,
        }
      }

      axios.delete(`${HOST_URL}/api/v1/project/status`, requests);

      // reload table
      $('#tableTs').KTDatatable().reload();

    });

    // deleteAll mass operation
    datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
      // datatable.checkbox() access to extension methods
      const ids = datatable.checkbox().getSelectedId();
      const count = ids.length;

      $('#tableTs_selected_records_2').html(count);

      console.log(count)

      if (count > 0) {
        $('#tableTs_group_action_form_2').collapse('show');
      } else {
        $('#tableTs_group_action_form_2').collapse('hide');
      }
    });

  };
  return {
    // public functions
    init: function () {
        _ProjectTaskStatus();
    },
  };
})();

jQuery(document).ready(function () {
  ProjectCRUD.init();
});