/* eslint-disable */
'use strict';

// Class definition
const EcommerceOrderCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    const _createEcommerceOrder = function () {
        // Getting Document related information
        const createEcommerceOrderForm = KTUtil.getById('createEcommerceOrderForm');           
        const eoFormSubmitButton = KTUtil.getById('eoFormSubmitButton');
        const epManufactureNo = KTUtil.getById('epManufactureNo');
        const epName = KTUtil.getById('epName');
        const epDescription = KTUtil.getById('epDescription');
        const epID = KTUtil.getById('epID');
        const epUnitPrice = KTUtil.getById('epUnitPrice');
        const epMRP = KTUtil.getById('epMRP');
        const epNote = KTUtil.getById('epNote');
        const epRanking = KTUtil.getById('epRanking');
        const epMaxQtyNo = KTUtil.getById('epMaxQtyNo');

        const epSellerID = KTUtil.getById('epSellerID');
        const epReviewID = KTUtil.getById('epReviewID');
        const epStatus = KTUtil.getById('epStatus');
        const epHSN = KTUtil.getById('epHSN');

        // Number : Number Controls Same Sides: Unit Price
        $('#epUnitPrice').TouchSpin({
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
        $('#epMaxQtyNo').TouchSpin({
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
          if(!createEcommerceOrderForm) {
            return;   
        }

      FormValidation.formValidation(createEcommerceOrderForm, {
          fields: {
                    epManufactureNo: {
                        validators: {
                            notEmpty: {
                                message: 'Product ID is required',
                                },
                            },
                    }, 
                    epName: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                            },
                        },
                    },           
                    epDescription: {
                    validators: {
                        notEmpty: {
                            message: 'Price is required',
                            },
                        },
                    }, 
                    epID: {
                    validators: {
                        notEmpty: {
                            message: 'This field is required',
                            },
                        },
                    }, 

                    epMRP: {
                    validators: {
                        notEmpty: {
                            message: 'Description is required',
                            },
                        },
                    }, 
                    epNote: {
                    validators: {
                        notEmpty: {
                            message: 'Notes are required',
                        },
                    },
                    },  
                    epRanking : {
                    validators: {
                        notEmpty: {
                            message: 'Location ID is required',
                        },
                    },
                    },       
                    epSellerID: {
                    validators: {
                        notEmpty: {
                          message: 'Status is required',
                        },
                    },
                    },
                epReviewID: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                        },
                    },
                    },  
              epStatus: {
                  validators: {
                      notEmpty: {
                          message: 'This field is required',
                      },
                  },
                    },        

              epHSN: {
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
        eoFormSubmitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
    }).on('core.form.valid', function () {
        KTUtil.btnWait(eoFormSubmitButton, _buttonSpinnerClasses, 'Please wait');

        axios({
            method: 'Post',
            url: `${HOST_URL}/api/v1/ecommerce/order`,
                data: {
                    manufacturerPartNo: epManufactureNo.value,
                    name: epName.value,
                    description: epDescription.value,
                    categoryId: epID.value,
                    unitPrice: (epUnitPrice.value)*1,
                    MRP: (epMRP.value)*1,
                    note: epNote.value,
                    ranking: (epRanking.value)*1,
                    maxQuantityPerOrderNumber: (epMaxQtyNo.value)*1,
                    sellerId: epSellerID.value,
                    _reviewAttributeId: epReviewID.value,
                    status: epStatus.value,
                    HSNCode: epHSN.value,
                },
            }).then(function (res) {
            KTUtil.btnRelease(epFormSubmitButton);
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
                               
                    