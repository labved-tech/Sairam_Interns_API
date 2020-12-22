/* eslint-disable */
'use strict';

// Class definition
const FarmCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

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

    const _createMilestone = function () {

        const createMilestoneForm = KTUtil.getById('createMilestoneForm');
        const createMilestoneFormSubmitButton = KTUtil.getById('createMilestoneFormSubmitButton');
        const mName = KTUtil.getById('mName');
        const mDescription = KTUtil.getById('mDescription');
        const mDescriptionVisible = KTUtil.getById('mDescriptionVisible');
        const mDueDate = KTUtil.getById('mDueDate');
        const mProjectId = KTUtil.getById('mProjectId');
        const mcolor = KTUtil.getById('mcolor');
        const mMilestoneOrder = KTUtil.getById('mMilestoneOrder');
        const mDatecreated = KTUtil.getById('mDatecreated');

        // Date & Time : Date
        $('#mDueDate').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });

        $('#mDatecreated').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });

        if (!createMilestoneForm) {
            return;
        }

        FormValidation.formValidation(createMilestoneForm, {
            fields: {
                mName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                        },
                    },
                },
                mDescription: {
                    validators: {
                        notEmpty: {
                            message: 'Description is required',
                        },
                    },
                },
                mDescriptionVisible: {
                    validators: {
                        notEmpty: {
                            message: 'DescriptionVisible is required',
                        },
                    },
                },
                mDueDate: {
                    validators: {
                        notEmpty: {
                            message: 'DueDate is required',
                        },
                    },
                },
                mProjectId: {
                    validators: {
                        notEmpty: {
                            message: 'ProjectId is required',
                        },
                    },
                },
                mcolor: {
                    validators: {
                        notEmpty: {
                            message: 'color is required',
                        },
                    },
                },
                mMilestoneOrder: {
                    validators: {
                        notEmpty: {
                            message: 'MilestoneOrder is required',
                        },
                    },
                },
                mDatecreated: {
                    validators: {
                        notEmpty: {
                            message: 'Datecreated is required',
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
                createMilestoneFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        }).on('core.form.valid', function () {
            KTUtil.btnWait(createMilestoneFormSubmitButton, _buttonSpinnerClasses, 'Please wait');

            // Accessing Restful API
            mShareable.value = (mShareable.value == 'on') ? true : false

            axios({
                method: 'Post',
                url: `${HOST_URL}/api/v1/project/entries/`,
                data: {
                    description: mDescription.value,
                    descriptionVisible: mDescriptionVisible.value,
                    dueDate: mDueDate.value,
                    _projectId: mProjectId.value,
                    color: mcolor.value,
                    milestone_order: mMilestoneOrder.value,
                    datecreated: mDatecreated.value,

                },
            }).then(function (res) {
                KTUtil.btnRelease(createMilestoneFormSubmitButton);
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
            _createMilestone();
        },
    };
})();

jQuery(document).ready(function () {
    FarmCRUD.init();
});
