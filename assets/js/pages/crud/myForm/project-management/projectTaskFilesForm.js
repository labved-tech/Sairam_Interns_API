/* eslint-disable */
'use strict';

/* Class definition */
const ProjectManagementCRUD = (function () {
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
    const _createprojectTaskFilesForm = function () {

        // Getting Document related information
        const createprojectTaskFilesForm = KTUtil.getById('createprojectTaskFilesForm');
        const ptfFormSubmitButton = KTUtil.getById('ptfFormSubmitButton');
        const ptffileName = KTUtil.getById('ptffileName');
        const ptffileType = KTUtil.getById('ptffileType');
        const ptfdateadded = KTUtil.getById('ptfdateadded');
        const ptfprojectId = KTUtil.getById('ptfprojectId');
        const ptftaskId = KTUtil.getById('ptftaskId');
        const ptfuserId = KTUtil.getById('ptfuserId');
        const ptfexternal = KTUtil.getById('ptfexternal');
        const ptfthumbnailLink = KTUtil.getById('ptfthumbnailLink');


        //Intialize

        $('#ptfdateadded').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });

        // Return Form
        if (!createprojectTaskFilesForm) {
            return;
        }

        // Validation
        const fv = FormValidation.formValidation(createprojectTaskFilesForm, {
            fields: {
                ptffileName: {
                    validators: {
                        notEmpty: {
                            message: 'FileName is required',
                        },
                    },
                },
                ptffileType: {
                    validators: {
                        notEmpty: {
                            message: 'FileType is required',
                        },
                    },
                },
                ptfdateadded: {
                    validators: {
                        notEmpty: {
                            message: 'Date added is required',
                        },
                    },
                },
                ptfprojectId: {
                    validators: {
                        notEmpty: {
                            message: 'ProjectId is required',
                        },
                    },
                },
                ptftaskId: {
                    validators: {
                        notEmpty: {
                            message: 'TaskId is required',
                        },
                    },
                },
                ptfuserId: {
                    validators: {
                        notEmpty: {
                            message: 'UserId is required',
                        },
                    },
                },
                ptfexternal: {
                    validators: {
                        notEmpty: {
                            message: 'External is required',
                        },
                    },
                },
                ptfthumbnailLink: {
                    validators: {
                        notEmpty: {
                            message: 'ThumbnailLink is required',
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
                ptfFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                // Show loading state on button
                KTUtil.btnWait(ptfFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
                console.log(`Value:${ptffileName.value}`);

                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/project-management/projecttaskfiles`,
                    data: {
                        fileName: ptffileName.value,
                        fileType: ptffileType.value,
                        dateadded: ptfdateadded.value,
                        projectId: ptfprojectId.value,
                        taskId: ptftaskId.value,
                        userId: ptfuserId.value,
                        external: ptfexternal.value,
                        thumbnailLink: ptfthumbnailLink.value,
                    },

                }).then(function (res) {
                    // Return valid JSON
                    // Release button
                    KTUtil.btnRelease(ptfFormSubmitButton);
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
            _createprojectTaskFilesForm();
        },
    };
})();

jQuery(document).ready(function () {
    ProjectManagementCRUD.init();
});