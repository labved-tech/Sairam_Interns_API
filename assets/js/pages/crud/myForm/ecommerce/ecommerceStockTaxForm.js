/* eslint-disable */
'use strict';

// Class definition
const EcommerceStockTaxCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';


    const _createEcommerceStockTax = function () {
        // Getting Document related information
        const createEcommerceStockTaxForm = KTUtil.getById('createEcommerceStockTaxForm');           
        const createEcommerceStockTaxFormSubmitButton = KTUtil.getById('createEcommerceStockTaxFormSubmitButton');
        const estCGST = KTUtil.getById('estCGST');
        const estSGST = KTUtil.getById('estSGST');
        const estIGST = KTUtil.getById('estIGST');
      
        if(!createEcommerceStockTaxForm) {
            return;   
        }

        FormValidation.formValidation(createEcommerceStockTaxForm, {
            fields: {
                estCGST: {
                    validators: {
                        notEmpty: {
                            message: 'This field is required',
                        },
                    },
                },  
                estSGST: {
                    validators: {
                        notEmpty: {
                            message: 'This field is required',
                        },
                    },
                },        
                estIGST: {
                    validators: {
                        notEmpty: {
                            message: 'This field is required',
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
            createEcommerceStockTaxFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        }).on('core.form.valid', function () {
            KTUtil.btnWait(createEcommerceStockTaxFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
            
    
            // Accessing Restful API
        
            axios({
            method: 'Post',
            url: `${HOST_URL}/api/v1/ecommerce/stock`,
                data: {
                    tax:[{
                        CGST:estCGST.value,
                        SGST:estSGST.value,
                        IGST:estIGST.value,
                    }]

            },
            }).then(function (res) {
            KTUtil.btnRelease(createEcommerceStockTaxFormSubmitButton);
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
            _createEcommerceStockTax();
        }
        }
    })();
    
    
    jQuery(document).ready(function () {
        EcommerceStockTaxCRUD.init();
    });
    