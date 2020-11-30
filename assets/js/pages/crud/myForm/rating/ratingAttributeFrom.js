/* eslint-disable */
'use strict';

// Class definition
const RatingAttributeCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    // Private functions
    const _createRatingAttribute = function () {

        // Getting Document related information
        const createratingAttributeform = KTUtil.getById('createratingAttributeForm');
        const createRatingAttributeFormSubmitButton = KTUtil.getById('createRatingAttributeFormSubmitButton');
        const raName = KTUtil.getById('raName');
        const raDescription = KTUtil.getById('raDescription');
        const raNotes = KTUtil.getById('raNotes');

        if (!createRatingAttributeform) {
            return;
        }

        FormValidation.formValidation(createRatingAttributeForm, {
            fields: {
                raName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                        },
                    },
                    raDescription: {
                        validators: {
                            notEmpty: {
                                message: 'Description is required',
                            },
                        },
                    },
                    raNotes: {
                        validators: {
                            notEmpty: {
                                message: 'Notes is required',
                            },
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
        })
            .on('core.form.valid', function () {
                // Show loading state on button
                KTUtil.btnWait(formSubmitButton, _buttonSpinnerClasses, 'Please wait');
                console.log(`Value:${demoText.value}`);

                // Accessing Restful API
                axios({
                    method: 'Post',
                    url: `${HOST_URL}/api/v1/ratingAttribute`,
                    data: {
                        name: raName.value,
                        type: ratype.value,
                        description: radescription.value,

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
                });

            })
            .on('core.form.invalid', function () {
                console.log('Something went wrong!!');

            });

    };
    return {
        // public functions
        init: function () {
            _createRatingAttribute();
        },
    };
})();

jQuery(document).ready(function () {
    RatingAttributeCRUD.init();
});

