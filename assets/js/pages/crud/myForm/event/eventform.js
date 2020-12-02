/* eslint-disable */
'use strict';

/* Class definition */
const eventCRUD = (function () {
  const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

  /*   Private functions */
  const _createEventEntriesForm = function () {

    // Getting Document related information
    const createEventEntriesForm = KTUtil.getById('createEventEntriesForm');
    const eeFormSubmitButton = KTUtil.getById('eeFormSubmitButton');
    const eePriority = KTUtil.getById('eePriority');
    const eeExpires = KTUtil.getById('eeExpires');
    const eeType = KTUtil.getById('eeType');
    const eeBoundaryTxt = KTUtil.getById('eeBoundaryTxt');
    const eeBoundarySlider = KTUtil.getById('eeBoundarySlider');
    const eeLocation = KTUtil.getById('eeLocation');

    // Initializing 

    // eeExpires
    $(eeExpires).select2({
      placeholder: "Select"
    });

    // eeType
    $(eeType).select2({
      placeholder: "Select"
    });

    // eeBoundary
    noUiSlider.create(eeBoundarySlider, {
      start: [0],
      step: 2,
      range: {
        'min': [0],
        'max': [10]
      },
      format: wNumb({
        decimals: 0
      })
    });

    eeBoundarySlider.noUiSlider.on('update', function (values, handle) {
      eeBoundaryTxt.value = values[handle];
    });

    eeBoundarySlider.addEventListener('change', function () {
      eeBoundaryTxt.noUiSlider.set(this.value);
    });

    // Return Form
    if (!createEventEntriesForm) {
      return;
    }

    // Validation
    FormValidation.formValidation(createEventEntriesForm, {
      fields: {
        eePriority: {
          validators: {
            notEmpty: {
              message: 'Priority is required',
            },
          },
        },
        eeType: {
          validators: {
            notEmpty: {
              message: 'Type is required',
            },
          },
        },
        eeBoundaryTxt: {
          validators: {
            notEmpty: {
              message: 'Boundary is required',
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
        eeFormSubmitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      },
    })
      .on('core.form.valid', function () {
        // Show loading state on button
        KTUtil.btnWait(eeFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
        console.log(`Value:${eePriority.value}`);


        // Accessing Restful API
        axios({
          method: 'post',
          url: `${HOST_URL}/api/v1/event/entries`,
          data: {
            priority: (eePriority.value) * 1,
            //message: eeMessage.value,
            // expires: eeExpires.value,
            type: eeType.value,
            boundary: eeBoundaryTxt.value * 1,
          },

        }).then(function (res) {
          // Return valid JSON
          // Release button
          KTUtil.btnRelease(eeFormSubmitButton);
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
      _createEventEntriesForm();
    },
  };
})();

jQuery(document).ready(function () {
  eventCRUD.init();
});