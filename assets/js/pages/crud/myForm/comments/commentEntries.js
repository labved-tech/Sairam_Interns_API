/* eslint-disable */
'use strict';

/* Class definition */
const eventCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    /*   Private functions */
    const _createCommentEntriesForm = function () {


        // Getting Document related information
        const createCommentEntriesForm = KTUtil.getById('createCommentEntriesForm');
        const ceFormSubmitButton = KTUtil.getById('ceFormSubmitButton');
        const ceCommentorId = KTUtil.getById('ceCommentorId');
        const ceRelName = KTUtil.getById('ceRelName');
        const ceRelId = KTUtil.getById('ceRelId');
        const ceRating = KTUtil.getById('ceRating');
        const ceMessage = KTUtil.getById('ceMessage');
        const crMessage = KTUtil.getById('crMessage');
        const crcommentorId = KTUtil.getById('crcommentorId');

        // Initializing 

        // ceMessage

        // Return Form
        if (!createCommentEntriesForm) {
            return;
        }

        // Validation
        FormValidation.formValidation(createCommentEntriesForm, {
            fields: {
                ceCommentorId: {
                    validators: {
                        notEmpty: {
                            message: 'commentorId is required',
                        },
                    },
                },
                ceRelName: {
                    validators: {
                        notEmpty: {
                            message: 'relName is required',
                        },
                    },
                },
                ceRelId: {
                    validators: {
                        notEmpty: {
                            message: 'relId is required',
                        },
                    },
                },

                ceRating: {
                    validators: {
                        notEmpty: {
                            message: 'rating is required',
                        },
                    },
                },
                /*             ceMessage: {
                                validators: {
                                    notEmpty: {
                                        message: 'message is required',
                                    },
                                },
                            }, */
                crCommentorId: {
                    validators: {
                        notEmpty: {
                            message: 'commentorId is required',
                        },
                    },
                },
/*                 crMessage: {
                    validators: {
                        notEmpty: {
                            message: 'message is required',
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
                ceFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                // Show loading state on button
                KTUtil.btnWait(ceFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
                console.log(`Value:${ceCommentorId.value}`);


                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/comments/entries`,
                    data: {
                        _commentorid: commentorId.value,
                        relName: ceName.value,
                        _relId: relId.value,
                        rating: rating.value,
                        //message: aeMessage.value,
                        //message: aeMessage.value,
                        _commentorid: commentorId.value,
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
            _createCommentEntriesForm();
        },
    };
})();

jQuery(document).ready(function () {
    commentCRUD.init();
});