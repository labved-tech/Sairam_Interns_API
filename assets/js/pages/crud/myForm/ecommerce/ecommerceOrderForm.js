/* eslint-disable */
'use strict';

// Class definition
const EcommerceOrderCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    const _createEcommerceOrder = function () {
        // Getting Document related information
        const createEcommerceOrderForm = KTUtil.getById('createEcommerceOrderForm');           
        const createEcommerceOrderFormSubmitButton = KTUtil.getById('createEcommerceOrderFormSubmitButton');
        const eoNumItems = KTUtil.getById('eoNumItems');
        const eoGrossTotal = KTUtil.getById('eoGrossTotal');
        const eoTaxTotal = KTUtil.getById('eoTaxTotal');
        const eoShippingCharges = KTUtil.getById('eoShippingCharges');
        const eoInsurance = KTUtil.getById('eoInsurance');
        const eoNetTotal = KTUtil.getById('eoNetTotal');
        const eoStatus = KTUtil.getById('eoStatus');
        const eoUserID = KTUtil.getById('eoUserID');

        // Number : Number Controls Same Sides: No of Items
        $('#eoNumItems').TouchSpin({
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
        $('#eoGrossTotal').TouchSpin({
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
        $('#eoTaxTotal').TouchSpin({
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
        $('#eoShippingCharges').TouchSpin({
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
        $('#eoInsurance').TouchSpin({
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
        $('#eoNetTotal').TouchSpin({
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

          if(!createEcommerceOrderForm) {
            return;   
        }

      FormValidation.formValidation(createEcommerceOrderForm, {
          fields: {
                    eoNumItems: {
                        validators: {
                            notEmpty: {
                                message: 'No of Items is required',
                                },
                            },
                    }, 
                    eoGrossTotal: {
                    validators: {
                        notEmpty: {
                            message: 'Gross Total is required',
                            },
                        },
                    },           
                    eoTaxTotal: {
                    validators: {
                        notEmpty: {
                            message: 'Tax Total is required',
                            },
                        },
                    }, 
                    eoShippingCharges: {
                    validators: {
                        notEmpty: {
                            message: 'Shipping Charges is required',
                            },
                        },
                    }, 

                    eoInsurance: {
                    validators: {
                        notEmpty: {
                            message: 'Insurance Charges is required',
                            },
                        },
                    }, 
                    eoNetTotal: {
                    validators: {
                        notEmpty: {
                            message: 'Net Total are required',
                            },
                        },
                    },  
                    eoStatus : {
                    validators: {
                        notEmpty: {
                            message: 'Status  is required',
                            },
                        },
                    },       
                    eoUserID: {
                    validators: {
                        notEmpty: {
                          message: 'User Id is required',
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
        createEcommerceOrderFormSubmitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
    }).on('core.form.valid', function () {
        KTUtil.btnWait(createEcommerceOrderFormSubmitButton, _buttonSpinnerClasses, 'Please wait');

        axios({
            method: 'Post',
            url: `${HOST_URL}/api/v1/ecommerce/order`,
                data: {
                    numItems: (eoNumItems.value)*1,
                    grossTotal: (eoGrossTotal.value)*1,
                    taxTotal: (eoTaxTotal.value)*1,
                    shippingCharges: (eoShippingCharges.value)*1,
                    insuranceCharges: (eoInsurance.value)*1,
                    netTotal: (eoNetTotal.value)*1,
                    status: eoStatus.value,
                    _userId: eoUserID.value
                },
            }).then(function (res) {
            KTUtil.btnRelease(createEcommerceOrderFormSubmitButton);
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
                    _createEcommerceOrder();
                }
                }
            })();
            
            
            jQuery(document).ready(function () {
                EcommerceOrderCRUD.init();
            });
                               
                    