/* eslint-disable */
'use strict';

// Class definition
const SalesFinanceCRUD = (function () {
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
    const _createAddressForm = function () {

        // Getting Document related information
        const createAddressForm = KTUtil.getById('createAddressForm');
        const adFormSubmitButton = KTUtil.getById('adFormSubmitButton');
        const adAddress = KTUtil.getById('adAddress');
        const adCity = KTUtil.getById('adCity');
        const adState = KTUtil.getById('adState');
        const adCountry = KTUtil.getById('adCountry');
        const adPincode = KTUtil.getById('adPincode');

        if (!createAddressForm) {
            return;
        }

        FormValidation.formValidation(createAddressForm, {
            fields: {
                adAddress: {
                    validators: {
                        notEmpty: {
                            message: 'Newsletter ID is required',
                        },
                    },
                },
                adCity: {
                    validators: {
                        notEmpty: {
                            message: 'Subject is required',
                        },
                    },
                },
                adState: {
                    validators: {
                        notEmpty: {
                            message: 'Recipient Email is required',
                        },
                    },
                },
                adCountry: {
                    validators: {
                        notEmpty: {
                            message: 'Recipient Email is required',
                        },
                    },
                },
                adPincode: {
                    validators: {
                        notEmpty: {
                            message: 'Recipient Email is required',
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
                adFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                KTUtil.btnWait(adFormSubmitButton, _buttonSpinnerClasses, 'Please wait');


                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/sales-finance/address`,
                    data: {
                        address: adAddress.value,
                        city: adCity.value,
                        state: adState.value,
                        country: adCountry.value,
                        pinCode: (adPincode.value) * 1
                    },
                }).then(function (res) {
                    KTUtil.btnRelease(adFormSubmitButton);
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

    const _createDeliveryNoteForm = function () {
        // Getting Document related information
        const createDeliveryNoteForm = KTUtil.getById('createDeliveryNoteForm');
        const dnFormSubmitButton = KTUtil.getById('dnFormSubmitButton');
        const dnPackingListNo = KTUtil.getById('dnPackingListNo');
        const dnTaxInvoiceNo = KTUtil.getById('dnTaxInvoiceNo');
        const dnSource = KTUtil.getById('dnSource');
        const dnSourceAddress = KTUtil.getById('dnSourceAddress');
        const dnSourceContact = KTUtil.getById('dnSourceContact');
        const dnSourceGST = KTUtil.getById('dnSourceGST');
        const dnCosignee = KTUtil.getById('dnCosignee');
        const dnCosigneeAddress = KTUtil.getById('dnCosigneeAddress');
        const dnCosigneeEmail = KTUtil.getById('dnCosigneeEmail');
        const dnCosigneeContact = KTUtil.getById('dnCosigneeContact');
        const dnCosigneeGST = KTUtil.getById('dnCosigneeGST');
        const dnBox = KTUtil.getById('dnBox');
        const dnShipMethod = KTUtil.getById('dnShipMethod');
        const dnCarrierName = KTUtil.getById('dnCarrierName');
        const dnTrackingNo = KTUtil.getById('dnTrackingNo');
        const dnShippingNotes = KTUtil.getById('dnShippingNotes');
        const dnReceivedBy = KTUtil.getById('dnReceivedBy');
        const dnFileProof = KTUtil.getById('dnFileProof');

        if (!createDeliveryNoteForm) {
            return;
        }

        FormValidation.formValidation(createDeliveryNoteForm, {
            fields: {
                dnPackingListNo: {
                    validators: {
                        notEmpty: {
                            message: 'Packing List No  is required',
                        },
                    },
                },
                dnTaxInvoiceNo: {
                    validators: {
                        notEmpty: {
                            message: 'Tax Invoice No is required',
                        },
                    },
                },
                dnSource: {
                    validators: {
                        notEmpty: {
                            message: 'Source is required',
                        },
                    },
                },
                dnSourceAddress: {
                    validators: {
                        notEmpty: {
                            message: 'Source Address is required',
                        },
                    },
                },
                dnSourceContact: {
                    validators: {
                        notEmpty: {
                            message: 'Source Contact is required',
                        },
                    },
                },
                dnSourceGST: {
                    validators: {
                        notEmpty: {
                            message: 'Source GST is required',
                        },
                    },
                },
                dnCosignee: {
                    validators: {
                        notEmpty: {
                            message: 'Cosignee is required',
                        },
                    },
                },
                dnCosigneeAddress: {
                    validators: {
                        notEmpty: {
                            message: 'Address is required',
                        },
                    },
                },
                dnCosigneeEmail: {
                    validators: {
                        notEmpty: {
                            message: 'Email is required',
                        },
                    },
                },
                dnCosigneeContact: {
                    validators: {
                        notEmpty: {
                            message: ' Contact is required',
                        },
                    },
                },
                dnCosigneeGST: {
                    validators: {
                        notEmpty: {
                            message: 'Cosignee GST is required',
                        },
                    },
                },
                dnBox: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                        },
                    },
                },
                dnShipMethod: {
                    validators: {
                        notEmpty: {
                            message: 'Ship Method is required',
                        },
                    },
                },
                dnCarrierName: {
                    validators: {
                        notEmpty: {
                            message: 'Carrier Name is required',
                        },
                    },
                },
                dnTrackingNo: {
                    validators: {
                        notEmpty: {
                            message: 'Tracking No is required',
                        },
                    },
                },
                dnShippingNotes: {
                    validators: {
                        notEmpty: {
                            message: 'Notes is required',
                        },
                    },
                },
                dnReceivedBy: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                        },
                    },
                },
                dnFileProof: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
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
                dnFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                KTUtil.btnWait(dnFormSubmitButton, _buttonSpinnerClasses, 'Please wait');


                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/sales-finance/delivery-note`,
                    data: {
                        packingListnumber: (dnPackingListNo.value) * 1,
                        taxInvoiceNumber: (dnTaxInvoiceNo.value) * 1,
                        source: dnSource.value,
                        sourceAddress: dnSourceAddress.value,
                        sourceContactNumber: dnSourceContact.value,
                        sourceGstin: dnSourceGST.value,
                        consignee: dnCosignee.value,
                        consigneeAddress: dnCosigneeAddress.value,
                        consigneeEmail: dnCosigneeEmail.value,
                        consigneeContactNumber: dnCosigneeContact.value,
                        consigneeGstin: dnCosigneeGST.value,
                        box: dnBox.value,
                        shipMethod: dnShipMethod.value,
                        carrierName: dnCarrierName.value,
                        carrierTrackingNumber: dnTrackingNo.value,
                        shippingNotes: dnShippingNotes.value,
                        receivedBy: dnReceivedBy.value,
                        fileProof: dnFileProof.value
                    },
                }).then(function (res) {
                    KTUtil.btnRelease(dnFormSubmitButton);
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
    };
    const _createPackingListForm = function () {
        // Getting Document related information
        const createPackingListForm = KTUtil.getById('createPackingListForm ');
        const plFormSubmitButton = KTUtil.getById('plFormSubmitButton');
        const plPackingListNo = KTUtil.getById('plPackingListNo');
        const plTaxInvoiceNo = KTUtil.getById('plTaxInvoiceNo');
        const plSource = KTUtil.getById('plSource');
        const plSourceEmail = KTUtil.getById('plSourceEmail');
        const plSourceAddress = KTUtil.getById('plSourceAddress');
        const plSourceContact = KTUtil.getById('plSourceContact');
        const plSourceGST = KTUtil.getById('plSourceGST');
        const plCosignee = KTUtil.getById('plCosignee');
        const plCosigneeAddress = KTUtil.getById('plCosigneeAddress');
        const plCosigneeEmail = KTUtil.getById('plCosigneeEmail');
        const plCosigneeContact = KTUtil.getById('plCosigneeContact');
        const plCosigneeGST = KTUtil.getById('plCosigneeGST');
        const plBoxNo = KTUtil.getById('plBoxNo');
        const plBoxDimlength = KTUtil.getById('plBoxDimlength');
        const plBoxDimBreadth = KTUtil.getById('plBoxDimBreadth');
        const plBoxDimWidth = KTUtil.getById('plBoxDimWidth');
        const plBoxDimUnits = KTUtil.getById('plBoxDimUnits');
        const plBoxWeight = KTUtil.getById('plBoxWeight');
        const plBoxWeightUnits = KTUtil.getById('plBoxWeightUnits');
        const plSerialNo = KTUtil.getById('plSerialNo');
        const plItemCode = KTUtil.getById('plItemCode');
        const plName = KTUtil.getById('plName');
        const plQuantity = KTUtil.getById('plQuantity');
        const plItemUnits = KTUtil.getById('plItemUnits');
        const plboxMeta = KTUtil.getById('plboxMeta');
        const plShipMethod = KTUtil.getById('plShipMethod');
        const plCarrierName = KTUtil.getById('plCarrierName');
        const plTrackingNo = KTUtil.getById('plTrackingNo');
        const plShippingNotes = KTUtil.getById('plShippingNotes');
        const plFileProof = KTUtil.getById('plFileProof');

        // Form Repeat #3 : Multiple
        $('#plBoxRepeat').repeater({
            initEmpty: false,

            defaultValues: {
                'text-input': 'foo'
            },

            show: function () {
                $(this).slideDown();
            },

            hide: function (deleteElement) {
                if (confirm('Are you sure you want to delete this element?')) {
                    $(this).slideUp(deleteElement);
                }
            }
        });
        // Form Repeat #3 : Multiple
        $('#plBoxItem').repeater({
            initEmpty: false,

            defaultValues: {
                'text-input': 'foo'
            },

            show: function () {
                $(this).slideDown();
            },

            hide: function (deleteElement) {
                if (confirm('Are you sure you want to delete this element?')) {
                    $(this).slideUp(deleteElement);
                }
            }
        });



        if (!createPackingListForm) {
            return;
        }

        FormValidation.formValidation(createPackingListForm, {
            fields: {
                // plPackingListNo: {
                //     validators: {
                //         notEmpty: {
                //             message: 'Packing List No  is required',
                //         },
                //     },
                // },
                // plTaxInvoiceNo: {
                //     validators: {
                //         notEmpty: {
                //             message: 'Tax Invoice No is required',
                //         },
                //     },
                // },
                // plSource: {
                //     validators: {
                //         notEmpty: {
                //             message: 'Source is required',
                //         },
                //     },
                // },
                // plSourceEmail: {
                //     validators: {
                //         notEmpty: {
                //             message: 'Email is required',
                //         },
                //     },
                // },

                // plSourceAddress: {
                //     validators: {
                //         notEmpty: {
                //             message: 'Source Address is required',
                //         },
                //     },
                // },
                // plSourceContact: {
                //     validators: {
                //         notEmpty: {
                //             message: 'Source Contact is required',
                //         },
                //     },
                // },
                // plSourceGST: {
                //     validators: {
                //         notEmpty: {
                //             message: 'Source GST is required',
                //         },
                //     },
                // },
                // plCosignee: {
                //     validators: {
                //         notEmpty: {
                //             message: 'Cosignee is required',
                //         },
                //     },
                // },
                // plCosigneeAddress: {
                //     validators: {
                //         notEmpty: {
                //             message: 'Address is required',
                //         },
                //     },
                // },
                // plCosigneeEmail: {
                //     validators: {
                //         notEmpty: {
                //             message: 'Email is required',
                //         },
                //     },
                // },
                // plCosigneeContact: {
                //     validators: {
                //         notEmpty: {
                //             message: ' Contact is required',
                //         },
                //     },
                // },
                // plCosigneeGST: {
                //     validators: {
                //         notEmpty: {
                //             message: 'Cosignee GST is required',
                //         },
                //     },
                // },
                /*                 plBoxNo: {
                                    validators: {
                                        notEmpty: {
                                            message: 'Box No is required',
                                        },
                                    },
                                },
                                plBoxDimlength: {
                                    validators: {
                                        notEmpty: {
                                            message: 'Length is required',
                                        },
                                    },
                                },
                                plBoxDimBreadth: {
                                    validators: {
                                        notEmpty: {
                                            message: 'Breadth is required',
                                        },
                                    },
                                },
                                plBoxDimWidth: {
                                    validators: {
                                        notEmpty: {
                                            message: 'Width is required',
                                        },
                                    },
                                },
                                plBoxDimUnits: {
                                    validators: {
                                        notEmpty: {
                                            message: 'Units is required',
                                        },
                                    },
                                },
                                plBoxWeight: {
                                    validators: {
                                        notEmpty: {
                                            message: 'Weight is required',
                                        },
                                    },
                                },
                                plBoxWeightUnits: {
                                    validators: {
                                        notEmpty: {
                                            message: 'Units is required',
                                        },
                                    },
                                },
                                plSerialNo: {
                                    validators: {
                                        notEmpty: {
                                            message: 'Serial No is required',
                                        },
                                    },
                                },
                                plItemCode: {
                                    validators: {
                                        notEmpty: {
                                            message: 'Item code is required',
                                        },
                                    },
                                },
                                plName: {
                                    validators: {
                                        notEmpty: {
                                            message: 'Name is required',
                                        },
                                    },
                                },
                                plQuantity: {
                                    validators: {
                                        notEmpty: {
                                            message: 'Quantity is required',
                                        },
                                    },
                                },
                                plItemUnits: {
                                    validators: {
                                        notEmpty: {
                                            message: 'Units is required',
                                        },
                                    },
                                },
                                plboxMeta: {
                                    validators: {
                                        notEmpty: {
                                            message: 'Box Meta is required',
                                        },
                                    },
                                },
                 */
                //     plShipMethod: {
                //         validators: {
                //             notEmpty: {
                //                 message: 'Ship Method is required',
                //             },
                //         },
                //     },
                //     plCarrierName: {
                //         validators: {
                //             notEmpty: {
                //                 message: 'Carrier Name is required',
                //             },
                //         },
                //     },
                //     plTrackingNo: {
                //         validators: {
                //             notEmpty: {
                //                 message: 'Tracking No is required',
                //             },
                //         },
                //     },
                //     plShippingNotes: {
                //         validators: {
                //             notEmpty: {
                //                 message: 'Notes is required',
                //             },
                //         },
                //     },
                //     plFileProof: {
                //         validators: {
                //             notEmpty: {
                //                 message: 'This Field is required',
                //             },
                //         },
                //     },

            },
            plugins: {
                //Learn more: https://formvalidation.io/guide/plugins
                trigger: new FormValidation.plugins.Trigger(),
                // Bootstrap Framework Integration
                bootstrap: new FormValidation.plugins.Bootstrap(),
                // Validate fields when clicking the Submit button
                plFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                KTUtil.btnWait(plFormSubmitButton, _buttonSpinnerClasses, 'Please wait');


                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/sales-finance/packing-list`,
                    data: {
                        packingListnumber: (plPackingListNo.value) * 1,
                        taxInvoiceNumber: (plTaxInvoiceNo.value) * 1,
                        source: plSource.value,
                        sourceAddress: plSourceAddress.value,
                        sourceEmail: plSourceEmail.value,
                        sourceContactNumber: plSourceContact.value,
                        sourceGstin: (plSourceGST.value) * 1,
                        consignee: plCosignee.value,
                        consigneeAddress: plCosigneeAddress.value,
                        consigneeEmail: plCosigneeEmail.value,
                        consigneeContactNumber: plCosigneeContact.value,
                        consigneeGstin: plCosigneeGST.value,
                        box: [
                            {
                                boxNumber: (plBoxNo.value) * 1,
                                dimensions:
                                {
                                    length: (plBoxDimlength.value) * 1,
                                    bredth: (plBoxDimBreadth.value) * 1,
                                    width: (plBoxDimWidth.value) * 1,
                                    units: plBoxDimUnits.value
                                },


                                weight: (plBoxWeight) * 1,
                                weightUnit: plBoxWeightUnits,
                                items: [
                                    {
                                        _serialNo: plSerialNo.value,
                                        itemCode: plItemCode.value,
                                        name: plName.value,
                                        quantity: (plQuantity.value) * 1,
                                        unitOfMeasurement: plItemUnits.value,
                                        boxmeta: plboxMeta.value
                                    }
                                ]
                            }
                        ],

                        shipMethod: plShipMethod.value,
                        carrierName: plCarrierName.value,
                        carrierTrackingNumber: (plTrackingNo.value) * 1,
                        shippingNotes: plShippingNotes.value,
                        fileProof: plFileProof.value
                    },
                }).then(function (res) {
                    KTUtil.btnRelease(plFormSubmitButton);
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


    };
    const _createTaxInvoiceForm = function () {
        // Getting Document related information
        const createTaxInvoiceForm = KTUtil.getById('createTaxInvoiceForm ');
        const tiFormSubmitButton = KTUtil.getById('tiFormSubmitButton');
        const tiNo = KTUtil.getById('tiNo');
        const tiHeader = KTUtil.getById('tiHeader');
        const tiDate = KTUtil.getById('tiDate');
        const tiOrderID = KTUtil.getById('tiOrderID');
        const tiOrderDate = KTUtil.getById('tiOrderDate');
        const tiBuyerID = KTUtil.getById('tiBuyerID');
        const tiBillingName = KTUtil.getById('tiBillingName');
        const tiBillingAddress = KTUtil.getById('tiBillingAddress');
        const tiBillingEmail = KTUtil.getById('tiBillingEmail');
        const tiBillingContact = KTUtil.getById('tiBillingContact');
        const tiBillingGST = KTUtil.getById('tiBillingGST');
        const tiCosigneeName = KTUtil.getById('tiCosigneeName');
        const tiCosigneeAddress = KTUtil.getById('tiCosigneeAddress');
        const tiCosigneeContact = KTUtil.getById('tiCosigneeContact');
        const tiSellerID = KTUtil.getById('tiSellerID');
        const tiSellerName = KTUtil.getById('tiSellerName');
        const tiSellerAddress = KTUtil.getById('tiSellerAddress');
        const tiSellerEmail = KTUtil.getById('tiSellerEmail');
        const tiSellerContact = KTUtil.getById('tiSellerContact');
        const tiTrackingNo = KTUtil.getById('tiTrackingNo');
        const tiCarrierCharge = KTUtil.getById('tiCarrierCharge');
        const tiaccNo = KTUtil.getById('tiaccNo');
        const tiBankName = KTUtil.getById('tiBankName');
        const tiBankIFSC = KTUtil.getById('tiBankIFSC');
        const tiSerialNo = KTUtil.getById('tiSerialNo');
        const tiItemCode = KTUtil.getById('tiItemCode');
        const tiName = KTUtil.getById('tiName');
        const tiQuantity = KTUtil.getById('tiQuantity');
        const tiItemUnits = KTUtil.getById('tiItemUnits');
        const tiUnitPrice = KTUtil.getById('tiUnitPrice');
        const tiDiscount = KTUtil.getById('tiDiscount');
        const tiDiscountRate = KTUtil.getById('tiDiscountRate');
        const tiTaxValue = KTUtil.getById('tiTaxValue');
        const tiCGST = KTUtil.getById('tiCGST');
        const tiCGSTAmt = KTUtil.getById('tiCGSTAmt');
        const tiSGST = KTUtil.getById('tiSGST');
        const tiSGSTAmt = KTUtil.getById('tiSGSTAmt');
        const tiIGST = KTUtil.getById('tiIGST');
        const tiIGSTAmt = KTUtil.getById('tiIGSTAmt');
        const tiTotalPrice = KTUtil.getById('tiTotalPrice');
        const tibeforeTax = KTUtil.getById('tibeforeTax');
        const tiCGSTTotal = KTUtil.getById('tiCGSTTotal');
        const tiSGSTTotal = KTUtil.getById('tiSGSTTotal');
        const tiIGSTTotal = KTUtil.getById('tiIGSTTotal');
        const tiGrandTotal = KTUtil.getById('tiGrandTotal');
        const tiTermsCondition = KTUtil.getById('tiTermsCondition');
        const tiFooter = KTUtil.getById('tiFooter');
        const tiMeta = KTUtil.getById('tiMeta');
        const tiSource = KTUtil.getById('tiSource');

        // intialising
        $(tiDate).datepicker({
            placeholder: "Select Date"
        });

        $(tiOrderDate).datepicker({
            placeholder: "Select Date"
        });



        if (!createTaxInvoiceForm) {
            return;
        }

        FormValidation.formValidation(createTaxInvoiceForm, {
            fields: {
                tiOrderID: {
                    validators: {
                        notEmpty: {
                            message: 'Order Id is required',
                        },
                    },
                },
                tiBuyerID: {
                    validators: {
                        notEmpty: {
                            message: 'Buyer Id is required',
                        },
                    },
                },
                tiBillingAddress: {
                    validators: {
                        notEmpty: {
                            message: 'Address is required',
                        },
                    },
                },
                tiCosigneeAddress: {
                    validators: {
                        notEmpty: {
                            message: 'Address is required',
                        },
                    },
                },
                tiSellerID: {
                    validators: {
                        notEmpty: {
                            message: 'Seller Id is required',
                        },
                    },
                },
                tiSellerAddress: {
                    validators: {
                        notEmpty: {
                            message: 'Address is required',
                        },
                    },
                },
                tiTermsCondition: {
                    validators: {
                        notEmpty: {
                            message: 'Terms and Condition is required',
                        },
                    },
                },
                tiMeta: {
                    validators: {
                        notEmpty: {
                            message: 'Meta is required',
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
                tiFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                KTUtil.btnWait(tiFormSubmitButton, _buttonSpinnerClasses, 'Please wait');

                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/sales-finance/delivery-note`,
                    data: {
                        "taxInvoiceNo": "shf786",
                        "header": "header",
                        "Date": "2020:11:7",
                        "orderDate": "2020:11:7",
                        "billingName": "yash",
                        "billingAddress": {},
                        "billingEmail": "ash@email.com",
                        "contactNumber": "7888",
                        "billingGSTIN": "",
                         "consigneeName": "ted",
                        "consigneeAddress": {},
                        "consigneeContactNumber": "67899",
                        "sellerName": "xyz",
                        "sellerAddress": {},
                        "sellerContactNumber": "698300032",
                       " carrierTrackingNo": "7890",
                        "carrierCharges": 100,
                       " paymentMeta": {
                          "accountNo": "9009",
                                "bankName": "abcBank",
                               " bankIFSC": "94etf"
                        },
                       " itemTable": [
                          {
                            "serialNo": "serialno90",
                           " itemCode": "uk890",
                            "name": "nancy",
                            "quantity": 4,
                            "unitofMeasurement": "SI",
                           " unitPrice": 55,
                           " dicount": 10,
                            "discountRate":5,
                            "taxableValue": 4,
                            "CGSTRate": 2,
                           " CGSTAmount": 1,
                           " SGSTRate": 0.5,
                            "SGSTAmount": 1,
                            "IGSTRate": 0,
                            "IGSTAmount": 0,
                          "  totalPrice": 150
                          }
                        ],
                      
                      
                       "totalBeforeTax": 100,
                        "CGSTTotal":2,
                        "SGSTTotal": 2,
                        "IGSTTotal": 0,
                        "grandTotal": 110,
                        "termsAndConditions":{},
                        "footer": "",
                        "meta": {},
                        "source": "local",
                        "taxInvoiceNumber": 9000
                      
                    },
                }).then(function (res) {
                    KTUtil.btnRelease(dnFormSubmitButton);
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
                      

    };


    return {
        // public functions
        init: function () {
            _createAddressForm();
            _createDeliveryNoteForm();
            _createPackingListForm();
            _createTaxInvoiceForm();

        },
    };
})();


jQuery(document).ready(function () {
    SalesFinanceCRUD.init();
});



