/* eslint-disable */
'use strict';

// Class definition
const PerformaInvoiceCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    // Date Picker
    let arrows;
    if (KTUtil.isRTL()) {
        arrows = {
            leftArrow: '<i class="la la-angle-right"></i>',
            rightArrow: '<i class="la la-angle-left"></i>',
        };
    } else {
        arrows = {
            leftArrow: '<i class="la la-angle-left"></i>',
            rightArrow: '<i class="la la-angle-right"></i>',
        };
    }

    // Private functions
    const _createPerformaInvoiceForm  = function (){
            // Getting Document related information
            const createPerformaInvoiceForm = KTUtil.getById('createPerformaInvoiceForm');
            const piFormSubmitButton = KTUtil.getById('piFormSubmitButton');
            const piNo = KTUtil.getById('piNo');
            const piModuleRef = KTUtil.getById('piModuleRef');
            const piHeader = KTUtil.getById('piHeader');
            const piDate = KTUtil.getById('piDate');
            const piOrderID = KTUtil.getById('piOrderID');
            const piOrderDate = KTUtil.getById('piOrderDate');
            const piBuyerID = KTUtil.getById('piBuyerID');
            const piBillingName = KTUtil.getById('piBillingName');
            const piBillingAddress = KTUtil.getById('piBillingAddress');
            const piBillingEmail = KTUtil.getById('piBillingEmail');
            const piBillingContact = KTUtil.getById('piBillingContact');
            const piCosigneeName = KTUtil.getById('piCosigneeName');
            const piCosigneeAddress = KTUtil.getById('piCosigneeAddress');
            const piCosigneeContact = KTUtil.getById('piCosigneeContact');
            const piSellerID = KTUtil.getById('piSellerID');
            const piSellerName = KTUtil.getById('piSellerName');
            const piSellerAddress = KTUtil.getById('piSellerAddress');
            const piSellerContact = KTUtil.getById('piSellerContact');
            const piAccNo = KTUtil.getById('piAccNo');
            const piBankName = KTUtil.getById('piBankName');
            const piBankIFSC = KTUtil.getById('piBankIFSC');
            const pibeforeTax = KTUtil.getById('pibeforeTax');
            const piSellerGST = KTUtil.getById('piSellerGST');
            const piCGSTTotal = KTUtil.getById('piCGSTTotal');
            const piSGSTTotal = KTUtil.getById('piSGSTTotal');
            const piIGSTTotal = KTUtil.getById('piIGSTTotal');
            const piGrandTotal = KTUtil.getById('piGrandTotal');
            const piTermsCondition = KTUtil.getById('piTermsCondition');
            const piFooter = KTUtil.getById('piFooter');
            const piMeta = KTUtil.getById('piMeta');
            const piSource = KTUtil.getById('piSource');

        // Dropdown List : Single Select1 With Search
        $('piBankName').selectpicker({
        });


        // intialising
        $(piDate).datepicker({
            placeholder: "Select Date"
        });
        $(piOrderDate).datepicker({
            placeholder: "Select Date"
        });

            if (!createPerformaInvoiceForm) {
                return;
            }
    
            FormValidation.formValidation(createPerformaInvoiceForm, {
                piNo: {
                    piItemCode: {
                        validators: {
                            notEmpty: {
                                message: 'Item Code  is required',
                            },
                        },
                    },
                    piModuleRef: {
                        validators: {
                            notEmpty: {
                                message: 'Serial No  is required',
                            },
                        },
                    },
                    piDate: {
                        validators: {
                            notEmpty: {
                                message: 'Name is required',
                            },
                        },
                    },
                    piOrderID: {
                        validators: {
                            notEmpty: {
                                message: 'Quantity is required',
                            },
                        },
                    },
                    piOrderDate: {
                        validators: {
                            notEmpty: {
                                message: 'Units is required',
                            },
                        },
                    },
                    piBuyerID: {
                        validators: {
                            notEmpty: {
                                message: 'Unit Price is required',
                            },
                        },
                    },
                    piBillingName: {
                        validators: {
                            notEmpty: {
                                message: 'Discount is required',
                            },
                        },
                    },
                    piBillingAddress: {
                        validators: {
                            notEmpty: {
                                message: 'Discount Rate is required',
                            },
                        },
                    },
                    piBillingContact: {
                        validators: {
                            notEmpty: {
                                message: 'Tax Value is required',
                            },
                        },
                    },
                    piCosigneeName: {
                        validators: {
                            notEmpty: {
                                message: 'CGST Rate is required',
                            },
                        },
                    },
                    piCosigneeAddress: {
                        validators: {
                            notEmpty: {
                                message: 'CGST Amount is required',
                            },
                        },
                    },
                    piCosigneeContact: {
                        validators: {
                            notEmpty: {
                                message: 'SGST Rate is required',
                            },
                        },
                    },
                    piSellerID: {
                        validators: {
                            notEmpty: {
                                message: 'SGST Amount is required',
                            },
                        },
                    },
                    piSellerName: {
                        validators: {
                            notEmpty: {
                                message: 'IGST Rate is required',
                            },
                        },
                    },
                    piSellerAddress: {
                        validators: {
                            notEmpty: {
                                message: 'IGST Amount is required',
                            },
                        },
                    },
                    piSellerContact: {
                        validators: {
                            notEmpty: {
                                message: 'Total Price is required',
                            },
                        },
                    },
                    piAccNo: {
                        validators: {
                            notEmpty: {
                                message: 'Item Code  is required',
                            },
                        },
                    },
                    piBankName: {
                        validators: {
                            notEmpty: {
                                message: 'Serial No  is required',
                            },
                        },
                    },
                    piBankIFSC: {
                        validators: {
                            notEmpty: {
                                message: 'Name is required',
                            },
                        },
                    },
                    piOrderID: {
                        validators: {
                            notEmpty: {
                                message: 'Quantity is required',
                            },
                        },
                    },
                    pibeforeTax: {
                        validators: {
                            notEmpty: {
                                message: 'Units is required',
                            },
                        },
                    },
                    piSellerGST: {
                        validators: {
                            notEmpty: {
                                message: 'Unit Price is required',
                            },
                        },
                    },
                    piCGSTTotal: {
                        validators: {
                            notEmpty: {
                                message: 'Discount is required',
                            },
                        },
                    },
                    piSGSTTotal: {
                        validators: {
                            notEmpty: {
                                message: 'Discount Rate is required',
                            },
                        },
                    },
                    piIGSTTotal: {
                        validators: {
                            notEmpty: {
                                message: 'Tax Value is required',
                            },
                        },
                    },
                    piTermsCondition: {
                        validators: {
                            notEmpty: {
                                message: 'CGST Rate is required',
                            },
                        },
                    },
                    piFooter: {
                        validators: {
                            notEmpty: {
                                message: 'CGST Amount is required',
                            },
                        },
                    },
                    piMeta: {
                        validators: {
                            notEmpty: {
                                message: 'SGST Rate is required',
                            },
                        },
                    },
                    piSource: {
                        validators: {
                            notEmpty: {
                                message: 'SGST Rate is required',
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
                    piFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                    // Submit the form when all fields are valid
                    //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
                },
            })
                .on('core.form.valid', function () {
                    KTUtil.btnWait(piFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
    
    
                    // Accessing Restful API
                    axios({
                        method: 'post',
                        url: `${HOST_URL}/api/v1/sales-finance/performa-invoice`,
                        data: {
                            performaInvoiceNo: piNo.value,
                            moduleReferance: piModuleRef.value,
                            header: piHeader.value,
                            date: piDate.value,
                            // _orderId: piOrderID.value,
                            orderDate:piOrderDate.value,
                            // _buyerId: piBuyerID.value,
                            billingName: piBillingName.value,
                            // billingAddress: piBillingAddress.value,
                            billingEmail: piBillingEmail.value,
                            billingContactNumber: piBillingContact.value,
                            consigneeName: piCosigneeName.value,
                            // consigneeAddress: piCosigneeAddress.value,
                            consigneeContactNumber: piCosigneeContact.value,
                            // _sellerId: piSellerID.value,
                            sellerName: piSellerName.value,
                            // sellerAddress: piSellerAddress.value,
                            sellerContactNumber: piSellerContact.value,
                            sellerBankDetails: {
                                accountNo: piAccNo.value,
                                bankName: piBankName.value,
                                bankIFSC: piBankIFSC.value,
                              },       
                            sellerGSTIN: pibeforeTax.value,
                            totalBeforeTax: (piSellerGST.value)*1,
                            CGSTTotal: (piCGSTTotal.value)*1,
                            SGSTTotal: (piSGSTTotal.value)*1,
                            IGSTTotal: (piIGSTTotal.value)*1,
                            grandTotal: (piGrandTotal.value)*1,
                            // termsAndConditions: piTermsCondition.value,
                            footer: piFooter.value,
                            // meta: piMeta.value,
                            source: piSource.value,
    
                        },
                    }).then(function (res) {
                        KTUtil.btnRelease(piFormSubmitButton);
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
    const _createPerformaItemForm = function () {
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
                            message: 'Item Code  is required',
                        },
                    },
                },
                piSerialNo: {
                    validators: {
                        notEmpty: {
                            message: 'Serial No  is required',
                        },
                    },
                },
                piName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                        },
                    },
                },
                piQuantity: {
                    validators: {
                        notEmpty: {
                            message: 'Quantity is required',
                        },
                    },
                },
                piItemUnits: {
                    validators: {
                        notEmpty: {
                            message: 'Units is required',
                        },
                    },
                },
                piUnitPrice: {
                    validators: {
                        notEmpty: {
                            message: 'Unit Price is required',
                        },
                    },
                },
                piDiscount: {
                    validators: {
                        notEmpty: {
                            message: 'Discount is required',
                        },
                    },
                },
                piDiscountRate: {
                    validators: {
                        notEmpty: {
                            message: 'Discount Rate is required',
                        },
                    },
                },
                piTaxValue: {
                    validators: {
                        notEmpty: {
                            message: 'Tax Value is required',
                        },
                    },
                },
                piCGSTRate: {
                    validators: {
                        notEmpty: {
                            message: 'CGST Rate is required',
                        },
                    },
                },
                piCGSTAmt: {
                    validators: {
                        notEmpty: {
                            message: 'CGST Amount is required',
                        },
                    },
                },
                piSGSTRate: {
                    validators: {
                        notEmpty: {
                            message: 'SGST Rate is required',
                        },
                    },
                },
                piSGSTAmt: {
                    validators: {
                        notEmpty: {
                            message: 'SGST Amount is required',
                        },
                    },
                },
                piIGSTRate: {
                    validators: {
                        notEmpty: {
                            message: 'IGST Rate is required',
                        },
                    },
                },
                piIGSTAmt: {
                    validators: {
                        notEmpty: {
                            message: 'IGST Amount is required',
                        },
                    },
                },
                piTotalPrice: {
                    validators: {
                        notEmpty: {
                            message: 'Total Price is required',
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
            _createPerformaInvoiceForm();
            _createPerformaPaymentForm();
            _createPerformaItemForm();

        },
    };
})();


jQuery(document).ready(function () {
    PerformaInvoiceCRUD.init();
});
