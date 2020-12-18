/* eslint-disable */
'use strict';

// Class definition
const PerformaInvoiceCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';
    // Private functions
    const _createPerformaPaymentForm = function () {

        // Getting Document related information
        const createPerformaPaymentForm = KTUtil.getById('createPerformaPaymentForm');
        const piPayFormSubmitButton = KTUtil.getById('piPayFormSubmitButton');
        const piPaymentType = KTUtil.getById('piPaymentType');
        const plPayAccNo = KTUtil.getById('plPayAccNo');
        const piPayBankName = KTUtil.getById('piPayBankName');
        const piAccBankIFSC = KTUtil.getById('piAccBankIFSC');

    // Dropdown List : Single Select1 With Search
    $('piPayBankName').selectpicker({
    });
    // Dropdown List : Single Select1 With Search
    $('piPaymentType').selectpicker({
    });


        if (!createPerformaPaymentForm) {
            return;
        }

        FormValidation.formValidation(createPerformaPaymentForm, {
            fields: {
                piPaymentType: {
                    validators: {
                        notEmpty: {
                            message: 'Payment Type is required',
                        },
                    },
                },
                plPayAccNo: {
                    validators: {
                        notEmpty: {
                            message: 'Account No is required',
                        },
                    },
                },
                piPayBankName: {
                    validators: {
                        notEmpty: {
                            message: 'Bank Name is required',
                        },
                    },
                },
                piAccBankIFSC: {
                    validators: {
                        notEmpty: {
                            message: 'Bank IFSC is required',
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
                piPayFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                KTUtil.btnWait(piPayFormSubmitButton, _buttonSpinnerClasses, 'Please wait');


                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/sales-finance/performa-invoice`,
                    data: {
                        type: piPaymentType.value,
                        accountNo: plPayAccNo.value,
                        bankName: piPayBankName.value,
                        bankIFSC: piAccBankIFSC.value,
                    },
                }).then(function (res) {
                    KTUtil.btnRelease(piPayFormSubmitButton);
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
                        "timeOut": "3000",
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
    const _createPerformaItemForm = function (){
        // Getting Document related information
        const createPerformaItemForm = KTUtil.getById('createPerformaItemForm');
        const piItemFormSubmitButton = KTUtil.getById('piItemFormSubmitButton');
        const piItemCode = KTUtil.getById('piItemCode');
        const piSerialNo = KTUtil.getById('piSerialNo');
        const piName = KTUtil.getById('piName');
        const piQuantity = KTUtil.getById('piQuantity');
        const piItemUnits = KTUtil.getById('piItemUnits');
        const piUnitPrice = KTUtil.getById('piUnitPrice');
        const piDiscount = KTUtil.getById('piDiscount');
        const piDiscountRate = KTUtil.getById('piDiscountRate');
        const piTaxValue = KTUtil.getById('piTaxValue');
        const piCGSTRate = KTUtil.getById('piCGSTRate');
        const piCGSTAmt = KTUtil.getById('piCGSTAmt');
        const piSGSTRate = KTUtil.getById('piSGSTRate');
        const piSGSTAmt = KTUtil.getById('piSGSTAmt');
        const piIGSTRate = KTUtil.getById('piIGSTRate');
        const piIGSTAmt = KTUtil.getById('piIGSTAmt');
        const piTotalPrice = KTUtil.getById('piTotalPrice');

        // Dropdown List : Single Select1 With Search
        $('piItemUnits').selectpicker({
        });

        // Number : Number Controls Same Sides: Quantity
        $('#piQuantity').TouchSpin({
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
        // Number : Number Controls Same Sides: Discount
        $('#piDiscount').TouchSpin({
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
        // Number : Number Controls Same Sides: CGST Rate
        $('#piCGSTRate').TouchSpin({
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
            prefix: '%'
          });  
        // Number : Number Controls Same Sides: CGST Amount
        $('#piCGSTAmt').TouchSpin({
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
        // Number : Number Controls Same Sides: SGST Rate
        $('#piSGSTRate').TouchSpin({
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
            prefix: '%'
          });  
        // Number : Number Controls Same Sides: SGST Amount
        $('#piSGSTAmt').TouchSpin({
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
        // Number : Number Controls Same Sides: Discount Rate
        $('#piDiscountRate').TouchSpin({
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
            prefix: '%'
          });  
        // Number : Number Controls Same Sides: Tax Value
        $('#piTaxValue').TouchSpin({
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
        // Number : Number Controls Same Sides: IGST Rate
        $('#piIGSTRate').TouchSpin({
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
            prefix: '%'
          });  
        // Number : Number Controls Same Sides: IGST Amount
        $('#piIGSTAmt').TouchSpin({
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
        // Number : Number Controls Same Sides: Unit Price
        $('#piUnitPrice').TouchSpin({
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

       
      

        if (!createPerformaItemForm) {
            return;
        }

        FormValidation.formValidation(createPerformaItemForm, {
            fields: {
                piItemCode: {
                     validators: {
                         notEmpty: {
                             message: 'Packing List No  is required',
                         },
                     },
                 },
                 piSerialNo: {
                    validators: {
                        notEmpty: {
                            message: 'Packing List No  is required',
                        },
                    },
                },
                 piName: {
                     validators: {
                         notEmpty: {
                             message: 'Tax Invoice No is required',
                         },
                     },
                 },
                 piQuantity: {
                     validators: {
                         notEmpty: {
                             message: 'Source is required',
                         },
                     },
                 },
                 piItemUnits: {
                     validators: {
                         notEmpty: {
                             message: 'Email is required',
                         },
                     },
                 },
                 piUnitPrice: {
                    validators: {
                        notEmpty: {
                            message: 'Email is required',
                        },
                    },
                },
                 piDiscount: {
                     validators: {
                         notEmpty: {
                             message: 'Source Address is required',
                         },
                     },
                 },
                 piDiscountRate: {
                     validators: {
                         notEmpty: {
                             message: 'Source Contact is required',
                         },
                     },
                 },
                 piTaxValue: {
                     validators: {
                         notEmpty: {
                             message: 'Source GST is required',
                         },
                     },
                 },
                 piCGSTRate: {
                     validators: {
                         notEmpty: {
                             message: 'Cosignee is required',
                         },
                     },
                 },
                 piCGSTAmt: {
                     validators: {
                         notEmpty: {
                             message: 'Address is required',
                         },
                     },
                 },
                 piSGSTRate: {
                     validators: {
                         notEmpty: {
                             message: 'Email is required',
                         },
                     },
                 },
                 piSGSTAmt: {
                     validators: {
                         notEmpty: {
                             message: ' Contact is required',
                         },
                     },
                 },
                 piIGSTRate: {
                     validators: {
                         notEmpty: {
                             message: 'Cosignee GST is required',
                         },
                     },
                 },
                 piIGSTAmt: {
                    validators: {
                        notEmpty: {
                            message: ' Contact is required',
                        },
                    },
                },
                piTotalPrice: {
                    validators: {
                        notEmpty: {
                            message: 'Cosignee GST is required',
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
                piItemFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                KTUtil.btnWait(piItemFormSubmitButton, _buttonSpinnerClasses, 'Please wait');


                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/sales-finance/performa-invoice`,
                    data: {
                        serialNo: piSerialNo.value,
                        itemCode: piItemCode.value,
                        name: piName.value,
                        quantity: (piQuantity.value) * 1,
                        unitofMeasurement: piItemUnits.value,
                        unitPrice: (piUnitPrice.value) * 1,
                        dicount: (piDiscount.value) * 1,
                        discountRate: (piDiscountRate.value) * 1,
                        taxableValue: (piTaxValue.value) * 1,
                        CGSTRate: (piCGSTRate.value) * 1,
                        CGSTAmount: (piCGSTAmt.value) * 1,
                        SGSTRate: (piSGSTRate.value) * 1,
                        SGSTAmount: (piSGSTAmt.value) * 1,
                        IGSTRate: (piIGSTRate.value) * 1,
                        IGSTAmount: (piIGSTAmt.value) * 1,
                        totalPrice: (piTotalPrice.value) * 1,

                    },
                }).then(function (res) {
                    KTUtil.btnRelease(piItemFormSubmitButton);
                    console.log(res)
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
                        "timeOut": "3000",
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

    }
    return {
        // public functions
        init: function () {
            _createPerformaPaymentForm();
            _createPerformaItemForm();

        },
    };
})();


jQuery(document).ready(function () {
    PerformaInvoiceCRUD.init();
});
