/* eslint-disable */
'use strict';

// Class definition
const EcommerceLocationsCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';


    const _createEcommerceLocations = function () {
        // Getting Document related information
        const createEcommerceLocationsForm = KTUtil.getById('createEcommerceLocationsForm');           
        const createEcommerceLocationsFormSubmitButton = KTUtil.getById('createEcommerceLocationsFormSubmitButton');
        const elAddress = KTUtil.getById('elAddress');
        const elGPSCoordinates = KTUtil.getById('elGPSCoordinates');
        const elLandlineNumber = KTUtil.getById('elLandlineNumber');
        const elMobileNumber = KTUtil.getById('elMobileNumber');
        const elGSTINNo = KTUtil.getById('elGSTINNo');
        const elPANNo = KTUtil.getById('elPANNo');
        const elLicenseNo = KTUtil.getById('elLicenseNo');
        const elStatus = KTUtil.getById('elStatus');
        const elName = KTUtil.getById('elName');
        const elDescription = KTUtil.getById('elDescription');
        const elNotes = KTUtil.getById('elNotes');
        const elRevieAttributeId = KTUtil.getById('elRevieAttributeId');

        const elaciName = KTUtil.getById('elaciName');
        const elaciInfo = KTUtil.getById('elaciInfo');  
      
      
      
        if(!createEcommerceLocationsForm) {
            return;   
        }
    
        FormValidation.formValidation(createEcommerceLocationsForm, {
            fields: {
                elAddress: {
                    validators: {
                        notEmpty: {
                            message: 'Address is required',
                    },
                    },
                }, 
                elGPSCoordinates: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                    },
                    },
                },           
                elLandlineNumber: {
                    validators: {
                        notEmpty: {
                            message: 'Landline Number is required',
                    },
                    },
                }, 
                elMobileNumber: {
                    validators: {
                        notEmpty: {
                            message: 'Mobile Number is required',
                    },
                    },
                }, 
                elGSTINNo: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                    },
                    },
                }, 
                elPANNo: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                    },
                    },
                }, 
                elLicenseNo: {
                    validators: {
                        notEmpty: {
                            message: 'License No. is required',
                    },
                },
                },  
                elStatus : {
                        validators: {
                            notEmpty: {
                            message: 'Status is required',
                    },
                    },
                },       
                elName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                    },
                },
                },
                elDescription: {
                    validators: {
                        notEmpty: {
                            message: 'Description is required',
                    },
                },
                },  
                elNotes: {
                    validators: {
                        notEmpty: {
                            message: 'Notes are required',
                    },
                },
                },        
                elRevieAttributeId: {
                    validators: {
                        notEmpty: {
                            message: 'Attribute ID is required',
                    },
                },
                },
                elaciName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                    },
                },
                },                         
                elaciInfo: {
                    validators: {
                        notEmpty: {
                            message: 'Information is required',
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
            createEcommerceLocationsFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        }).on('core.form.valid', function () {
            KTUtil.btnWait(createEcommerceLocationsFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
            
    
            // Accessing Restful API
        
            axios({
            method: 'Post',
            url: `${HOST_URL}/api/v1/ecommerce/locations/`,
                data: {
                    address: elAddress.value,
                    gpsCoordinates: elGPSCoordinates.value,
                    landlineNumber: elLandlineNumber.value,
                    mobileNumber:elMobileNumber.value,
                    GSTNNo: elGSTINNo.value,
                    PANNo: elPANNo.value,
                    licenseNo: elLicenseNo.value,
                    status: elStatus.value,
                    name: elName.value,
                    description: elDescription.value,
                    notes: elNotes.value,
                    _reviewAttributeId: elRevieAttributeId.value,

                    additionalContactInfo: {
                        name: elaciName.value,
                        info: elaciInfo.value,
                    },
            },
            }).then(function (res) {
            KTUtil.btnRelease(createEcommerceLocationsFormSubmitButton);
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
            _createEcommerceLocations();
        }
        }
    })();
    
    
    jQuery(document).ready(function () {
        EcommerceLocationsCRUD.init();
    });
    