/* eslint-disable */
'use strict';

// Class definition
const EcommerceAddressCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';


    const _createEcommerceAddress = function () {
      // Getting Document related information
      const createEcommerceAddressForm = KTUtil.getById('createEcommerceAddressForm');           
      const createEcommerceAddressFormSubmitButton = KTUtil.getById('createEcommerceAddressFormSubmitButton');
      const eaAddress1 = KTUtil.getById('eaAddress1');
      const eaStreet = KTUtil.getById('eaStreet');
      const eaCity = KTUtil.getById('eaCity');
      const eaState = KTUtil.getById('eaState');
      const eaCountry = KTUtil.getById('eaCountry');
      const eaPostalCode = KTUtil.getById('eaPostalCode');
     
  
      if(!createEcommerceAddressForm) {
        return;   
      }
  
      FormValidation.formValidation(createEcommerceAddressForm, {
        fields: {
          eaAddress1: {
            validators: {
              notEmpty: {
                message: 'This Field is required',
              },
            },
          }, 
          eaStreet: {
            validators: {
              notEmpty: {
                message: 'This Field is required',
              },
            },
          },           
          eaCity: {
            validators: {
              notEmpty: {
                message: 'This Field is required',
              },
            },
          }, 
          eaState: {
            validators: {
              notEmpty: {
                message: 'This Field is required',
              },
            },
          }, 
          eaCountry: {
            validators: {
              notEmpty: {
                message: 'This Field is required',
              },
            },
          }, 
          eaPostalCode: {
            validators: {
              notEmpty: {
                message: 'This Field is required',
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
          createEcommerceAddressFormSubmitButton: new FormValidation.plugins.SubmitButton(),
          // Submit the form when all fields are valid
          //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
      }).on('core.form.valid', function () {
          KTUtil.btnWait(createEcommerceAddressFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
          
  
          // Accessing Restful API
    
        axios({
          method: 'Post',
          url: `${HOST_URL}/api/v1/ecommerce/address/`,
            data: {
                address1:eaAddress1.value,
                street:eaStreet.value,
                city:eaCity.value,
                state:eaState.value,
                country:eaCountry.value,
                postalCode:eaPostalCode.value,
              
          },
        }).then(function (res) {
          KTUtil.btnRelease(createEcommerceAddressFormSubmitButton);
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
          _createEcommerceAddress();
      }
    }
  })();
  
  
  jQuery(document).ready(function () {
      EcommerceAddressCRUD.init();
  });
  