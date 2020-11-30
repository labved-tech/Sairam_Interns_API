/* eslint-disable */
'use strict';

// Class definition
const NewsletterCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    // Private functions
    const _createNewsletterMessagesForm = function () {

        // Getting Document related information
        const createNewsletterMessagesForm = KTUtil.getById('createNewsletterMessagesForm');
        const nmFormSubmitButton = KTUtil.getById('nmFormSubmitButton');
        const nmID = KTUtil.getById('nmID');
        const nmSubject = KTUtil.getById('nmSubject');
        const nmMessage = KTUtil.getById('nmMessage');
        const nmEmail = KTUtil.getById('nmEmail');
        const nmSent = KTUtil.getById('nmSent');
        const nmVisited = KTUtil.getById('nmVisited');
        const nmLastVisited = KTUtil.getById('nmLastVisited');

        // Initializing 
        $(nmMessage).summernote({
            height: 400,
            tabsize: 2
        });
        // Date & Time : Date
        $(nmLastVisited).datepicker({
            placeholder: "Select Date"
        });




        if (!createNewsletterMessagesForm) {
            return;
        }

        FormValidation.formValidation(createNewsletterMessagesForm, {
            fields: {
                nmID: {
                    validators: {
                        notEmpty: {
                            message: 'Newsletter ID is required',
                        },
                    },
                },
                nmSubject: {
                    validators: {
                        notEmpty: {
                            message: 'Subject is required',
                        },
                    },
                },
                nmEmail: {
                    validators: {
                        notEmpty: {
                            message: 'Recipient Email is required',
                        },
                    },
                },
                /*                 nmMessage: {
                                    validators: {
                                        notEmpty: {
                                            message: 'Message cannot be empty',
                                        },
                                    },
                                }, */
            },

            plugins: {
                //Learn more: https://formvalidation.io/guide/plugins
                trigger: new FormValidation.plugins.Trigger(),
                // Bootstrap Framework Integration
                bootstrap: new FormValidation.plugins.Bootstrap(),
                // Validate fields when clicking the Submit button
                nmFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                KTUtil.btnWait(nmFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
               

                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/newsletter/messages`,
                    data: {
                        subject: nmSubject.value,
                        //message: nmMessage.value,
                        recipientEmail: nmEmail.value,
                        sent: true,
                        visited: true,
                        lastVisited: nmLastVisited.value,
                    },
                }).then(function (res) {
                    KTUtil.btnRelease(nmFormSubmitButton);
                    

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


    const _createNewsletterEntriesForm = function (){
        // Getting Document related information
        const createNewsletterEntriesForm = KTUtil.getById('createNewsletterEntriesForm');
        const neFormSubmitButton = KTUtil.getById('neFormSubmitButton');
        const neFromEmail = KTUtil.getById('neFromEmail');
        const neDescription = KTUtil.getById('neDescription');
        const neNewsletterType = KTUtil.getById('neNewsletterType');
        const neName = KTUtil.getById('neName');
        const neListDescription = KTUtil.getById('neListDescription');
        const neEmails = KTUtil.getById('neEmails');
        const neNotes = KTUtil.getById('neNotes');
        const neStatus  = KTUtil.getById('neStatus');


        if (!createNewsletterEntriesForm) {
            return;
        }

        FormValidation.formValidation(createNewsletterEntriesForm, {
            fields: {
                neFromEmail: {
                    validators: {
                        notEmpty: {
                            message: 'From Email is required',
                        },
                    },
                },
                neDescription: {
                    validators: {
                        notEmpty: {
                            message: 'Description is required',
                        },
                    },
                },
                neNewsletterType: {
                    validators: {
                        notEmpty: {
                            message: 'Newsletter Type is required',
                        },
                    },
                },
                neName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                        },
                    },
                },
                neEmails: {
                    validators: {
                        notEmpty: {
                            message: 'Email is required',
                        },
                    },
                },
                neStatus: {
                    validators: {
                        notEmpty: {
                            message: 'Status is required',
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
                neFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                KTUtil.btnWait(neFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
               
                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/newsletter/messages`,
                    data: {
                        fromEmail: neFromEmail.value,
                        description: neDescription.value,
                        newsletterType: neNewsletterType.value,
                        list: 
                        [
                            {
                            name: neName.value,
                            description: neListDescription.value,
                            emails: neEmails.value,
                            notes: neNotes.value,
                            status: neStatus.value
    }  
  ]   
                    },
                }).then(function (res) {
                    KTUtil.btnRelease(neFormSubmitButton);
                    
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
            _createNewsletterMessagesForm();
            _createNewsletterEntriesForm();

        },
    };
})();


jQuery(document).ready(function () {
    NewsletterCRUD.init();
});
