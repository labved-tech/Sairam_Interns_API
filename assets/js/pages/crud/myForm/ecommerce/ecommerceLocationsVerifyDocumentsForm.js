/* eslint-disable */
'use strict';

// Class definition
const EcommerceLocationsVerifyDocumentsCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';


    const _createEcommerceLocationsVerifyDocuments = function () {
        // Getting Document related information
        const createEcommerceLocationsVerifyDocumentsForm = KTUtil.getById('createEcommerceLocationsVerifyDocumentsForm');           
        const createEcommerceLocationsVerifyDocumentsFormSubmitButton = KTUtil.getById('createEcommerceLocationsVerifyDocumentsFormSubmitButton');
        const elvdName = KTUtil.getById('elvdName');
        const elvdURL = KTUtil.getById('elvdURL');
        const elvdType = KTUtil.getById('elvdType');   
      
      
      
        if(!createEcommerceLocationsVerifyDocumentsForm) {
            return;   
        }
    
        FormValidation.formValidation(createEcommerceLocationsVerifyDocumentsForm, {
            fields: {
                elvdName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                    },
                },
                },  
                elvdURL: {
                    validators: {
                        notEmpty: {
                            message: 'URL is required',
                    },
                },
                },        
                elvdType: {
                    validators: {
                        notEmpty: {
                            message: 'Type is required',
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
            createEcommerceLocationsVerifyDocumentsFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        }).on('core.form.valid', function () {
            KTUtil.btnWait(createEcommerceLocationsVerifyDocumentsFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
            
    
            // Accessing Restful API
        
            axios({
            method: 'Post',
            url: `${HOST_URL}/api/v1/ecommerce/locations/`,
                data:{

                    verifyDocuments: [
                        {
                        name: elvdName.value,
                        URL: elvdURL.value,
                        type: elvdType.value,
                        },
                    ],
            },
            }).then(function (res) {
            KTUtil.btnRelease(createEcommerceLocationsVerifyDocumentsFormSubmitButton);
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
                toastr.success(`${res.data.        message}`, `${res.data.status}`)
                } else if (res.data.status == 'error') {
                toastr.error(`${res.data.        message}`, `${res.data.status}`)
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
            _createEcommerceLocationsVerifyDocuments();
        }
        }
    })();
    
    
    jQuery(document).ready(function () {
        EcommerceLocationsVerifyDocumentsCRUD.init();
    });
    