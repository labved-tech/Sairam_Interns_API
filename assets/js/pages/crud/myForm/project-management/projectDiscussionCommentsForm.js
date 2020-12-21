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
    const _createprojectDiscussionCommentsForm = function () {

        // Getting Document related information
        const createprojectDiscussionCommentsForm = KTUtil.getById('createprojectDiscussionCommentsForm');
        const pdcFormSubmitButton = KTUtil.getById('pdcFormSubmitButton');
        const pdcdiscussionId = KTUtil.getById('pdcdiscussionId');
        const pdcdiscussionType = KTUtil.getById('pdcdiscussionType');
        const pdcparent = KTUtil.getById('pdcparent');
        const pdccreated = KTUtil.getById('pdccreated');
        const pdcmodified = KTUtil.getById('pdcmodified');
        const pdccontent = KTUtil.getById('pdccontent');
        const pdccommenterId = KTUtil.getById('pdccommenterId');
        const pdcfullname = KTUtil.getById('pdcfullname');
        const pdcfileName = KTUtil.getById('pdcfileName');
        const pdcfileType = KTUtil.getById('pdcfileType');
        const pdcprojectId = KTUtil.getById('pdcprojectId');



        //Intialize

        $('#pdccreated').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });

        $('#pdcmodified').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });

        // Return Form
        if (!createprojectDiscussionCommentsForm) {
            return;
        }

        // Validation
        const fv = FormValidation.formValidation(createprojectDiscussionCommentsForm, {
            fields: {
                pdcdiscussionId: {
                    validators: {
                        notEmpty: {
                            message: 'Discussion Id is required',
                        },
                    },
                },
                pdcdiscussionType: {
                    validators: {
                        notEmpty: {
                            message: 'Discussion Type is required',
                        },
                    },
                },
                pdcparent: {
                    validators: {
                        notEmpty: {
                            message: 'Parent is required',
                        },
                    },
                },
                pdccreated: {
                    validators: {
                        notEmpty: {
                            message: 'Created is required',
                        },
                    },
                },
                pdcmodified: {
                    validators: {
                        notEmpty: {
                            message: 'Modified is required',
                        },
                    },
                },
                pdccontent: {
                    validators: {
                        notEmpty: {
                            message: 'Content is required',
                        },
                    },
                },
                pdccommenterId: {
                    validators: {
                        notEmpty: {
                            message: 'CommenterId is required',
                        },
                    },
                },
                pdcfullname: {
                    validators: {
                        notEmpty: {
                            message: 'Full name is required',
                        },
                    },
                },
                pdcfileName: {
                    validators: {
                        notEmpty: {
                            message: 'File Name is required',
                        },
                    },
                },
                pdcfileType: {
                    validators: {
                        notEmpty: {
                            message: 'FileType is required',
                        },
                    },
                },
                pdcprojectId: {
                    validators: {
                        notEmpty: {
                            message: 'ProjectId is required',
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
                pdcFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                // Show loading state on button
                KTUtil.btnWait(pdcFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
                console.log(`Value:${pdcfileName.value}`);

                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/project-management/proje7ctdiscussioncomments`,
                    data: {
                        discussionId: pdcdiscussionId.value,
                        discussionType: pdcdiscussionType.value,
                        parent: pdcparent.value,
                        created: pdccreated.value,
                        modified: pdcmodified.value,
                        content: pdccontent.value,
                        commenterId: pdccommenterId.value,
                        fullname: pdcfullname.value,
                        fileName: pdcfileName.value,
                        fileType: pdcfileType.value,
                        projectId: pdcprojectId.value,
                    },

                }).then(function (res) {
                    // Return valid JSON
                    // Release button
                    KTUtil.btnRelease(pdcFormSubmitButton);
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
            _createprojectDiscussionCommentsForm();
        },
    };
})();

jQuery(document).ready(function () {
    ProjectManagementCRUD.init();
});