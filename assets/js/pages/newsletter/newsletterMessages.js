/* eslint-disable */
'use strict';

// Class definition
const NewsletterCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    // Private functions
    const _newsletterMessages = function () {

        // Getting Document related information
        const form = KTUtil.getById('form_newsletterMessages');
        const formSubmitButton = KTUtil.getById('submitButton');
        const newsletterId = KTUtil.getById('newsletterId');
        const subject = KTUtil.getById('subject');
        const messageTextArea = KTUtil.getById('messageTextArea');
        const recipientEmail = KTUtil.getById('recipientEmail');
        const sent = KTUtil.getById('sent');
        const visited = KTUtil.getById('visited');
        const lastVisited = KTUtil.getById('lastVisited');

        if (!form) {
            return;
        }

        FormValidation.formValidation(form, {
            fields: {
                newsletterId: {
                    validators: {
                        notEmpty: {
                            message: 'newsletterId is required',
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
                submitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        }).on('core.form.valid', function () {
            KTUtil.btnWait(formSubmitButton, _buttonSpinnerClasses, 'Please wait');
            console.log(formMessage);

            // Accessing Restful API
            axios({
                method: 'post',
                url: `${HOST_URL}/api/v1/newsletter/messages`,
                data: {
                    _newsletterId: newsletterId.value,
                    subject: { type: String },
                    message: { type: String },
                    recipientEmail: { type: String },
                    sent: { type: Boolean },
                    visited: { type: Boolean },
                    lastVisited: { type: Boolean },
                },
            }).then(function (res) {
                KTUtil.btnRelease(formSubmitButton);
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
            })
        }).on('core.form.invalid', function () { });
    };


    return {
        // public functions
        init: function () {
            _newsletterMessages();
        },
    };
})();


jQuery(document).ready(function () {
    NewsletterCRUD.init();
})
