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
    const _createQuotationForm = function () {
        // Getting Document related information
        const createQuotationForm = KTUtil.getById('createQuotationForm ');
        const quFormSubmitButton = KTUtil.getById('quFormSubmitButton');
        const quModuleRef = KTUtil.getById('quModuleRef');
        const quHeader = KTUtil.getById('quHeader');
        const quDate = KTUtil.getById('quDate');
        const quBuyerID = KTUtil.getById('quBuyerID');
        const quBuyerName = KTUtil.getById('quBuyerName');
        const quBuyerAddress = KTUtil.getById('quBuyerAddress');
        const quBuyerEmail = KTUtil.getById('quBuyerEmail');
        const quBuyerContact = KTUtil.getById('quBuyerContact');
        const quContactTypeB = KTUtil.getById('quContactTypeB');
        const quSellerID = KTUtil.getById('quSellerID');
        const quSellerName = KTUtil.getById('quSellerName');
        const quSellerAName = KTUtil.getById('quSellerAName');
        const quSellerAddress = KTUtil.getById('quSellerAddress');
        const quSellerEmail = KTUtil.getById('quSellerEmail');
        const quSellerContact = KTUtil.getById('quSellerContact');
        const quContactTypeS = KTUtil.getById('quContactTypeS');
        const quSubject = KTUtil.getById('quSubject');
        const quBody = KTUtil.getById('quBody');
        const quItemTable = KTUtil.getById('quItemTable');
        const quTermsCondition = KTUtil.getById('quTermsCondition');
        const quNumber = KTUtil.getById('quNumber');
        const quFooter = KTUtil.getById('quFooter');
        const quPayID = KTUtil.getById('quPayID');
        const quPayType = KTUtil.getById('quPayType');
        const quMeta = KTUtil.getById('quMeta');

        // intialising
        $(quDate).datepicker({
            placeholder: "Select Date"
        });

        if (!createQuotationForm) {
            return;
        }


        FormValidation.formValidation(createQuotationForm, {
            fields: {
                quModuleRef: {
                    validators: {
                        notEmpty: {
                            message: 'Packing List No  is required',
                        },
                    },
                },
                quHeader: {
                    validators: {
                        notEmpty: {
                            message: 'Tax Invoice No is required',
                        },
                    },
                },
                quDate: {
                    validators: {
                        notEmpty: {
                            message: 'Source is required',
                        },
                    },
                },
                quBuyerID: {
                    validators: {
                        notEmpty: {
                            message: 'Source Address is required',
                        },
                    },
                },
                quBuyerName: {
                    validators: {
                        notEmpty: {
                            message: 'Source Contact is required',
                        },
                    },
                },
                quBuyerAddress: {
                    validators: {
                        notEmpty: {
                            message: 'Source GST is required',
                        },
                    },
                },
                quBuyerEmail: {
                    validators: {
                        notEmpty: {
                            message: 'Cosignee is required',
                        },
                    },
                },
                quBuyerContact: {
                    validators: {
                        notEmpty: {
                            message: 'Address is required',
                        },
                    },
                },
                quContactTypeB: {
                    validators: {
                        notEmpty: {
                            message: 'Email is required',
                        },
                    },
                },
                quSellerID: {
                    validators: {
                        notEmpty: {
                            message: ' Contact is required',
                        },
                    },
                },
                quSellerName: {
                    validators: {
                        notEmpty: {
                            message: 'Cosignee GST is required',
                        },
                    },
                },
                quSellerAName: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                        },
                    },
                },
                quSellerAddress: {
                    validators: {
                        notEmpty: {
                            message: 'Ship Method is required',
                        },
                    },
                },
                quSellerEmail: {
                    validators: {
                        notEmpty: {
                            message: 'Carrier Name is required',
                        },
                    },
                },
                quSellerContact: {
                    validators: {
                        notEmpty: {
                            message: 'Tracking No is required',
                        },
                    },
                },
                quContactTypeS: {
                    validators: {
                        notEmpty: {
                            message: 'Notes is required',
                        },
                    },
                },
                quSubject: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                        },
                    },
                },
                quBody: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                        },
                    },
                },
                quItemTable: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                        },
                    },
                },

                quTermsCondition: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                        },
                    },
                },

                quNumber: {
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
                KTUtil.btnWait(quFormSubmitButton, _buttonSpinnerClasses, 'Please wait');

                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/sales-finance/quotation`,
                    data: {
                        moduleReferance: quModuleRef.value,
                        header: quHeader.value,
                        date: quDate.value,
                        buyerId: quBuyerID.value,
                        buyerName: quBuyerName.value,
                        buyerAddress: quBuyerAddress.value,
                        buyerEmail: quBuyerEmail.value,
                        buyerContactNumber: (quBuyerContact.value) * 1,
                        buyerContactNumbertype: quContactTypeB.value,
                        sellerId : quSellerID.value,
                        sellerName: quSellerName.value,
                        sellerAttentionName: quSellerAName.value,
                        sellerAddress: quSellerAddress.value,
                        sellerEmail: quSellerEmail.value,
                        sellerContactNumber: (quSellerContact.value) * 1,
                        sellerContactNumbertype: quContactTypeS,
                        subject: quSubject.value,
                        body: quBody.value,
                        itemTable: quItemTable.value,
                        termsAndConditions: quTermsCondition.value,
                        footer: quFooter.value,
                        paymentMethod: {
                            id: quPayID.value,
                            type: quPayType.value,
                            meta: quMeta.value
                        },
                        QuotationNumber: (quNumber.value) * 1
                    },
                }).then(function (res) {
                    KTUtil.btnRelease(quFormSubmitButton);
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
            _createQuotationForm();

        },
    };
})();


jQuery(document).ready(function () {
    SalesFinanceCRUD.init();
});



