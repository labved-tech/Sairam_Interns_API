/* eslint-disable */
'use strict';

// Class definition
const ProjectCRUD = (function () {
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
    // Private functions
    const _createProjectDiscussionsForm = function () {
        // Getting Document related information
        const createProjectDiscussionsForm = KTUtil.getById('createProjectDiscussionsForm');
        const DiscussionFormSubmitButton = KTUtil.getById('DiscussionFormSubmitButton');
        const pdID = KTUtil.getById('pdID');
        const pdSubject = KTUtil.getById('pdSubject');
        const pdDescription = KTUtil.getById('pdDescription');
        const pdDateCreated = KTUtil.getById('pdDateCreated');
        const pdLastActivity = KTUtil.getById('pdLastActivity');
        const pdStartedBy = KTUtil.getById('pdStartedBy');

    // Date & Time : Date Created
    $('#pdDateCreated' ).datepicker({
        rtl: KTUtil.isRTL(),
        todayBtn: 'linked',
        clearBtn: true,
        todayHighlight: true,
        orientation: 'bottom left',
        templates: arrows,
      });
    // Date & Time : Last Activity
    $('#pdLastActivity').datepicker({
        rtl: KTUtil.isRTL(),
        todayBtn: 'linked',
        clearBtn: true,
        todayHighlight: true,
        orientation: 'bottom left',
        templates: arrows,
      });
      if (!createProjectDiscussionsForm) {
        return;
    }

    FormValidation.formValidation(createProjectDiscussionsForm, {
        fields: {
            pdID: {
                validators: {
                    notEmpty: {
                        message: 'Project ID is required',
                    },
                },
            },
            pdSubject: {
                validators: {
                    notEmpty: {
                        message: 'Subject is required',
                    },
                },
            },
            pdDescription: {
                validators: {
                    notEmpty: {
                        message: 'Description is required',
                    },
                },
            },
            pdDateCreated: {
                validators: {
                    notEmpty: {
                        message: 'Date Created is required',
                    },
                },
            },
            pdLastActivity: {
                validators: {
                    notEmpty: {
                        message: 'Last Activity is required',
                    },
                },
            },
            pdStartedBy: {
                validators: {
                    notEmpty: {
                        message: 'Started By is required',
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
            DiscussionFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
    })
        .on('core.form.valid', function () {
            KTUtil.btnWait(DiscussionFormSubmitButton, _buttonSpinnerClasses, 'Please wait');


            // Accessing Restful API
            axios({
                method: 'post',
                url: `${HOST_URL}/api/v1/project/discussions`,
                data: {
                    // _projectId: pdID.value,
                    subject: pdSubject.value,
                    description: pdDescription.value,
                    datecreated: pdDateCreated.value,
                    lastActivity: pdLastActivity.value,
                    startedBy: pdStartedBy.value,    
                },
            }).then(function (res) {
                KTUtil.btnRelease(DiscussionFormSubmitButton);
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
    const _createProjectMembersForm = function () {
        // Getting Document related information
        const createProjectMembersForm = KTUtil.getById('createProjectMembersForm');
        const MembersFormSubmitButton = KTUtil.getById('MembersFormSubmitButton');
        const pmID = KTUtil.getById('pmID');
        const pmUserID = KTUtil.getById('pmUserID');
        const pmStatus = KTUtil.getById('pmStatus');
    // Dropdown List : Single Select1 With Search
    $('pmStatus').selectpicker({
    });
    if (!createProjectMembersForm) {
        return;
    }

    FormValidation.formValidation(createProjectMembersForm, {
        fields: {
            pmID: {
                validators: {
                    notEmpty: {
                        message: 'Project ID is required',
                    },
                },
            },
            pmUserID: {
                validators: {
                    notEmpty: {
                        message: 'User ID is required',
                    },
                },
            },
            pmStatus: {
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
            MembersFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
    })
        .on('core.form.valid', function () {
            KTUtil.btnWait(MembersFormSubmitButton, _buttonSpinnerClasses, 'Please wait');


            // Accessing Restful API
            axios({
                method: 'post',
                url: `${HOST_URL}/api/v1/project/members`,
                data: {
                    // _projectId: pdID.value,
                    // _projectId: pmID.value,
                    // _userId: pmUserID.value,
                    status: pmStatus.value,
                },
            }).then(function (res) {
                KTUtil.btnRelease(MembersFormSubmitButton);
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
            _createProjectDiscussionsForm();
            _createProjectMembersForm();
            

        },
    };
})();


jQuery(document).ready(function () {
    ProjectCRUD.init();
});
