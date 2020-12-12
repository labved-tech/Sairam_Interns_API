/* eslint-disable */
'use strict';

/* Class definition */
const ContractCRUD = (function () {
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

    /*   Private functions */
    const _createContractEntriesForm = function () {

        // Getting Document related information
        const createContractEntriesForm = KTUtil.getById('createContractEntriesForm');
        const ceFormSubmitButton = KTUtil.getById('ceFormSubmitButton');
        const cecontractOwnerId = KTUtil.getById('cecontractOwnerId');
        const ceclientId = KTUtil.getById('ceclientId');
        const ceclientAccepted = KTUtil.getById('ceclientAccepted');
        const ceacceptedDate = KTUtil.getById('ceacceptedDate');
        const cecontractNumber = KTUtil.getById('cecontractNumber');
        const cecontractTemplateId = KTUtil.getById('ce_contractTemplateId');
        const cerel = KTUtil.getById('cerel');
        const cerelId = KTUtil.getById('cerelId');
        const cevalidFrom = KTUtil.getById('cevalidFrom');
        const cevalidTill = KTUtil.getById('cevalidTill');
        const cevalidity = KTUtil.getById('cevalidity');
        const cebillingType = KTUtil.getById('cebillingType');
        const cerate = KTUtil.getById('cerate');
        const cecontractFileURL = KTUtil.getById('cecontractFileURL');
        const ceadditionalAttributes = KTUtil.getById('ceadditionalAttributes');
        const cesignedContractUploaded = KTUtil.getById('cesignedContractUploaded');

        // Return Form
        if (!createContractEntriesForm) {
            return;
        }

        // Validation
        const fv = FormValidation.formValidation(createTicketCategoriesForm, {
            fields: {
                cecontractOwnerId: {
                    validators: {
                        notEmpty: {
                            message: 'contractOwnerId is required',
                        },
                    },
                },
                ceclientId: {
                    validators: {
                        notEmpty: {
                            message: 'clientId is required',
                        },
                    },
                },
                ceclientAccepted: {
                    validators: {
                        notEmpty: {
                            message: 'clientAccepted is required',
                        },
                    },
                },
                ceacceptedDate: {
                    validators: {
                        notEmpty: {
                            message: 'acceptedDate is required',
                        },
                    },
                },
                cecontractTemplateId: {
                    validators: {
                        notEmpty: {
                            message: 'ContractTemplateId is required',
                        },
                    },
                },
                cerel: {
                    validators: {
                        notEmpty: {
                            message: 'Rel is required',
                        },
                    },
                },
                cerelId: {
                    validators: {
                        notEmpty: {
                            message: 'RelId is required',
                        },
                    },
                },
                cevalidFrom: {
                    validators: {
                        notEmpty: {
                            message: 'ValidFrom is required',
                        },
                    },
                },
                cevalidTill: {
                    validators: {
                        notEmpty: {
                            message: 'ValidTill is required',
                        },
                    },
                },
                cevalidity: {
                    validators: {
                        notEmpty: {
                            message: 'Validity is required',
                        },
                    },
                },
                cebillingType: {
                    validators: {
                        notEmpty: {
                            message: 'BillingType is required',
                        },
                    },
                },
                cerate: {
                    validators: {
                        notEmpty: {
                            message: 'Rate is required',
                        },
                    },
                },
                cecontractFileURL: {
                    validators: {
                        notEmpty: {
                            message: 'ContractFileURL is required',
                        },
                    },
                },
                ceadditionalAttributes: {
                    validators: {
                        notEmpty: {
                            message: 'AdditionalAttributes is required',
                        },
                    },
                },
                cesignedContractUploaded: {
                    validators: {
                        notEmpty: {
                            message: 'SignedContractUploaded is required',
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
                tcFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                // Show loading state on button
                KTUtil.btnWait(ceFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
                console.log(`Value:${cecontractOwnerId.value}`);

                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/contract/entries`,
                    data: {
                        _contractOwnerId: cecontractOwnerId.value,
                        _clientId: ceclientId.value,
                        clientAccepted: ceclientAccepted.value,
                        acceptedDate: ceacceptedDate.value,
                        contractNumber: cecontractNumber.value,
                        _contractTemplateId: cecontractTemplateId.value,
                        rel: cerel.value,
                        _relId: cerelId.value,
                        validFrom: cevalidFrom.value,
                        validTill: cevalidTill.value,
                        validity: cevalidity.value,
                        billingType: cebillingType.value,
                        rate: cerate.value,
                        contractFileURL: cecontractFileURL.value,
                        additionalAttributes: ceadditionalAttributes.value,
                        signedContractUploaded: cesignedContractUploaded.value,
                    },

                }).then(function (res) {
                    // Return valid JSON
                    // Release button
                    KTUtil.btnRelease(ceFormSubmitButton);
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

    /*   Private functions */
    const _createContractTemplatesForm = function () {

        // Getting Document related information
        const createContractEntriesForm = KTUtil.getById('createContractEntriesForm');
        const ceFormSubmitButton = KTUtil.getById('ceFormSubmitButton');
        const cebillingType = KTUtil.getById('cebillingType');
        const cecontractOwnerId = KTUtil.getById('cecontractOwnerId');
        return {
            // public functions
            init: function () {
                _createContractEntriesForm();
            },
        };
    })();

    jQuery(document).ready(function () {
        ContractCRUD.init();
    });