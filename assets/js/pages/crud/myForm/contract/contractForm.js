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
        const ceHSNCode = KTUtil.getById('ceHSNCode');
        const ceCGSTRate = KTUtil.getById('ceCGSTRate');
        const ceSGSTRate = KTUtil.getById('ceSGSTRate');
        const ceIGSTRate = KTUtil.getById('ceIGSTRate');


        //Intialize

        $('#ceacceptedDate').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });
        $('#cevalidFrom').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });
        $('#cevalidTill').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });


        // Return Form
        if (!createContractEntriesForm) {
            return;
        }

        // Validation
        const fv = FormValidation.formValidation(createContractEntriesForm, {
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
                ceHSNCode: {
                    validators: {
                        notEmpty: {
                            message: 'HSNCode is required',
                        },
                    },
                },
                ceCGSTRate: {
                    validators: {
                        notEmpty: {
                            message: 'CGSTRate is required',
                        },
                    },
                },
                ceSGSTRate: {
                    validators: {
                        notEmpty: {
                            message: 'SGSTRate is required',
                        },
                    },
                },
                ceIGSTRate: {
                    validators: {
                        notEmpty: {
                            message: 'IGSTRate is required',
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
                ceFormSubmitButton: new FormValidation.plugins.SubmitButton(),
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
                    url: `${HOST_URL}/api/v1/contracts/entries`,
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
                        validity: cevalidity.value * 1,
                        billingType: cebillingType.value,
                        rate: cerate.value * 1,
                        contractFileURL: cecontractFileURL.value,
                        additionalAttributes: ceadditionalAttributes.value,
                        signedContractUploaded: cesignedContractUploaded.value,
                        tax: {
                            HSNCode: ceHSNCode.value,
                            CGSTRate: ceCGSTRate.value * 1,
                            SGSTRate: ceSGSTRate.value * 1,
                            IGSTRate: ceIGSTRate.value * 1,
                        },
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
        const createContractTemplatesForm = KTUtil.getById('createContractTemplatesForm');
        const ctFormSubmitButton = KTUtil.getById('ctFormSubmitButton');
        const ctbillingType = KTUtil.getById('ctbillingType');
        const ctValue = KTUtil.getById('ctValue');
        const ctcontractOwnerId = KTUtil.getById('ctcontractOwnerId');
        const ctcontractFileTemplateURL = KTUtil.getById('ctcontractFilTemplateeURL');
        const ctisRepeat = KTUtil.getById('ctisRepeat');
        const ctrepeatInterval = KTUtil.getById('ctrepeatInterval');
        const ctrepeatIntervalType = KTUtil.getById('ctrepeatIntervalType');
        const ctcurrentRepeatNumber = KTUtil.getById('ctcurrentRepeatNumber');
        const cttotalRepeatNumber = KTUtil.getById('cttotalRepeatNumber');
        const cttotalRepeatAllowed = KTUtil.getById('ctcontractFilTemplateeURL');
        const ctvalidity = KTUtil.getById('ctvalidity');
        const ctHSNCode = KTUtil.getById('ctHSNCode');
        const ctCGSTRate = KTUtil.getById('ctCGSTRate');
        const ctSGSTRate = KTUtil.getById('ctSGSTRate');
        const ctIGSTRate = KTUtil.getById('ctIGSTRate');

        // Return Form
        if (!createContractTemplatesForm) {
            return;
        }

        // Validation
        const fv = FormValidation.formValidation(createContractTemplatesForm, {
            fields: {
                ctbillingType: {
                    validators: {
                        notEmpty: {
                            message: 'BillingType is required',
                        },
                    },
                },
                ctValue: {
                    validators: {
                        notEmpty: {
                            message: 'Value is required',
                        },
                    },
                },
                ctcontractOwnerId: {
                    validators: {
                        notEmpty: {
                            message: 'contractOwnerId is required',
                        },
                    },
                },
                ctcontractFileTemplateURL: {
                    validators: {
                        notEmpty: {
                            message: 'ContractFileURL is required',
                        },
                    },
                },
                ctisRepeat: {
                    validators: {
                        notEmpty: {
                            message: 'IsRepeat is required',
                        },
                    },
                },
                ctrepeatInterval: {
                    validators: {
                        notEmpty: {
                            message: 'RepeatInterval is required',
                        },
                    },
                },
                ctrepeatIntervalType: {
                    validators: {
                        notEmpty: {
                            message: 'RepeatIntervalType is required',
                        },
                    },
                },
                ctcurrentRepeatNumber: {
                    validators: {
                        notEmpty: {
                            message: 'CurrentRepeatNumber is required',
                        },
                    },
                },
                cttotalRepeatNumber: {
                    validators: {
                        notEmpty: {
                            message: 'TotalRepeatNumber is required',
                        },
                    },
                },
                cttotalRepeatAllowed: {
                    validators: {
                        notEmpty: {
                            message: 'ContractFileURL is required',
                        },
                    },
                },
                ctvalidity: {
                    validators: {
                        notEmpty: {
                            message: 'Validity is required',
                        },
                    },
                },
                ctHSNCode: {
                    validators: {
                        notEmpty: {
                            message: 'HSNCode is required',
                        },
                    },
                },
                ctCGSTRate: {
                    validators: {
                        notEmpty: {
                            message: 'CGSTRate is required',
                        },
                    },
                },
                ctSGSTRate: {
                    validators: {
                        notEmpty: {
                            message: 'SGSTRate is required',
                        },
                    },
                },
                ctIGSTRate: {
                    validators: {
                        notEmpty: {
                            message: 'IGSTRate is required',
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
                ctFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                // Show loading state on button
                KTUtil.btnWait(ctFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
                console.log(`Value:${ctbillingType.value}`);
                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/contract/templates`,
                    data: {
                        billingType: ctbillingType.value,
                        value: ctValue.value,
                        _contractOwnerId: ctcontractOwnerId.value,
                        contractFileTemplateURL: ctcontractFileTemplateURL.value,
                        isRepeat: ctisRepeat.value,
                        repeatInterval: ctrepeatInterval.value,
                        repeatIntervalType: ctrepeatIntervalType.value,
                        currentRepeatNumber: ctcurrentRepeatNumber.value,
                        totalRepeatNumber: cttotalRepeatNumber.value,
                        totalRepeatAllowed: cttotalRepeatAllowed.value,
                        validity: ctvalidity.value,
                        tax: {
                            HSNCode: ctHSNCode.value,
                            CGSTRate: ctCGSTRate.value,
                            SGSTRate: ctSGSTRate.value,
                            IGSTRate: ctIGSTRate.value,
                        },
                    },

                }).then(function (res) {
                    // Return valid JSON
                    // Release button
                    KTUtil.btnRelease(ctFormSubmitButton);
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
            _createContractEntriesForm();
            _createContractTemplatesForm();
        },
    };
})();

jQuery(document).ready(function () {
    ContractCRUD.init();
});