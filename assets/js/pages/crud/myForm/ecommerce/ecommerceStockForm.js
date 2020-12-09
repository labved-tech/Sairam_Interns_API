/* eslint-disable */
'use strict';

// Class definition
const EcommerceStockCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';


    const _createEcommerceStock = function () {
        // Getting Document related information
        const createEcommerceStockForm = KTUtil.getById('createEcommerceStockForm');           
        const createEcommerceStockFormSubmitButton = KTUtil.getById('createEcommerceStockFormSubmitButton');
        const esType = KTUtil.getById('esType');
        const esUnitPrice = KTUtil.getById('esUnitPrice');
        const esAvailableStock = KTUtil.getById('esAvailableStock');
        const esName = KTUtil.getById('esName');
        const esDescription = KTUtil.getById('esDescription');
        const esNotes = KTUtil.getById('esNotes');
        const esLocationId = KTUtil.getById('esLocationId');
        const esStatus = KTUtil.getById('esStatus');
        const elmaxQuantityPerOrderNumber = KTUtil.getById('elmaxQuantityPerOrderNumber');

        const esdDiscountVol = KTUtil.getById('esdDiscountVol');
        const esdDiscountPercent = KTUtil.getById('esdDiscountPercent');
        const esdName = KTUtil.getById('esdName');
        const esdDescription = KTUtil.getById('esdDescription');

        const estCGST = KTUtil.getById('estCGST');
        const estSGST = KTUtil.getById('estSGST');
        const estIGST = KTUtil.getById('estIGST');
      
        // Number : Number Controls Same Sides: Unit Price
        $('#esUnitPrice').TouchSpin({
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
        // Number : Number Controls Same Sides: Max Quantity
        $('#elmaxQuantityPerOrderNumber').TouchSpin({
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
        // Number : Number Controls Same Sides: Discount Volume
        $('#esdDiscountVol').TouchSpin({
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
        // Number : Number Controls Same Sides: Discount Percent
        $('#esdDiscountPercent').TouchSpin({
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
        // Number : Number Controls Same Sides: Available Stock
        $('#esAvailableStock').TouchSpin({
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
        
          //Repeat Multiple : Discount Array
        const esDiscount = KTUtil.getById('esDiscount'); // Form Repeat #2 : Multiple 
        
        $('#esDiscount').repeater({
        initEmpty: false,

        defaultValues: {
            'text-input': 'foo'
        },

        show: function () {
            $(this).slideDown();
        },

        hide: function (deleteElement) {
            $(this).slideUp(deleteElement);
        }
        });
      
      
          //Repeat Multiple : Tax Array
          const esTax = KTUtil.getById('esTax'); // Form Repeat #2 : Multiple 
        
          $('#esTax').repeater({
          initEmpty: false,
  
          defaultValues: {
              'text-input': 'foo'
          },
  
          show: function () {
              $(this).slideDown();
          },
  
          hide: function (deleteElement) {
              $(this).slideUp(deleteElement);
          }
          });
        
        
          if(!createEcommerceStockForm) {
              return;   
          }

        FormValidation.formValidation(createEcommerceStockForm, {
            fields: {
                esProductId: {
                    validators: {
                        notEmpty: {
                            message: 'Product ID is required',
                            },
                        },
                    }, 
                esType: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                            },
                        },
                    },           
                esUnitPrice: {
                    validators: {
                        notEmpty: {
                            message: 'Price is required',
                            },
                        },
                    }, 
                esAvailableStock: {
                    validators: {
                        notEmpty: {
                            message: 'This field is required',
                            },
                        },
                    }, 
                esName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                            },
                        },
                    }, 
                esDescription: {
                    validators: {
                        notEmpty: {
                            message: 'Description is required',
                            },
                        },
                    }, 
                esNotes: {
                    validators: {
                        notEmpty: {
                            message: 'Notes are required',
                        },
                    },
                },  
                esLocationId : {
                        validators: {
                            notEmpty: {
                            message: 'Location ID is required',
                            },
                        },
                    },       
                esStatus: {
                    validators: {
                        notEmpty: {
                            message: 'Status is required',
                        },
                    },
                },
                esMaxQuantityPerOrder: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                        },
                    },
                },  
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
            createEcommerceStockFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        }).on('core.form.valid', function () {
            KTUtil.btnWait(createEcommerceStockFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
            
    
            // Accessing Restful API
        
            axios({
            method: 'Post',
            url: `${HOST_URL}/api/v1/ecommerce/stock`,
                data: {
                    _productId: esProductId.value,
                    type: esType.value,
                    unitPrice: esUnitPrice.value,
                    availableStock: esAvailableStock.value,
                    name: esName.value,
                    description: esDescription.value,
                    notes: esNotes.value,                    
                    _locationId: esLocationId.value,
                    status: esStatus.value,
                    maxQuantityPerOrderNumber: elmaxQuantityPerOrderNumber.value,

                    discount:[ {
                        discountVol:esdDiscountVol.value,
                        discountPercent:esdDiscountPercent.value,
                        name:esdName.value,
                        description:esdDescription.value,
                    }],

                    tax:[{
                        CGST:estCGST.value,
                        SGST:estSGST.value,
                        IGST:estIGST.value,
                    }]

            },
            }).then(function (res) {
            KTUtil.btnRelease(createEcommerceStockFormSubmitButton);
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
            _createEcommerceStock();
        }
        }
    })();
    
    
    jQuery(document).ready(function () {
        EcommerceStockCRUD.init();
    });
    