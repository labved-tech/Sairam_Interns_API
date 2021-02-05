/* eslint-disable */
'use strict';

/* Class definition */
const SalesFinanceCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    /*   Private functions */
    function _Address() {
      var dataSet;
  
      /* Table Options */
      const options = {
        // datasource definition
        data: {
          type: 'remote',
          source: {
            read: {
              method: 'get',
              url: `${HOST_URL}/api/v1/sales-finance/address/table`,
              params: {
                fields: '_id, address, city, state, country, status,pinCode, createdBy,createdAt,updatedAt',
              },
              map: function(raw) {
                // sample data mapping
                // console.log('raw', raw);
                dataSet = raw;
            
                if (typeof raw.address !== 'undefined') {
                  dataSet = raw.address;
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
          input: $('#tableA_search_query_2'),
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
              field: 'address',
              title: 'Address',
            },
            {
              field: 'city',
              title: 'City',
            },
            {
              field: 'state',
              title: 'State',
            },
            {
              field: 'country',
              title: 'Country ',
            },
            {
              field: 'pinCode',
              title: 'Pin Code',
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
      const datatable = $('#tableA').KTDatatable(options);
  
      /* Form */
      const AForm = document.querySelector('#formA');
      let FormSubmitButton = document.querySelector('#btnAddNewAFormSubmitButton');
      // Options
      let formOptions =    {
        fields: {
            adAddress: {
                validators: {
                    notEmpty: {
                        message: 'Address is required',
                    },
                },
            },
            adCity: {
                validators: {
                    notEmpty: {
                        message: 'City is required',
                    },
                },
            },
            adState: {
                validators: {
                    notEmpty: {
                        message: 'State Email is required',
                    },
                },
            },
            adCountry: {
                validators: {
                    notEmpty: {
                        message: 'Country Email is required',
                    },
                },
            },
            adPincode: {
                validators: {
                    notEmpty: {
                        message: 'PinCode Email is required',
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
      let fv;
  
      /* Search Operations */
      // search based on status
      $('#tableA_search_status_2').on('change', function () {
        datatable.search($(this).val().toLowerCase(), 'Status');
      });
  
      // search based on type
      $('#tableA_search_type_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Type');
      });
  
      $('#tableA_search_status_2, #tableA_search_type_2').selectpicker();
        
      // modal open
      $('#btnOpenAModal').on('click', async function (e) {
        console.log('openButton is clicked');
  
        // enabling disabling buttons
        $('#btnAddNewAFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
        $('#btnSaveAFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button
  
        FormSubmitButton = document.querySelector('#btnAddNewAFormSubmitButton');
  
        $('#modalA').modal('show');   // open modal
  
        $('#modalA').find('.modal-title').text('Add New Entries'); // Setting title for modal
  
      });
  
      // modal post closed
      $('#modalA').on('hidden.bs.modal', function (e) {
        console.log('Modal closed');
  
       if (fv) {
           // clearing forms
           fv.resetForm();
           fv.destroy();
         }
  
         // clearing validator messages
         $('.fv-plugins-message-container').text(''); // remove message
  
         // clearing fields
         $("#formA").trigger('reset'); // clear form fields
  
         // manually resetting other fields
  
     });
  
     // modal post opened
     $('#modalA').on('shown.bs.modal', function (e) {
        console.log('Modal open');
  
        // Initializing
  
     });

      // form save operation
      $('#formA').on('click', '.btnSave', function (e) {
        console.log('btnSave is clicked');

        // clearing validator messages
        $('.fv-plugins-message-container').text(''); // remove message
        
        FormSubmitButton = document.querySelector('#btnSaveAFormSubmitButton');

        // Validation
        fv = FormValidation.formValidation(AForm, formOptions);

        // validation failed
        fv.on('core.form.invalid', async function () {
            // console.log('Something went wrong!!');    
        });

        // validation successful
        fv.on('core.form.valid', async function () {

            const id = document.querySelector('#adId').value;

            // Show loading state on button
            KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

            // Accessing Restful API
            await axios({
                method: 'patch',
                url: `${HOST_URL}/api/v1/sales-finance/address/${id}`,
                data: {
                  address: document.querySelector('#adAddress').value,
                  city: document.querySelector('#adCity').value,
                  state: document.querySelector('#adState').value ,
                  country: document.querySelector('#adCountry').value ,
                  pinCode: document.querySelector('#adPincode').value
                },
            }).then(function (res) {
                // Return valid JSON
                // console.log(res);

                // Release button
                KTUtil.btnRelease(FormSubmitButton);

                if (res.data.status == 'success') {
                    // reseting & clearing
                    $('#modalA').modal('hide')  // hiding modal form
                    toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                    $('#tableA').KTDatatable().reload(); // reload table

                }
                else if (res.data.status == 'error') {
                    $('#modalA').modal('hide')  // hiding modal form
                    toastr.error(`${res.data.message}`, `${res.data.status}`)
                }
                else {
                    $('#modalA').modal('hide') // hiding modal form
                };
            });
        });
      });
     
     // Edit Modal Window - opens modal with appropriate properties
     $('#tableA').on('click', '.btnEdit', async function (e) {
       // console.log('btnEdit is clicked');
  
       var id = $(this).attr("aria-label");
       // console.log(id);
  
       FormSubmitButton = document.querySelector('#btnSaveAFormSubmitButton');
  
       // enabling disabling buttons
       $('#btnAddNewAFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
       $('#btnSaveAFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button
  
       $('#modalA').modal('show');   // open modal
  
       $('#modalA').find('.modal-title').text('Edit Entry'); // Setting title for modal
  
       // retrieving data
       await axios({
           method: 'GET',
           url: `${HOST_URL}/api/v1/sales-finance/address/${id}`,
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
               document.querySelector('#adId').value = res.data.address._id;
               document.querySelector('#adAddress').value = res.data.address.address;
               document.querySelector('#adCity').value = res.data.address.city;
               document.querySelector('#adState').value = res.data.address.state;
               document.querySelector('#adCountry').value = res.data.address.country;
               document.querySelector('#adPincode').value = res.data.address.pinCode;
           }
       });
     });

    // deleteOne operation
    $('#tableA').on('click', '.btnDelete', function (e) {
      console.log('btnDelete Clicked');
      let ids = $(this).attr("aria-label");

      ids = ids.toString();

      const requests = {
          params: {
              _id: ids,
          }
      }

      axios.delete(`${HOST_URL}/api/v1/sales-finance/address`, requests);

      // reload table
      $('#tableA').KTDatatable().reload();
  
      });

      // deleteAll mass operation
      datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
        // datatable.checkbox() access to extension methods
        const ids = datatable.checkbox().getSelectedId();
        const count = ids.length;
    
        $('#tableA_selected_records_2').html(count);

        console.log(count)
    
        if (count > 0) {
            $('#tableA_group_action_form_2').collapse('show');
        } else {
            $('#tableA_group_action_form_2').collapse('hide');
        }
      });

     // form reset operation
     $('#formA').on('click', '.btnReset', function (e) {
       // console.log('btnReset clicked');
  
       if (fv) {
           // clearing forms
           fv.resetForm();
           fv.destroy();
       }
       else {
           // initiate validation
           fv = FormValidation.formValidation(AForm, formOptions);
       }
  
       // clearing validator messages
       $('.fv-plugins-message-container').text(''); // remove message
  
       // clearing fields
       $("#formA").trigger('reset'); // clear form fields
  
       // clear manually
       // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
     })
  
     // form add operation
     $('#formA').on('click', '.btnAdd', function (e) {
       // console.log('btnCreate clicked');
  
       // clearing validator messages
       $('.fv-plugins-message-container').text(''); // remove message
       
       FormSubmitButton = document.querySelector('#btnAddNewAFormSubmitButton');
  
       // Validation
       fv = FormValidation.formValidation(AForm, formOptions);
  
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
               url: `${HOST_URL}/api/v1/sales-finance/address`,
               data: {
                   address: document.querySelector('#adAddress').value,
                   city: document.querySelector('#adCity').value,
                   state: document.querySelector('#adState').value ,
                   country: document.querySelector('#adCountry').value ,
                   pinCode: document.querySelector('#adPincode').value
               },
           }).then(function (res) {
           
               // Return valid JSON
               // console.log(res);
  
               // Release button
               KTUtil.btnRelease(FormSubmitButton);
  
               if (res.data.status == 'success') {
                   // reseting & clearing
                   $('#modalA').modal('hide')  // hiding modal form
                   toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                   $('#tableA').KTDatatable().reload(); // reload table
               }
               else if (res.data.status == 'error') {
                   $('#modalA').modal('hide')  // hiding modal form
                   toastr.error(`${res.data.message}`, `${res.data.status}`)
               }
               else {
                   $('#modalA').modal('hide')
               };
           });
       });
      });      
  
      /* Modal Operations */
      // to open modal 
      $('#btnOpenAModal').on('click', async function (e) {
      // console.log('btnNewItem is clicked');
  
      FormSubmitButton = document.querySelector('#btnAddNewAFormSubmitButton');
  
      // enabling disabling buttons
      $('#btnAddNewAFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
      $('#btnSaveAFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button
  
      $('#modalA').modal('show');   // open modal  
  
      $('#modalA').find('.modal-title').text('Add New Address Notification'); // Setting title for modal
  
      });
        
    //   // modal post closed
    //   $('#modalA').on('hidden.bs.modal', function (e) {
    //       //  console.log('Modal is closed');
  
    //       if (fv) {
    //           // clearing forms
    //           fv.resetForm();
    //           fv.destroy();
    //        }
  
    //        // clearing validator messages
    //        $('.fv-plugins-message-container').text(''); // remove message
  
    //        // clearing fields
    //        $("#formA").trigger('reset'); // clear form fields
           
  
    //   });
        
    //   // modal post opened
    //   $('#modalA').on('shown.bs.modal', function (e) {
  
    //   // Initializing 
  
  
    //   });
        
        
    };
    return {
        // public functions
          init: function () {
          _Address();
          
        },
      };
  })();
  
  jQuery(document).ready(function () {
      SalesFinanceCRUD.init();
  });    