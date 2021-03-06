/* eslint-disable */
'use strict';

/* Class definition */
const FarmRegionsCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    /*   Private functions */
    function _FarmRegions() {
      var dataSet;

      /* Table Options */
      const options = {
          // datasource definition
          data: {
          type: 'remote',
          source: {
              read: {
              method: 'get',
              url: `${HOST_URL}/api/v1/farm/regions/table`,
              params: {
                fields: '_id,_zoneId,_farmId,consultant,createdAt,updatedAt',
            },
              map: function(raw) {
                  // sample data mapping
                  // console.log('raw', raw);
                  dataSet = raw;

                  if (typeof raw.farmRegions !== 'undefined') {
                  dataSet = raw.farmRegions;
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
          input: $('#tableFr_search_query_2'),
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
            field: '_farmId',
            title: 'Farm ID',
            template: function (row) {
              return '\
                <div>\
                <a href="#">' + row._farmId + '</a></div>\
              ';
            }
          },
          {
            field: '_zoneId',
            title: 'Zone ID',
          },
          {
            field: 'consultant',
            title: 'Consultants',
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
      const datatable = $('#tableFr').KTDatatable(options);

      /* Form */
      const FrForm = document.querySelector('#formFr');
      let FormSubmitButton = document.querySelector('#btnAddNewFrFormSubmitButton');
      // Options
      let formOptions = {
          fields: {
          
            frFarmId: {
                validators: {
                notEmpty: {
                    message: 'Farm ID is required',
                },
                },
            },  
                frZoneId: {
                validators: {
                    notEmpty: {
                    message: 'Zone ID is required',
                    },
                },
                },
                frConsultant: {
                validators: {
                    notEmpty: {
                    message: 'Consultant is required',
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
      $('#tableFr_search_status_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Status');
      });

      // search based on type
      $('#tableFr_search_type_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Type');
      });

      $('#tableFr_search_status_2, #tableFr_search_type_2').selectpicker();

      // modal open
      $('#btnOpenFrModal').on('click', async function (e) {
          console.log('openButton is clicked');

          // enabling disabling buttons
          $('#btnAddNewFrFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
          $('#btnSaveFrFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

          FormSubmitButton = document.querySelector('#btnAddNewFrFormSubmitButton');

          $('#modalFr').modal('show');   // open modal

          $('#modalFr').find('.modal-title').text('Add New Entries'); // Setting title for modal

      });

      // modal post closed
      $('#modalFr').on('hidden.bs.modal', function (e) {
          console.log('Modal closed');

          if (fv) {
              // clearing forms
              fv.resetForm();
              fv.destroy();
          }

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message

          // clearing fields
          $("#formFr").trigger('reset'); // clear form fields

          // manually resetting other fields
      });

      // modal post opened
      $('#modalFr').on('shown.bs.modal', function (e) {
          console.log('Modal open');

          // Initializing


      });

      // form reset operation
      $('#formFr').on('click', '.btnReset', function (e) {
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
          $("#formFr").trigger('reset'); // clear form fields

          // clear manually
          // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
      })

      // form add operation
      $('#formFr').on('click', '.btnAdd', function (e) {
          // console.log('btnCreate is clicked');

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message
          
          FormSubmitButton = document.querySelector('#btnAddNewFrFormSubmitButton');

          // Validation
          fv = FormValidation.formValidation(FrForm, formOptions);

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
                  url: `${HOST_URL}/api/v1/farm/regions`,
                  data: { 
                    _farmId: document.querySelector('#frFarmId').value ,
                    _zoneId: document.querySelector('#frZoneId').value ,
                    consultant: document.querySelector('#frConsultant').value ,
                  },
              }).then(function (res) {
              
                  // Return valid JSON
                  // console.log(res);

                  // Release button
                  KTUtil.btnRelease(FormSubmitButton);

                  if (res.data.status == 'success') {
                      // reseting & clearing
                      $('#modalFr').modal('hide')  // hiding modal form
                      toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                      $('#tableFr').KTDatatable().reload(); // reload table
                  }
                  else if (res.data.status == 'error') {
                      $('#modalFr').modal('hide')  // hiding modal form
                      toastr.error(`${res.data.message}`, `${res.data.status}`)
                  }
                  else {
                      $('#modalFr').modal('hide')
                  };
              });
          });
      });

      // form save operation
      $('#formFr').on('click', '.btnSave', function (e) {
          console.log('btnSave is clicked');

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message
          
          FormSubmitButton = document.querySelector('#btnSaveFrFormSubmitButton');

          // Validation
          fv = FormValidation.formValidation(FrForm, formOptions);

          // validation failed
          fv.on('core.form.invalid', async function () {
              // console.log('Something went wrong!!');    
          });

          // validation successful
          fv.on('core.form.valid', async function () {

              const id = document.querySelector('#frId').value;

              // Show loading state on button
              KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

              // Accessing Restful API
              await axios({
                  method: 'patch',
                  url: `${HOST_URL}/api/v1/farm/regions/${id}`,
                  data: {
                    _farmId: document.querySelector('#frFarmId').value ,
                    _zoneId: document.querySelector('#frZoneId').value ,
                    consultant: document.querySelector('#frConsultant').value ,
                  },
              }).then(function (res) {
                  // Return valid JSON
                  // console.log(res);

                  // Release button
                  KTUtil.btnRelease(FormSubmitButton);

                  if (res.data.status == 'success') {
                      // reseting & clearing
                      $('#modalFr').modal('hide')  // hiding modal form
                      toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                      $('#tableFr').KTDatatable().reload(); // reload table

                  }
                  else if (res.data.status == 'error') {
                      $('#modalFr').modal('hide')  // hiding modal form
                      toastr.error(`${res.data.message}`, `${res.data.status}`)
                  }
                  else {
                      $('#modalFr').modal('hide') // hiding modal form
                  };
              });
          });
      });

      // Edit Modal Window - opens modal with appropriate properties
      $('#tableFr').on('click', '.btnEdit', async function (e) {
          // console.log('btnEdit is clicked');

          var id = $(this).attr("aria-label");
          // console.log(id);

          FormSubmitButton = document.querySelector('#btnSaveFrFormSubmitButton');

          // enabling disabling buttons
          $('#btnAddNewFrFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
          $('#btnSaveFrFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

          $('#modalFr').modal('show');   // open modal

          $('#modalFr').find('.modal-title').text('Edit Entry'); // Setting title for modal

          // retrieving data
          await axios({
              method: 'GET',
              url: `${HOST_URL}/api/v1/farm/regions/${id}`,
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
                  document.querySelector('#frId').value = res.data.farmRegions._id;
                  document.querySelector('#frFarmId').value  = res.data.farmRegions._farmId;
                  document.querySelector('#frZoneId').value  = res.data.farmRegions._zoneId;
                  document.querySelector('#frConsultant').value = res.data.farmRegions.consultant;
              }
              
          });
      });

      // deleteOne operation
      $('#tableFr').on('click', '.btnDelete', function (e) {
          console.log('btnDelete Clicked');
          let ids = $(this).attr("aria-label");

          ids = ids.toString();

          const requests = {
              params: {
                  _id: ids,
              }
          }

          axios.delete(`${HOST_URL}/api/v1/farm/regions`, requests);

          // reload table
          $('#tableFr').KTDatatable().reload();
          
      });

      // deleteAll mass operation
      datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
          // datatable.checkbox() access to extension methods
          const ids = datatable.checkbox().getSelectedId();
          const count = ids.length;
      
          $('#tableFr_selected_records_2').html(count);

          console.log(count)
      
          if (count > 0) {
              $('#tableFr_group_action_form_2').collapse('show');
          } else {
              $('#tableFr_group_action_form_2').collapse('hide');
          }
      });

      };


    return {
        // public functions
          init: function () {
          _FarmRegions();
          
        },
      };
  })();
  
  jQuery(document).ready(function () {
      FarmRegionsCRUD.init();
  });    