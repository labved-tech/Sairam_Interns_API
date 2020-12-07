/* eslint-disable */
'use strict';

// Class definition
const PagesCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

  // Private functions
  const _createPages = function () {
    // Getting Document related information
    const createPagesForm = KTUtil.getById('createPagesForm');           
    const createPagesFormSubmitButton = KTUtil.getById('createPagesFormSubmitButton');
    const pName = KTUtil.getById('pName');
    const pState = KTUtil.getById('pState');
    const pOwnerId = KTUtil.getById('pOwnerId');
    const pContents = KTUtil.getById('pContents');
    
    // Dropdown List : Multiple Select

    $('#pContents').select2({
        allowClear: true
            });

    if(!createPagesForm) {
      return;
    }

    FormValidation.formValidation(createPagesForm, {
      fields: {
        pName: {
          validators: {
            notEmpty: {
              message: 'Name is required',
            },
          },
        },  
        pState : {
            validators: {
              notEmpty: {
                message: 'State is required',
              },
            },
          },
          pOwnerId: {
            validators: {
              notEmpty: {
                message: 'Owner ID is required',
              },
            },
          },
          pContents: {
            validators: {
              notEmpty: {
                message: 'Content is required',
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
        createPagesFormSubmitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      },
    }).on('core.form.valid', function () {
        KTUtil.btnWait(createPagesFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
        
      // Accessing Restful API
      axios({
        method: 'Post',
        url: `${HOST_URL}/api/v1/Pages`,
          data: {
            name: pName.value,
            state: pState.value,
            _ownerid: pOwnerId.value,
            contents:pContents.value,
              
        },
      }).then(function (res) {
        KTUtil.btnRelease(createPagesFormSubmitButton);
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
        _createPages();
    },
  };
})();

jQuery(document).ready(function () {
    PagesCRUD.init();
});
