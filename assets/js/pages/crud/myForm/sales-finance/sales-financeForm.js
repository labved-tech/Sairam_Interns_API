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

    return {
        // public functions
        init: function () {
            _createAddressForm();


        },
    };
})();


jQuery(document).ready(function () {
    SalesFinanceCRUD.init();
});



