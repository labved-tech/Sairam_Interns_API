/* eslint-disable */
'use strict';

// Class definition
const EcommerceStockDiscountCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';


    const _createEcommerceStockDiscount = function () {
        // Getting Document related information
        const createEcommerceStockDiscountForm = KTUtil.getById('createEcommerceStockDiscountForm');           
        const createEcommerceStockDiscountFormSubmitButton = KTUtil.getById('createEcommerceStockDiscountFormSubmitButton');
        const esdDiscountVol = KTUtil.getById('esdDiscountVol');
        const esdDiscountPercent = KTUtil.getById('esdDiscountPercent');
        const esdName = KTUtil.getById('esdName');
        const esdDescription = KTUtil.getById('esdDescription');
        
        if(!createEcommerceStockDiscountForm) {
            return;   
        }

        FormValidation.formValidation(createEcommerceStockDiscountForm, {
            fields: {
                esdDiscountVol: {
                    validators: {
                        notEmpty: {
                            message: 'This field is required',
                        },
                    },
                },
                esdDiscountPercent: {
                    validators: {
                        notEmpty: {
                            message: 'This field is required',
                        },
                    },
                },
                esdName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                        },
                    },
                },                         
                esdDescription: {
                    validators: {
                        notEmpty: {
                            message: 'Description is required',
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
            createEcommerceStockDiscountFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        }).on('core.form.valid', function () {
            KTUtil.btnWait(createEcommerceStockDiscountFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
            
    
            // Accessing Restful API
        
            axios({
            method: 'Post',
            url: `${HOST_URL}/api/v1/ecommerce/stock`,
                data: {
                    discount:[ {
                        discountVol:esdDiscountVol.value,
                        discountPercent:esdDiscountPercent.value,
                        name:esdName.value,
                        description:esdDescription.value,
                    }],

            },
            }).then(function (res) {
            KTUtil.btnRelease(createEcommerceStockDiscountFormSubmitButton);
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
            _createEcommerceStockDiscount();
        }
        }
    })();
    
    
    jQuery(document).ready(function () {
        EcommerceStockDiscountCRUD.init();
    });
    