/* eslint-disable */
'use strict';

// Class definition
const AnalyticsCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

  // Private functions
  const _createAnalytics = function () {
    // Getting Document related information
    const createAnalyticsForm = KTUtil.getById('createAnalyticsForm');           
    const createAnalyticsFormSubmitButton = KTUtil.getById('createAnalyticsFormSubmitButton');
/*         const fromName = form.querySelector('[name="name"]').value;
        const fromState = form.querySelector('[name="state"]').value; */
    const aName = KTUtil.getById('aName');
    //const aState = KTUtil.getById('aState');
    const aOwnerId = KTUtil.getById('aOwnerId');
    const aReporterId = KTUtil.getById('aReporterId');
    

    if(!createAnalyticsForm) {
      return;
    }

    FormValidation.formValidation(createAnalyticsForm, {
      fields: {
        aName: {
          validators: {
            notEmpty: {
              message: 'Name is required',
            },
          },
          aOwnerId: {
            validators: {
              notEmpty: {
                message: '_ownerId is required',
              },
            },
          },
          aReporterId: {
            validators: {
              notEmpty: {
                message: '_reporterId is required',
              },
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
        createAnalyticsFormSubmitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      },
    }).on('core.form.valid', function () {
        KTUtil.btnWait(createAnalyticsFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
        
      // Accessing Restful API
      axios({
        method: 'Post',
        url: `${HOST_URL}/api/v1/analytics`,
          data: {
            name: aName.value,
            //state: aState.value,
            _ownerid: aOwnerId.value,
            _reportid:aReporterId.value,
              
        },
      }).then(function (res) {
        KTUtil.btnRelease(createAnalyticsFormSubmitButton);
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
        _createAnalytics();
    },
  };
})();

jQuery(document).ready(function () {
    AnalyticsCRUD.init();
});
