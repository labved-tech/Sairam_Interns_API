/* eslint-disable */
'use strict';

// Class definition
const ReportsCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

  // Private functions
  const _createReports = function () {
    // Getting Document related information
    const createReportsForm = KTUtil.getById('createReportsForm');           
    const createReportsFormSubmitButton = KTUtil.getById('createReportsFormSubmitButton');
    const rName = KTUtil.getById('rName');
    const rState = KTUtil.getById('rState');
    const rOwnerId = KTUtil.getById('rOwnerId');
    

    if(!createReportsForm) {
      return;
    }

    FormValidation.formValidation(createReportsForm, {
      fields: {
        rName: {
          validators: {
            notEmpty: {
              message: 'Name is required',
            },
          },
        },  
        rState : {
            validators: {
              notEmpty: {
                message: 'State is required',
              },
            },
          },
          rOwnerId: {
            validators: {
              notEmpty: {
                message: 'Owner ID is required',
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
        createReportsFormSubmitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      },
    }).on('core.form.valid', function () {
        KTUtil.btnWait(createReportsFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
        
      // Accessing Restful API
      axios({
        method: 'Post',
        url: `${HOST_URL}/api/v1/reports/`,
          data: {
            name: rName.value,
            state: rState.value,
            _ownerId: rOwnerId.value,
              
        },
      }).then(function (res) {
        KTUtil.btnRelease(createReportsFormSubmitButton);
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
        _createReports();
    },
  };
})();

jQuery(document).ready(function () {
    ReportsCRUD.init();
});
