/* eslint-disable */
'use strict';

// Class definition
const EcommerceOrderItemsCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    const _createEcommerceOrderItems = function () {
        // Getting Document related information
        const createEcommerceOrderItemsForm = KTUtil.getById('createEcommerceOrderItemsForm');           
        const createEcommerceOrderItemsFormSubmitButton = KTUtil.getById('createEcommerceOrderItemsFormSubmitButton');
        const eoiProductName = KTUtil.getById('eoiProductName');
        const eoiProductID = KTUtil.getById('eoiProductID');
        const eoiManufacturerPartID = KTUtil.getById('eoiManufacturerPartID');
        const eoiHSN = KTUtil.getById('eoiHSN');
        const eoiQuantity = KTUtil.getById('eoiQuantity');
        const eoiUnitPrice = KTUtil.getById('eoiUnitPrice');
        const eoiMeta = KTUtil.getById('eoiMeta');
        const eoiDiscount = KTUtil.getById('eoiDiscount');

        
        const eoiCGST = KTUtil.getById('eoiCGST');
        const eoiSGST = KTUtil.getById('eoiSGST');
        const eoiIGST = KTUtil.getById('eoiIGST');
        const calcCGST = KTUtil.getById('calcCGST');
        const calcSGST = KTUtil.getById('calcSGST');
        const calcIGST = KTUtil.getById('eoiIGST');

        // Number : Number Controls Same Sides: No of Items
        $('#eoiQuantity').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',
      
            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '$'
          });
        // Number : Number Controls Same Sides: Gross Total
        $('#eoiUnitPrice').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',
      
            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: ''
          });  
        // Number : Number Controls Same Sides: Tax Total
        $('#eoiDiscount').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',
      
            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '$'
          });
        // Number : Number Controls Same Sides: Shipping Charges
        $('#calcCGST').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',
      
            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '$'
          });
        // Number : Number Controls Same Sides: Insurance Charges
        $('#calcSGST').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',
      
            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '$'
          });
        // Number : Number Controls Same Sides: Net Total
        $('#calcIGST').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',
      
            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '$'
          });

        if(!createEcommerceOrderItemsForm) {
        return;   
        }

      FormValidation.formValidation(createEcommerceOrderItemsForm, {
          fields: {
                    eoiProductName: {
                    validators: {
                        notEmpty: {
                            message: 'Product Name is required',
                            },
                        },
                    },           
                    eoiProductID: {
                    validators: {
                        notEmpty: {
                            message: 'ID is required',
                            },
                        },
                    }, 
                    eoiManufacturerPartID: {
                    validators: {
                        notEmpty: {
                            message: 'ID is required',
                            },
                        },
                    }, 
                    eoiHSN: {
                    validators: {
                        notEmpty: {
                            message: 'This field is required',
                            },
                        },
                    }, 

                    eoiQuantity: {
                    validators: {
                        notEmpty: {
                            message: 'Quantity is required',
                            },
                        },
                    }, 
                    eoiUnitPrice: {
                    validators: {
                        notEmpty: {
                            message: 'Unit Price is required',
                            },
                        },
                    },  
                    eoiMeta : {
                    validators: {
                        notEmpty: {
                            message: 'This field is required',
                            },
                        },
                    },
                    eoiDiscount: {
                        validators: {
                            notEmpty: {
                                message: 'Discount is required',
                            },
                        },
                    },
                    eoiCGST: {
                        validators: {
                            notEmpty: {
                                message: 'This field is required',
                            },
                        },
                    },
                    eoiSGST: {
                        validators: {
                            notEmpty: {
                                message: 'This field is required',
                            },
                        },
                    },
                    eoiIGST: {
                        validators: {
                            notEmpty: {
                                message: 'This field is required',
                            },
                        },
                    },
                    calcCGST: {
                        validators: {
                            notEmpty: {
                                message: 'This field is required',
                            },
                        },
                    },
                    calcSGST: {
                        validators: {
                            notEmpty: {
                                message: 'This field is required',
                            },
                        },
                    },
                    calcIGST: {
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
        createEcommerceOrderItemsFormSubmitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
    }).on('core.form.valid', function () {
        KTUtil.btnWait(createEcommerceOrderItemsFormSubmitButton, _buttonSpinnerClasses, 'Please wait');

        axios({
            method: 'Post',
            url: `${HOST_URL}/api/v1/ecommerce/order`,
                data: {
                        items:[{
                        productName: eoiProductName.value,
                        productId: eoiProductID.value,
                        _manufacturerPartId: eoiManufacturerPartID.value,
                        HSNCode: eoiHSN.value,
                        quanity: eoiQuantity.value,
                        unitPrice: eoiUnitPrice.value,
                        meta: eoiMeta.value,
                        discount: eoiDiscount.value,

                        tax: {
                            CGST:eoiCGST.value,
                            SGST:eoiSGST.value,
                            IGST:eoiIGST.value,
                            calcCGST:calcCGST.value,
                            calSGST:calcSGST.value,
                            calcIGST:calcIGST.value,
                        },
                    }],    
                },
            }).then(function (res) {
            KTUtil.btnRelease(createEcommerceOrderItemsFormSubmitButton);
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
                    _createEcommerceOrderItems();
                }
                }
            })();
            
            
            jQuery(document).ready(function () {
                EcommerceOrderItemsCRUD.init();
            });
                               
                    