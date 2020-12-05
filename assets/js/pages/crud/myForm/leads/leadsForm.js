/* eslint-disable */
'use strict';

// Class definition
const LeadsCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

  // Private functions
  const _createLeadCategories = function () {
    // Getting Document related information
    const createLeadCategoriesForm = KTUtil.getById('createLeadCategoriesForm');           
    const createLeadCategoriesFormSubmitButton = KTUtil.getById('createLeadCategoriesFormSubmitButton');
    const lcName = KTUtil.getById('lcName');
    const lcDescription = KTUtil.getById('lcDescription');
    const lcNotes = KTUtil.getById('lcNotes');
    const lcStatus = KTUtil.getById('lcStatus');

    

    if(!createLeadCategoriesForm) {
      return;   
    }

    FormValidation.formValidation(createLeadCategoriesForm, {
      fields: {
        lcName: {
          validators: {
            notEmpty: {
              message: 'Name is required',
            },
          },
          lcDescription: {
            validators: {
              notEmpty: {
                message: 'Description is required',
              },
            },
          },
          lcNotes: {
            validators: {
              notEmpty: {
                message: 'Notes is required',
              },
            },
          },
          lcStatus: {
            validators: {
              notEmpty: {
                message: 'Status is required',
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
        createLeadCategoriesFormSubmitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      },
    }).on('core.form.valid', function () {
        KTUtil.btnWait(createLeadCategoriesFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
        
      // Accessing Restful API
      axios({
        method: 'Post',
        url: `${HOST_URL}/api/v1/lead/categories/`,
          data: {
            name: lcName.value,
            description: lcDescription.value,
            notes: lcNotes.value,
            status:lcStatus.value,
              
        },
      }).then(function (res) {
        KTUtil.btnRelease(createLeadCategoriesFormSubmitButton);
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


const _createLeadResponse = function () {
    // Getting Document related information
    const createLeadResponseForm = KTUtil.getById('createLeadResponseForm');           
    const createLeadResponseFormSubmitButton = KTUtil.getById('createLeadResponseFormSubmitButton');
    const lrLeadId = KTUtil.getById('lrLeadId');
    const lrResponderId = KTUtil.getById('lrResponderId');
    const lrEmailSent = KTUtil.getById('lrEmailSent');
    const lrIsStatusChange = KTUtil.getById('lrIsStatusChange');
    const lrMessage = KTUtil.getById('lrMessage');
    const lrStatus = KTUtil.getById('lrStatus');



    

    if(!createLeadResponseForm) {
      return;   
    }

    FormValidation.formValidation(createLeadResponseForm, {
      fields: {
        lrLeadId: {
          validators: {
            notEmpty: {
              message: 'Lead ID is required',
            },
          },
          lrResponderId: {
            validators: {
              notEmpty: {
                message: 'Responder ID is required',
              },
            },
          },
          lrEmailSent: {         
            validators: {
              notEmpty: {
                message: 'Is Email Sent is required',
              },
            },
          },
          lrIsStatusChange: {
            validators: {
              notEmpty: {
                message: 'Status Change is required',
              },
            },
          },
          lrMessage: {
            validators: {
              notEmpty: {
                message: 'Message is required',
              },
            },
          },
          lrStatus: {
            validators: {
              notEmpty: {
                message: 'Status is required',
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
        createLeadResponseFormSubmitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      },
    }).on('core.form.valid', function () {
        KTUtil.btnWait(createLeadResponseFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
        
        lrIsStatusChange.value = (lrIsStatusChange.value == 'on') ? true:false
        lrEmailSent.value = (lrEmailSent.value == 'on') ? true:false
        // Accessing Restful API
  
      axios({
        method: 'Post',
        url: `${HOST_URL}/api/v1/lead/response/`,
          data: {
            _leadId: lrLeadId.value,
            _responderId: lrResponderId.value,
            emailSent: lrEmailSent.value,
            isStatusChange:lrIsStatusChange.value,
            message:lrMessage.value,
            status:lrStatus.value,
              
        },
      }).then(function (res) {
        KTUtil.btnRelease(createLeadResponseFormSubmitButton);
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
        _createLeadResponse();
        _createLeadCategories();
    }
  }
})();


jQuery(document).ready(function () {
    LeadsCRUD.init();
});
