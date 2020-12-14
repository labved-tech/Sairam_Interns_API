/* eslint-disable */
'use strict';

/* Class definition */
const TicketSupportCRUD = (function () {
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
        const trFormSubmitButton = KTUtil.getById('trFormSubmitButton');
        const trticketId = KTUtil.getById('trticketId ');
        const trresponderId = KTUtil.getById('trresponderId');
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
                trisStatusChange: {
                    validators: {
                        notEmpty: {
                            message: 'isStatusChange is required',
                        },
                    },
                },
                trbody: {
                    validators: {
                        notEmpty: {
                            message: 'body is required',
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
                trFormSubmitButton: new FormValidation.plugins.SubmitButton(),
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
                        body: trbody.value,
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

    /*   Private functions */
    const _createTicketEntriesForm = function () {

        // Getting Document related information
        const createTicketEntriesForm = KTUtil.getById('createTicketEntriesForm');
        const teFormSubmitButton = KTUtil.getById('teFormSubmitButton');
        const teuserId = KTUtil.getById('teuserId');
        const teuserName = KTUtil.getById('teuserName');
        const teuserEmail = KTUtil.getById('teuserEmail');
        const teuserPhoneNumber = KTUtil.getById('teuserPhoneNumber');
        const tecategory = KTUtil.getById('tecategory');
        const teproduct = KTUtil.getById('teproduct');
        const tesubject = KTUtil.getById('tesubject');
        const tebody = KTUtil.getById('tebody');
        const teLastStatusChange = KTUtil.getById('teLastStatusChange');
        const teassignedTo = KTUtil.getById('teassignedTo');
        const tepriority = KTUtil.getById('tepriority');
        const teLastActivityDate = KTUtil.getById('teLastActivityDate');
        const telastActivityBy = KTUtil.getById('telastActivityBy');
        const teagencyId = KTUtil.getById('teagencyId');

        //Intialize

        $('#teLastStatusChange').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });
        $('#teLastActivityDate').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });

        // Return Form
        if (!createTicketEntriesForm) {
            return;
        }

        // Validation
        const fv = FormValidation.formValidation(createTicketEntriesForm, {
            fields: {
                teuserId: {
                    validators: {
                        notEmpty: {
                            message: 'UserId is required',
                        },
                    },
                },
                teuserName: {
                    validators: {
                        notEmpty: {
                            message: 'UserName is required',
                        },
                    },
                },
                teuserEmail: {
                    validators: {
                        notEmpty: {
                            message: 'UserEmail is required',
                        },
                    },
                },
                teuserPhoneNumber: {
                    validators: {
                        notEmpty: {
                            message: 'UserPhoneNumber is required',
                        },
                    },
                },
                tecategory: {
                    validators: {
                        notEmpty: {
                            message: 'Category is required',
                        },
                    },
                },
                teproduct: {
                    validators: {
                        notEmpty: {
                            message: 'Product is required',
                        },
                    },
                },
                tesubject: {
                    validators: {
                        notEmpty: {
                            message: 'Subject is required',
                        },
                    },
                },
                tebody: {
                    validators: {
                        notEmpty: {
                            message: 'Body is required',
                        },
                    },
                },
                teLastStatusChange: {
                    validators: {
                        notEmpty: {
                            message: 'LastStatusChange is required',
                        },
                    },
                },
                teassignedTo: {
                    validators: {
                        notEmpty: {
                            message: 'AssignedTo is required',
                        },
                    },
                },
                tepriority: {
                    validators: {
                        notEmpty: {
                            message: 'Priority is required',
                        },
                    },
                },
                tepriority: {
                    validators: {
                        notEmpty: {
                            message: 'Priority is required',
                        },
                    },
                },
                teLastActivityDate: {
                    validators: {
                        notEmpty: {
                            message: 'LastActivityDate is required',
                        },
                    },
                },
                telastActivityBy: {
                    validators: {
                        notEmpty: {
                            message: 'LastActivityBy is required',
                        },
                    },
                },
                teagencyId: {
                    validators: {
                        notEmpty: {
                            message: 'AgencyId is required',
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
                KTUtil.btnWait(teFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
                console.log(`Value:${teuserId.value}`);

                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/ticket-support/entries`,
                    data: {
                        userId: teuserId.value,
                        userName: teuserName.value,
                        userEmail: teuserEmail.value,
                        userPhoneNumber: teuserPhoneNumber.value,
                        category: tecategory.value,
                        product: teproduct.value,
                        subject: tesubject.value,
                        body: tebody.value,
                        teLastStatusChange: teLastStatusChange.value,
                        assignedTo: teassignedTo.value,
                        priority: tepriority.value,
                        teLastActivityDate: teLastActivityDate.value,
                        lastActivityBy: telastActivityBy.value,
                        agencyId: teagencyId.value,
                    },

                }).then(function (res) {
                    // Return valid JSON
                    // Release button
                    KTUtil.btnRelease(teFormSubmitButton);
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
            _createTicketEntriesForm();
        },
    };
})();

jQuery(document).ready(function () {
    TicketSupportCRUD.init();
});