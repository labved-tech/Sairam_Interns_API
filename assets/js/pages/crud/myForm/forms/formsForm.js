/* eslint-disable */
'use strict';

// Class definition
const FormCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

  // Date Picker
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
    

    /* Initializing */

    // Date & Time : Date
    $('#fAliveTill').datepicker({
      rtl: KTUtil.isRTL(),
      todayBtn: 'linked',
      clearBtn: true,
      todayHighlight: true,
      orientation: 'bottom left',
      templates: arrows,
    });  

    // Dropdown List : Multiple Select1  W Seacrh
    $('fAccountInclude').selectpicker({
    });


    // Dropdown List : Multiple Select1  W Seacrh
    $('fAccountExclude').selectpicker({
    });
 

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
             
  return {
    // public functions
    init: function () {
        _createFormResponse();
        _createForms();

    }
  };
})();

jQuery(document).ready(function () {
    FormCRUD.init();
});
