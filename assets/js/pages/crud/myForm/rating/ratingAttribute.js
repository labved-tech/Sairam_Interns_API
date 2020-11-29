/* eslint-disable */
'use strict';

// Class definition
const RatingAttributeCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    // Private functions
    const _ratingAttribute = function () {

        // Getting Document related information
        const form = KTUtil.getById('createratingAttribute');
        const formName = form.querySelector('[name="name"]').value;
        const formDescription = form.querySelector('[name="description"]').value;
        const formNotes = form.querySelector('[name="Notes"]').value;
        const formSubmitButton = KTUtil.getById('submitButton');

        if (!form) {
            return;
        }

        FormValidation.formValidation(createRetingAttributeForm, {
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
                    method: 'post',
                    url: `${HOST_URL}/api/v1/ratingAttribute`,
                    data: {
                        text: demoText.value,
                    },