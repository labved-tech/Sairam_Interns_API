/* eslint-disable */
'use strict';

/* Class definition */
const TicketSupportCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    /*   Private functions */
    const _createTicketCategoriesForm = function () {

        // Getting Document related information
        const createTicketCategoriesForm = KTUtil.getById('createTicketCategoriesForm');
        const tcFormSubmitButton = KTUtil.getById('tcFormSubmitButton');
        const tcName = KTUtil.getById('tcName');
        const tcDescription = KTUtil.getById('tcDescription');
        const tcNotes = KTUtil.getById('tcNotes');

        /*    // Initializing 
            $(tcDescription).summernote({
                height: 100,
                tabsize: 2,
            });*/

        // Return Form
        if (!createTicketCategoriesForm) {
            return;
        }

        // Validation
        const fv = FormValidation.formValidation(createTicketCategoriesForm, {
            fields: {
                tcName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                        },
                    },
                },
                tcDescription: {
                    validators: {
                        notEmpty: {
                            message: 'Description is required',
                        },
                    },
                },
                tcNotes: {
                    validators: {
                        notEmpty: {
                            message: 'Notes is required',
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
                KTUtil.btnWait(tcFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
                console.log(`Value:${tcName.value}`);

                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/ticket-support/categories`,
                    data: {
                        name: tcName.value,
                        description: tcDescription.value,
                        notes: tcNotes.value,
                    },

                }).then(function (res) {
                    // Return valid JSON
                    // Release button
                    KTUtil.btnRelease(tcFormSubmitButton);
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

    const _createTicketProductsForm = function () {

        // Getting Document related information
        const createTicketProductsForm = KTUtil.getById('createTicketProductsForm');
        const tpFormSubmitButton = KTUtil.getById('tpFormSubmitButton');
        const tpName = KTUtil.getById('tpName');
        const tpDescription = KTUtil.getById('tpDescription');
        const tpNotes = KTUtil.getById('tpNotes');

        // Return Form
        if (!createTicketProductsForm) {
            return;
        }

        // Validation
        const fv = FormValidation.formValidation(createTicketProductsForm, {
            fields: {
                tpName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                        },
                    },
                },
                tpDescription: {
                    validators: {
                        notEmpty: {
                            message: 'Description is required',
                        },
                    },
                },
                tpNotes: {
                    validators: {
                        notEmpty: {
                            message: 'Notes is required',
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
                tpFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                // Show loading state on button
                KTUtil.btnWait(tpFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
                console.log(`Value:${tpName.value}`);

                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/ticket-support/products`,
                    data: {
                        name: tpName.value,
                        description: tpDescription.value,
                        notes: tpNotes.value,
                    },

                }).then(function (res) {
                    // Return valid JSON
                    // Release button
                    KTUtil.btnRelease(tpFormSubmitButton);
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

    const _createTicketResponseForm = function () {

        // Getting Document related information
        const createTicketResponseForm = KTUtil.getById('createTicketResponseForm');
        const tpFormSubmitButton = KTUtil.getById('tpFormSubmitButton');
        const _trticketId = KTUtil.getById('trticketId ');
        const _trresponderId = KTUtil.getById('trresponderId');
        const trresponderName = KTUtil.getById('trresponderName');
        const tremailSent = KTUtil.getById('tremailSent');
        const trisStatusChange = KTUtil.getById('trisStatusChange');
        const trbody = KTUtil.getById('trbody');

        // Return Form
        if (!createTicketResponseForm) {
            return;
        }

        // Validation
        const fv = FormValidation.formValidation(createTicketResponseForm, {
            fields: {
                trticketId: {
                    validators: {
                        notEmpty: {
                            message: 'ticketId is required',
                        },
                    },
                },
                trresponderId: {
                    validators: {
                        notEmpty: {
                            message: 'responderId is required',
                        },
                    },
                    trresponderName: {
                        validators: {
                            notEmpty: {
                                message: 'responderName is required',
                            },
                        },
                    },
                    tremailSent: {
                        validators: {
                            notEmpty: {
                                message: 'emailSent is required',
                            },
                        },
                    },
                },
                trisStatusChange: {
                    validators: {
                        notEmpty: {
                            message: 'isStatusChange is required',
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
                tpFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                // Show loading state on button
                KTUtil.btnWait(trFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
                console.log(`Value:${trticketId.value}`);

                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/ticket-support/response`,
                    data: {
                        ticketId: trticketId.value,
                        responderId: trresponderId.value,
                        responderName: trresponderName.value,
                        emailSent: tremailSent.value,
                        isStatusChange: trisStatusChange.value,
                    },

                }).then(function (res) {
                    // Return valid JSON
                    // Release button
                    KTUtil.btnRelease(trFormSubmitButton);
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
            _createTicketCategoriesForm();
            _createTicketProductsForm();
            _createTicketResponseForm();
        },
    };
})();

jQuery(document).ready(function () {
    TicketSupportCRUD.init();
});