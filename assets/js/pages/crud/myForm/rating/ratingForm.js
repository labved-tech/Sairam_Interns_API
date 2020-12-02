/* eslint-disable */
'use strict';

// Class definition
const RatingCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    // Private functions
    const _createRatingAttributeForm = function () {

        // Getting Document related information
        const createRatingAttributeForm = KTUtil.getById('createRatingAttributeForm');
        const ratingAttributeFormSubmitButton = KTUtil.getById('ratingAttributeFormSubmitButton');
        const raName = KTUtil.getById('raName');
        const raType = KTUtil.getById('raType');
        const raDescription = KTUtil.getById('raDescription');
        const raNotes = KTUtil.getById('raNotes');

        // Initialise
        $(raType).select2({
            placeholder: "Select a Type"
        });

        $(raDescription).summernote({
            height: 400,
            tabsize: 2,
        });


        if (!createRatingAttributeForm) {
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
                },
                raType: {   // not working
                    validators: {
                        notEmpty: {
                            message: 'Type is required',
                        },
                    },
                },
                raDescription: {
                    validators: {
                        callback: {
                            message: 'The content is required and cannot be empty',
                            callback: function (input) {
                                const code = $('[name="raDescription"]').summernote('code');
                                // <p><br></p> is code generated by Summernote for empty content
                                return (code !== '' && code !== '<p><br></p>');
                            }
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
            plugins: {
                //Learn more: https://formvalidation.io/guide/plugins
                trigger: new FormValidation.plugins.Trigger(),
                // Bootstrap Framework Integration
                bootstrap: new FormValidation.plugins.Bootstrap(),
                // Validate fields when clicking the Submit button
                ratingAttributeFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                // Show loading state on button
                KTUtil.btnWait(ratingAttributeFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
                console.log(`Value:${raName.value}`);

                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/ratings/attribute`,
                    data: {
                        name: raName.value,
                        //type: ratype.value, // not working
                        //description: radescription.value, // not working
                        //notes: raNotes.value, // not working
                    },
                }).then(function (res) {
                    KTUtil.btnRelease(ratingAttributeFormSubmitButton);
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

    const _createRatingAttributeGroupsForm = function () {

    };

    return {
        // public functions
        init: function () {
            _createRatingAttributeForm();
            _createRatingAttributeGroupsForm();
        },
    };
})();

jQuery(document).ready(function () {
    RatingCRUD.init();
});

