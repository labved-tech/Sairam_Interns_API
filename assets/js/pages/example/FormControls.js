/* eslint-disable */
'use strict';

// Class definition
const KTFormControls = (function () {
  // Private functions
  const _initDemo1 = function () {
    // Getting Document related information
    const form = KTUtil.getById('kt_form_1');           
    const formSubmitButton = KTUtil.getById('submitButton');

    if (!form) {
      return;
    }

    FormValidation.formValidation(document.getElementById('kt_form_1'), {
      fields: {
        email: {
          validators: {
            notEmpty: {
              message: 'Email is required',
            },
            emailAddress: {
              message: 'The value is not a valid email address',
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
        method: 'post',
        url: `${HOST_URL}/api/v1/example`,
        data: {
          
        },

      }).then(function (res) {
        KTUtil.btnRelease(formSubmitButton);
        console.log(res);
      })

     }).on('core.form.invalid', function () { });
  };

  return {
    // public functions
    init: function () {
      _initDemo1();
    },
  };
})();

jQuery(document).ready(function () {
  KTFormControls.init();
});
