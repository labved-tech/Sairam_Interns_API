/* eslint-disable */
'use strict';

// Class definition
const SalesFinanceCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

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
                    url: `${HOST_URL}/api/v1/sales-finance/deliveryNote`,
                    data: {
                        packingListnumber: (dnPackingListNo.value)*1,
                        taxInvoiceNumber: (dnTaxInvoiceNo.value)*1,
                        source: dnSource.value,
                        sourceAddress:dnSourceAddress.value,     
                        sourceContactNumber: dnSourceContact.value,
                        sourceGstin:dnSourceGST.value,
                        consignee: dnCosignee.value,
                        consigneeAddress: dnCosigneeAddress.value,
                        consigneeEmail: dnCosigneeEmail.value,
                        consigneeContactNumber: dnCosigneeContact.value,
                        consigneeGstin: dnCosigneeGST.value,
                        box: dnBox.value,
                        shipMethod: dnShipMethod.value,
                        carrierName: dnCarrierName.value,
                        carrierTrackingNumber: dnTrackingNo.value,
                        shippingNotes:dnShippingNotes.value,
                        receivedBy: dnReceivedBy.value,
                        fileProof: dnFileProof.value
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


    return {
        // public functions
        init: function () {
            _createAddressForm();
            _createDeliveryNoteForm();


        },
    };
})();


jQuery(document).ready(function () {
    SalesFinanceCRUD.init();
});



