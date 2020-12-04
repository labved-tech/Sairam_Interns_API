/* eslint-disable */
// 'use strict';

// Class definition
const KTFormControls = (function () {
  const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

  // Private functions
  const _initDemo1 = function () {
    // Getting Document related information
    const form = KTUtil.getById('kt_form_1');           
    const formSubmitButton = KTUtil.getById('submitButton');

    if (!form) {
      return;
    }
    
    // Validating Document
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
        // Validate fields when clicking the Submit button
        submitButton: new FormValidation.plugins.SubmitButton(),
        // Bootstrap Framework Integration
        bootstrap: new FormValidation.plugins.Bootstrap(),
        // Submit the form when all fields are valid
        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      },
    }).on('core.form.valid', function () {
      // Show loading state on button
      KTUtil.btnWait(formSubmitButton, _buttonSpinnerClasses, 'Please wait');

      // Accessing Restful API
      axios({
        method: 'post',
        url: `${HOST_URL}/api/v1/example`,
        data: {
          name: form.querySelector('[name="name"]').value,
        },
      }).then(function (res) {

        // Return valid JSON
        // Release button
        KTUtil.btnRelease(formSubmitButton);
        console.log(res);
        
        // SWAL EXAMPLE
/*         if (res.data.status == 'success') {
          Swal.fire({
            title: 'Success',
            text: res.data.message,
            icon: 'success',
            buttonsStyling: false,
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText : 'Cancel',
            customClass: {
              confirmButton: 'btn font-weight-bold btn-light-primary',
              cancelButton : 'btn font-weight-bold btn-light-primary',
            },
          }).then(function (result) {
            console.log(result);
            if (result.value) {
              Swal.fire({
                title: 'Success',
                icon: 'success',
                text: `Your file has been deleted`,
                confirmButtonText: 'OK',
              })
            } else if (result.isDismissed === true) {

              Swal.fire({
                title: 'Cancelled',
                icon: 'error',
                text: `Your imaginary file is safe :)`,
                confirmButtonText: 'OK',
              })
            }
  
          })
        } */

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
      _initDemo1();
    },
  };
})();

jQuery(document).ready(function () {
  KTFormControls.init();
});
