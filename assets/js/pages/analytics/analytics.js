/* eslint-disable */
'use strict';

// Class definition
const AnalyticsCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

  // Private functions
  const _analytics = function () {
    // Getting Document related information
        const form = KTUtil.getById('form_analytics');           
        const formSubmitButton = KTUtil.getById('submitButton');
        const fromName = form.querySelector('[name="name"]').value;
        const fromState = form.querySelector('[name="state"]').value;

    if(!form) {
      return;
    }

    FormValidation.formValidation(form, {
      fields: {
        name: {
          validators: {
            notEmpty: {
              message: 'Name is required',
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
        submitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      },
    }).on('core.form.valid', function () {
        KTUtil.btnWait(formSubmitButton, _buttonSpinnerClasses, 'Please wait');
        
      // Accessing Restful API
      axios({
        method: 'Post',
        url: `${HOST_URL}/api/v1/analytics`,
          data: {
              name: fromName,
              state: fromState,
        },
      }).then(function (res) {
        KTUtil.btnRelease(formSubmitButton);
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
            "timeOut": "3000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }; 

          if (res.data.status == 'success') {
            toastr.success( `${res.data.message}` , `${res.data.status}`)
          } else if (res.data.status == 'error') {
            toastr.error ( `${res.data.message}` , `${res.data.status}`)
          }
      })
     }).on('core.form.invalid', function () { });
  };

  return {
    // public functions
    init: function () {
        _analytics();
    },
  };
})();

jQuery(document).ready(function () {
    AnalyticsCRUD.init();
});
