/* eslint-disable */
'use strict';

/* Class definition */
const FarmExportedStrategyCRUD = (function () {
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
    function _FarmExportedStrategy() {
      var dataSet;

      /* Table Options */
      const options = {
          // datasource definition
          data: {
          type: 'remote',
          source: {
              read: {
              method: 'get',
              url: `${HOST_URL}/api/v1/farm/exported-strategy/table`,
              params: {
                fields: '_id,name,description,_zoneId,_cropId,_farmId,expectedYield,expectedYieldUnit,actualYield,actualYieldUnit,start,expectedEnd,stages,shareable,shareableType,_contractTemplateId,rate,totalExpense,authorNotes,_parentId,createdAt,updatedAt',
                },
              map: function(raw) {
                  // sample data mapping
                  // console.log('raw', raw);
                  dataSet = raw;

                  if (typeof raw.farmExportedStrategy !== 'undefined') {
                  dataSet = raw.farmExportedStrategy;
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
          input: $('#tableFes_search_query_2'),
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
            field: 'description',
            title: 'Description',
          },
          {
            field: '_zoneId',
            title: 'ZOne ID',
          },
          {
            field: '_cropId',
            title: 'Crop ID',
          },
          {
            field: '_farmId',
            title: 'Farm ID',
          },
          {
            field: 'expectedYield',
            title: 'Expected Yield',
          },
          {
            field: 'expectedYieldUnit',
            title: 'Expected Yield Unit',
          },
          {
            field: 'actualYield',
            title: 'Actual Yield',
          },
          {
            field: 'actualYieldUnit',
            title: 'ActualYieldUnit',
          },
          {
            field: 'start',
            title: 'Start',
          },
          {
            field: 'expectedEnd',
            title: 'Expected End',
          },
          {
            field: 'stages',
            title: 'Stages',
          },
          {
            field: 'shareable',
            title: 'Shareable',
          },
          {
            field: 'shareableType',
            title: 'Shareable Type',
          },
          {
            field: '_contractTemplateId',
            title: 'Contract Template ID',
          },
          {
            field: 'rate',
            title: 'Rate',
          },
          {
            field: 'totalExpense',
            title: 'Total Expense',
          },
          {
            field: 'authorNotes',
            title: 'Author Notes',
          },
          {
            field: '_parentId',
            title: 'Parent ID',
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
      const datatable = $('#tableFes').KTDatatable(options);

      /* Form */
      const FesForm = document.querySelector('#formFes');
      let FormSubmitButton = document.querySelector('#btnAddNewFesFormSubmitButton');
      // Options
      let formOptions = {
          fields: {
          
            fesName: {
                validators: {
                notEmpty: {
                    message: 'Name is required',
                },
            },
            },  
            fesDescription : {
                validators: {
                notEmpty: {
                    message: 'Description is required',
                },
                },
            },       
            fesZoneId: {
            validators: {
                notEmpty: {
                message: 'Zone ID is required',
                },
            },
            },
            fesCropId: {
            validators: {
                notEmpty: {
                message: 'Crop ID is required',
                },
            },
            },  
            fesFarmId: {
            validators: {
                notEmpty: {
                message: 'Farm ID is required',
                },
            },
            },        
            fesExpectedYield: {
            validators: {
                notEmpty: {
                message: 'Expected Yield is required',
                },
            },
            },
            fesExpectedYieldUnit: {
            validators: {
                notEmpty: {
                message: 'Expected Yield Unit is required',
                },
            },
            },                         
            fesActualYield: {
            validators: {
                notEmpty: {
                message: 'Actual Yield is required',
                },
            },
            },
            fesActualYieldUnit: {
            validators: {
                notEmpty: {
                message: 'Actual Yield Unit is required',
                },
            },
            },  
            fesStart: {
            validators: {
                notEmpty: {
                message: 'Date is required',
                },
            },
            },        
            fesExpectedEnd: {
            validators: {
                notEmpty: {
                message: 'Date is required',
                },
            },
            },
            fesStages: {
            validators: {
                notEmpty: {
                message: 'Stage is required',
                },
            },
            },                         
            fesShareable: {
            validators: {
                notEmpty: {
                message: 'This is required',
                },
            },
            },
            fesRate: {
            validators: {
                notEmpty: {
                message: 'Rate is required',
                },
            },
            },                
            fesShareableType: {
            validators: {
                notEmpty: {
                message: 'Type is required',
                },
            },
            },  
            fesContractTemplateId: {
            validators: {
                notEmpty: {
                message: 'Contract ID is required',
                },
            },
            },        
            fesAuthorNotes: {
            validators: {
                notEmpty: {
                message: 'Notes are required',
                },
            },
            },
            fesTotalExpense: {
            validators: {
                notEmpty: {
                message: 'Expenses are required',
                },
            },
            },
            fesParentId: {
            validators: {
                notEmpty: {
                message: 'Parent ID required',
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
      $('#tableFes_search_status_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Status');
      });

      // search based on type
      $('#tableFes_search_type_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Type');
      });

      $('#tableFes_search_status_2, #tableFes_search_type_2').selectpicker();

      // modal open
      $('#btnOpenFesModal').on('click', async function (e) {
          console.log('openButton is clicked');

          // enabling disabling buttons
          $('#btnAddNewFesFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
          $('#btnSaveFesFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

          FormSubmitButton = document.querySelector('#btnAddNewFesFormSubmitButton');

          $('#modalFes').modal('show');   // open modal

          $('#modalFes').find('.modal-title').text('Add New Entries'); // Setting title for modal

      });

      // modal post closed
      $('#modalFes').on('hidden.bs.modal', function (e) {
          console.log('Modal closed');

          if (fv) {
              // clearing forms
              fv.resetForm();
              fv.destroy();
          }

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message

          // clearing fields
          $("#formFes").trigger('reset'); // clear form fields

          // manually resetting other fields
          $('#fesStages').empty().trigger('change');  
      });

      // modal post opened
      $('#modalFes').on('shown.bs.modal', function (e) {
          console.log('Modal open');

          // Initializing
        
          // Date & Time : Date
        $('#fesStart').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        }); 
        $('#fesExpectedEnd').datepicker({
        rtl: KTUtil.isRTL(),
        todayBtn: 'linked',
        clearBtn: true,
        todayHighlight: true,
        orientation: 'bottom left',
        templates: arrows,
        });      

        // EXPECTED YIELD
        $('#fesExpectedYield').TouchSpin({
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
        // ACTUAL YIELD
        $('#fesActualYield').TouchSpin({
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
        
        //  TOTAL EXPENSES
        $('#fesTotalExpense').TouchSpin({
        buttondown_class: 'btn btn-secondary',
        buttonup_class: 'btn btn-secondary',
        verticalbuttons: true,
        verticalup: '<i class="ki ki-plus"></i>',
        verticaldown: '<i class="ki ki-minus"></i>',

        min: 0,
        max: 10000,
        step: 10,
        decimals: 2,
        boostat: 5,
        maxboostedstep: 10,
        prefix: '$'
        });
        // Dropdown List : Multiple Select
        
        $('fesStages').selectpicker({
        });
 


      });

      // form reset operation
      $('#formFes').on('click', '.btnReset', function (e) {
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
          $("#formFes").trigger('reset'); // clear form fields

          // clear manually
          // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
      })

      // form add operation
      $('#formFes').on('click', '.btnAdd', function (e) {
          // console.log('btnCreate is clicked');

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message
          
          FormSubmitButton = document.querySelector('#btnAddNewFesFormSubmitButton');

          // Validation
          fv = FormValidation.formValidation(FesForm, formOptions);

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
                  url: `${HOST_URL}/api/v1/farm/exported-strategy/`,
                  data: { 
                    name: document.querySelector('#fesName').value ,
                    description: document.querySelector('#fesDescription').value ,
                    _zoneId: document.querySelector('#fesZoneId').value,
                    _cropId: document.querySelector('#fesCropId').value,
                    _farmId: document.querySelector('#fesFarmId').value,
                    expectedYield:document.querySelector('#fesExpectedYield').value * 1,
                    expectedYieldUnit:document.querySelector('#fesExpectedYieldUnit').value,
                    actualYield: document.querySelector('#fesActualYield').value * 1,
                    actualYieldUnit: document.querySelector('#fesActualYieldUnit').value,
                    //start: document.querySelector('#fesStart').value,
                    //expectedEnd: document.querySelector('#fesExpectedEnd').value,
                    stages: document.querySelector('#fesStages').value,
                    //shareable: document.querySelector('#fesShareable').value,
                    shareableType: document.querySelector('#fesShareableType').value,
                    _contractTemplateId: document.querySelector('#fesContractTemplateId').value,
                    rate: document.querySelector('#fesRate').value,
                    totalExpense: document.querySelector('#fesTotalExpense').value * 1,
                    authorNotes: document.querySelector('#fesAuthorNotes').value,
                    _parentId: document.querySelector('#fesParentId').value,

                },
              }).then(function (res) {
              
                  // Return valid JSON
                  // console.log(res);

                  // Release button
                  KTUtil.btnRelease(FormSubmitButton);

                  if (res.data.status == 'success') {
                      // reseting & clearing
                      $('#modalFes').modal('hide')  // hiding modal form
                      toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                      $('#tableFes').KTDatatable().reload(); // reload table
                  }
                  else if (res.data.status == 'error') {
                      $('#modalFes').modal('hide')  // hiding modal form
                      toastr.error(`${res.data.message}`, `${res.data.status}`)
                  }
                  else {
                      $('#modalFes').modal('hide')
                  };
              });
          });
      });

      // form save operation
      $('#formFes').on('click', '.btnSave', function (e) {
          console.log('btnSave is clicked');

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message
          
          FormSubmitButton = document.querySelector('#btnSaveFesFormSubmitButton');

          // Validation
          fv = FormValidation.formValidation(FesForm, formOptions);

          // validation failed
          fv.on('core.form.invalid', async function () {
              // console.log('Something went wrong!!');    
          });

          // validation successful
          fv.on('core.form.valid', async function () {

              const id = document.querySelector('#fesId').value;

              // Show loading state on button
              KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

              // Accessing Restful API
              await axios({
                  method: 'patch',
                  url: `${HOST_URL}/api/v1/farm/exported-strategy/${id}`,
                  data: {
                    name: document.querySelector('#fesName').value ,
                    description: document.querySelector('#fesDescription').value ,
                    _zoneId: document.querySelector('#fesZoneId').value,
                    _cropId: document.querySelector('#fesCropId').value,
                    _farmId: document.querySelector('#fesFarmId').value,
                    expectedYield:document.querySelector('#fesExpectedYield').value * 1,
                    expectedYieldUnit:document.querySelector('#fesExpectedYieldUnit').value,
                    actualYield: document.querySelector('#fesActualYield').value * 1,
                    actualYieldUnit: document.querySelector('#fesActualYieldUnit').value,
                    start: document.querySelector('#fesStart').value,
                    expectedEnd: document.querySelector('#fesExpectedEnd').value,
                    stages: document.querySelector('#fesStages').value,
                    shareable: document.querySelector('#fesShareable').value,
                    shareableType: document.querySelector('#fesShareableType').value,
                    _contractTemplateId: document.querySelector('#fesContractTemplateId').value,
                    rate: document.querySelector('#fesRate').value,
                    totalExpense: document.querySelector('#fesTotalExpense').value * 1,
                    authorNotes: document.querySelector('#fesAuthorNotes').value,
                    _parentId: document.querySelector('#fesParentId').value,
                  },
              }).then(function (res) {
                  // Return valid JSON
                  // console.log(res);

                  // Release button
                  KTUtil.btnRelease(FormSubmitButton);

                  if (res.data.status == 'success') {
                      // reseting & clearing
                      $('#modalFes').modal('hide')  // hiding modal form
                      toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                      $('#tableFes').KTDatatable().reload(); // reload table

                  }
                  else if (res.data.status == 'error') {
                      $('#modalFes').modal('hide')  // hiding modal form
                      toastr.error(`${res.data.message}`, `${res.data.status}`)
                  }
                  else {
                      $('#modalFes').modal('hide') // hiding modal form
                  };
              });
          });
      });

      // Edit Modal Window - opens modal with appropriate properties
      $('#tableFes').on('click', '.btnEdit', async function (e) {
          // console.log('btnEdit is clicked');

          var id = $(this).attr("aria-label");
          // console.log(id);

          FormSubmitButton = document.querySelector('#btnSaveFesFormSubmitButton');

          // enabling disabling buttons
          $('#btnAddNewFesFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
          $('#btnSaveFesFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

          $('#modalFes').modal('show');   // open modal

          $('#modalFes').find('.modal-title').text('Edit Entry'); // Setting title for modal

          // retrieving data
          await axios({
              method: 'GET',
              url: `${HOST_URL}/api/v1/farm/exported-strategy/${id}`,
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
                  document.querySelector('#fesId').value = res.data.farmExportedStrategy._id;
                  document.querySelector('#fesName').value  = res.data.farmExportedStrategy.name;
                  document.querySelector('#fesDescription').value  = res.data.farmExportedStrategy.description;
                  document.querySelector('#fesZoneId').value = res.data.farmExportedStrategy._zoneId;
                  document.querySelector('#fesCropId').value = res.data.farmExportedStrategy._cropId;
                  document.querySelector('#fesFarmId').value = res.data.farmExportedStrategy._farmId;
                  document.querySelector('#fesExpectedYield').value = res.data.farmExportedStrategy.expectedYield;
                  document.querySelector('#fesExpectedYieldUnit').value = res.data.farmExportedStrategy.expectedYieldUnit;
                  document.querySelector('#fesActualYield').value = res.data.farmExportedStrategy.actualYield;
                  document.querySelector('#fesActualYieldUnit').value = res.data.farmExportedStrategy.actualYieldUnit;
                  document.querySelector('#fesStart').value = res.data.farmExportedStrategy.start;
                  document.querySelector('#fesExpectedEnd').value = res.data.farmExportedStrategy.expectedEnd;
                  document.querySelector('#fesStages').value = res.data.farmExportedStrategy.stages;
                  document.querySelector('#fesShareable').value = res.data.farmExportedStrategy.shareable;
                  document.querySelector('#fesShareableType').value = res.data.farmExportedStrategy.shareableType;
                  document.querySelector('#fesContractTemplateId').value  = res.data.farmExportedStrategy._contractTemplateId;
                  document.querySelector('#fesRate').value = res.data.farmExportedStrategy.rate;
                  document.querySelector('#fesTotalExpense').value = res.data.farmExportedStrategy.totalExpense;
                  document.querySelector('#fesAuthorNotes').value = res.data.farmExportedStrategy.authorNotes;
                  document.querySelector('#fesParentId').value = res.data.farmExportedStrategy._parentId;
              }
              
          });
      });

      // deleteOne operation
      $('#tableFes').on('click', '.btnDelete', function (e) {
          console.log('btnDelete Clicked');
          let ids = $(this).attr("aria-label");

          ids = ids.toString();

          const requests = {
              params: {
                  _id: ids,
              }
          }

          axios.delete(`${HOST_URL}/api/v1/farm/exported-strategy`, requests);

          // reload table
          $('#tableFes').KTDatatable().reload();
          
      });

      // deleteAll mass operation
      datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
          // datatable.checkbox() access to extension methods
          const ids = datatable.checkbox().getSelectedId();
          const count = ids.length;
      
          $('#tableFes_selected_records_2').html(count);

          console.log(count)
      
          if (count > 0) {
              $('#tableFes_group_action_form_2').collapse('show');
          } else {
              $('#tableFes_group_action_form_2').collapse('hide');
          }
      });

      };


    return {
        // public functions
          init: function () {
          _FarmExportedStrategy();
          
        },
      };
  })();
  
  jQuery(document).ready(function () {
      FarmExportedStrategyCRUD.init();
  });    