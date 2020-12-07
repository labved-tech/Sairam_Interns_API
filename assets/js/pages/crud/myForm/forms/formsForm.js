/* eslint-disable */
'use strict';

// Class definition
const FormCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

  // Private functions
  const _createFormResponse = function () {
    // Getting Document related information
    const createFormResponseForm = KTUtil.getById('createFormResponseForm');           
    const createFormResponseFormSubmitButton = KTUtil.getById('createFormResponseFormSubmitButton');
    const frFormId = KTUtil.getById('frFormId');
    const frResponse = KTUtil.getById('frResponse');
    

    if(!createFormResponseForm) {
      return;
    }

    FormValidation.formValidation(createFormResponseForm, {
      fields: {
        frFormId: {
            validators: {
              notEmpty: {
                message: 'Form ID is required',
              },
            },
          },  
        frResponse: {
          validators: {
            notEmpty: {
              message: 'Response is required',
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
        createFormResponseFormSubmitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      },
    }).on('core.form.valid', function () {
        KTUtil.btnWait(createFormResponseFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
        
      // Accessing Restful API
      axios({
        method: 'Post',
        url: `${HOST_URL}/api/v1/form-response`,
          data: {
            _formId: frFormId.value,
            response: frResponse.value,
              
        },
      }).then(function (res) {
        KTUtil.btnRelease(createFormResponseFormSubmitButton);
          console.log(res);
         
           // TOASTR EXAMPLE
          toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }; 

          if (res.data.status == 'success') {
            toastr.success(`${res.data.message}`, `${res.data.status}`)
          } else if (res.data.status == 'error') {
            toastr.error(`${res.data.message}`, `${res.data.status}`)
          }
        });
  
        })
        .on('core.form.invalid', function () { 
          console.log('Something went wrong!!');
  
        });
        
      };
      const _createForms = function () {
        // Getting Document related information
        const createFormsForm = KTUtil.getById('createFormsForm');           
        const createFormsFormSubmitButton = KTUtil.getById('createFormsFormSubmitButton');
        const fName = KTUtil.getById('fName');
        const fOwnerId = KTUtil.getById('fOwnerId');
        const fAliveTill = KTUtil.getById('fAliveTill');
        const fAccountInclude = KTUtil.getById('fAccountInclude');
        const fAccountExclude = KTUtil.getById('fAccountExclude');
        
    
        if(!createFormsForm) {
          return;
        }
    
        FormValidation.formValidation(createFormsForm, {
          fields: {
            fName: {
              validators: {
                notEmpty: {
                  message: 'Name is required',
                },
              },
            }, 
            fOwnerId: {
              validators: {
                notEmpty: {
                  message: 'Owner ID is required',
                },
              },
            },
         
            fAliveTill : {
                validators: {
                  notEmpty: {
                    message: 'Date is required',
                  },
                },
              },
              fAccountInclude : {
                validators: {
                  notEmpty: {
                    message: 'This Field is required',
                  },
                },
              },
              fAccountExclude : {
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
            createFormsFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
          },
        }).on('core.form.valid', function () {
            KTUtil.btnWait(createFormsFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
            
          // Accessing Restful API
          axios({
            method: 'Post',
            url: `${HOST_URL}/api/v1/forms/`,
              data: {
                name: fName.value,
                _ownerId: fOwnerId.value,
                aliveTill: fAliveTill.value,
                accountInclude: fAccountInclude.value,
                accountExclude: fAccountExclude.value,
                  
            },
          }).then(function (res) {
            KTUtil.btnRelease(createFormsFormSubmitButton);
              console.log(res);
             
               // TOASTR EXAMPLE
              toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": true,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
              }; 
    
              if (res.data.status == 'success') {
                toastr.success(`${res.data.message}`, `${res.data.status}`)
              } else if (res.data.status == 'error') {
                toastr.error(`${res.data.message}`, `${res.data.status}`)
              }
            });
      
            })
            .on('core.form.invalid', function () { 
              console.log('Something went wrong!!');
      
            });
            
          };
          const _DateAndClock = function () {
            /* Initializing */
            
            const fAliveTill = KTUtil.getById('fAliveTill');  // Date & Time : Date

            // Date & Time : Date
            $('#fAliveTill, #demoDate_validate').datepicker({
              rtl: KTUtil.isRTL(),
              todayBtn: 'linked',
              clearBtn: true,
              todayHighlight: true,
              orientation: 'bottom left',
              templates: arrows,
            });  
          },                
            const _Lists = function () {
              const fAccountInclude = KTUtil.getById('fAccountInclude');          // Dropdown List : Multiple Select1
              const fAccountExclude = KTUtil.getById('fAccountExclude');          // Dropdown List : Multiple Select1
              
              // Dropdown List : Single Select
              
              $('#fAccountInclude').select2({
                allowClear: true
                  });
              
              $('#fAccountExclude').select2({
                allowClear: true
                  });                  
          };               
  return {
    // public functions
    init: function () {
        _createFormResponse();
        _DateAndClock();
        _Lists();
        _createForms();

    }
  };
})();

jQuery(document).ready(function () {
    FormCRUD.init();
});
