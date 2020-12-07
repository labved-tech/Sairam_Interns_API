/* eslint-disable */
'use strict';

// Class definition
const ChartsCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

  // Private functions
  const _createCharts = function () {
    // Getting Document related information
    const createChartsForm = KTUtil.getById('createChartsForm');           
    const createChartsFormSubmitButton = KTUtil.getById('createChartsFormSubmitButton');
    const cName = KTUtil.getById('cName');
    const cState = KTUtil.getById('cState');
    const cOwnerId = KTUtil.getById('cOwnerId');
    

    if(!createChartsForm) {
      return;
    }

    FormValidation.formValidation(createChartsForm, {
      fields: {
        cName: {
          validators: {
            notEmpty: {
              message: 'Name is required',
            },
          },
        },  
        cState : {
            validators: {
              notEmpty: {
                message: 'State is required',
              },
            },
          },
          cOwnerId: {
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
        createChartsFormSubmitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      },
    }).on('core.form.valid', function () {
        KTUtil.btnWait(createChartsFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
        
      // Accessing Restful API
      axios({
        method: 'Post',
        url: `${HOST_URL}/api/v1/Charts`,
          data: {
            name: cName.value,
            state: cState.value,
            _ownerId: cOwnerId.value,
              
        },
      }).then(function (res) {
        KTUtil.btnRelease(createChartsFormSubmitButton);
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
        _createCharts();
    },
  };
})();

jQuery(document).ready(function () {
    ChartsCRUD.init();
});
