/* eslint-disable */
'use strict';

// Class definition
const ProjectAdminsCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    const _createProjectAdminsForm = function () {

        const createProjectAdminsForm = KTUtil.getById('createProjectNotesForm');
        const createProjectAdminsFormSubmitButton = KTUtil.getById('createProjectNotesFormSubmitButton');
        const paProjectId = KTUtil.getById('paProjectId');
        const paUserId = KTUtil.getById('paUserId');

        if (!createProjectAdminsForm) {
            return;
        }

        FormValidation.formValidation(createProjectAdminsForm, {
            fields: {
                paProjectId: {
                    validators: {
                        notEmpty: {
                            message: 'ProjectId is required',
                        },
                    },
                },
                paUserId: {
                    validators: {
                        notEmpty: {
                            message: 'UserId is required',
                        },
                    },
                },
            },
            plugins: {
                //Learn more: https://formvalidation.io/guide/plugins
                trigger: new FormValidation.plugins.Trigger(),
                // Bootstrap framework Integration
                bootstrap: new FormValidation.plugins.Bootstrap(),
                // Validate fields when clicking the Submit button
                createProjectAdminsFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        }).on('core.form.valid', function () {
            KTUtil.btnWait(createProjectAdminsFormSubmitButton, _buttonSpinnerClasses, 'Please wait');

            // Accessing Restful API
            paShareable.value = (paShareable.value == 'on') ? true : false

            axios({
                method: 'Post',
                url: `${HOST_URL}/api/v1/project/admins/`,
                data: {
                    _projectId: paProjectId.value,
                    _userId: paUserId.value,

                },
            }).then(function (res) {
                KTUtil.btnRelease(createProjectAdminsFormSubmitButton);
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
            _createProjectAdminsForm();
        },
    };
})();

jQuery(document).ready(function () {
    ProjectAdminsCRUD.init();
});
