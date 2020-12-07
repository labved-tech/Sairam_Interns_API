/* eslint-disable */
'use strict';

// Class definition
const FarmCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

  // Private functions
  const _createFarmRegions = function () {
    // Getting Document related information
    const createFarmRegionsForm = KTUtil.getById('createFarmRegionsForm');           
    const createFarmRegionsFormSubmitButton = KTUtil.getById('createFarmRegionsFormSubmitButton');
    const frFarmId = KTUtil.getById('frFarmId');
    const frZoneId = KTUtil.getById('frZoneId');
    const frConsultant = KTUtil.getById('frConsultant');
    

    if(!createFarmRegionsForm) {
      return;
    }

    FormValidation.formValidation(createFarmRegionsForm, {
      fields: {
        frFarmId: {
          validators: {
            notEmpty: {
              message: 'Farm ID is required',
            },
          },
        },  
          frZoneId: {
            validators: {
              notEmpty: {
                message: 'Zone ID is required',
              },
            },
          },
          frConsultant: {
            validators: {
              notEmpty: {
                message: 'Consultant is required',
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
        createFarmRegionsFormSubmitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      },
    }).on('core.form.valid', function () {
        KTUtil.btnWait(createFarmRegionsFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
        
      // Accessing Restful API
      axios({
        method: 'Post',
        url: `${HOST_URL}/api/v1/farm/regions/`,
          data: {
            _farmId: frFarmId.value,
            _zoneId: frZoneId.value,
            consultant:frConsultant.value,
              
        },
      }).then(function (res) {
        KTUtil.btnRelease(createFarmRegionsFormSubmitButton);
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

      const _Lists = function () {
        const frConsultant = KTUtil.getById('frConsultant');          // Dropdown List : Multiple Select1
        
        // Dropdown List : Single Select
        
        $('#frConsultant').select2({
            allowClear: true
              });
      
    };        
  return {
    // public functions
    init: function () {
        _createFarmRegions();
        _Lists();
    },
  };
})();

jQuery(document).ready(function () {
    FarmCRUD.init();
});
