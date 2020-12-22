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

    const _createTaskTimers = function () {

        const createTaskTimersForm = KTUtil.getById('createTaskTimersForm');
        const createTaskTimersFormSubmitButton = KTUtil.getById('createTaskTimersFormSubmitButton');
        const ttTaskId = KTUtil.getById('ttTaskId');
        const ttStartTime = KTUtil.getById('ttStartTime');
        const ttEndTime = KTUtil.getById('ttEndTime');
        const ttTimeSpend = KTUtil.getById('ttTimeSpend');
        const ttNote = KTUtil.getById('ttNote');
        const ttUserId = KTUtil.getById('ttUserId');

        // Date & Time : Date
        $('#ttStartTime').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });

        $('#ttEndTime').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });

        $('#ttTimeSpend').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',

            min: 0,
            max: 10000,
            step: 5,
            decimals: 0,
            boostat: 5,
            maxboostedstep: 10,
            prefix: ''
        });

        if (!createTaskTimersForm) {
            return;
        }

        FormValidation.formValidation(createTaskTimersForm, {
            fields: {
                ttTaskId: {
                    validators: {
                        notEmpty: {
                            message: 'ttTaskId is required',
                        },
                    },
                },
                ttStartTime: {
                    validators: {
                        notEmpty: {
                            message: 'StartTime is required',
                        },
                    },
                },
                ttEndTime: {
                    validators: {
                        notEmpty: {
                            message: 'EndTime is required',
                        },
                    },
                },
                ttTimeSpend: {
                    validators: {
                        notEmpty: {
                            message: 'TimeSpend is required',
                        },
                    },
                },
                ttNote: {
                    validators: {
                        notEmpty: {
                            message: 'Note is required',
                        },
                    },
                },
                ttUserId: {
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
                createTaskTimersFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        }).on('core.form.valid', function () {
            KTUtil.btnWait(createTaskTimersFormSubmitButton, _buttonSpinnerClasses, 'Please wait');

            // Accessing Restful API
            ttShareable.value = (ttShareable.value == 'on') ? true : false

            axios({
                method: 'Post',
                url: `${HOST_URL}/api/v1/project/entries/`,
                data: {
                    _taskId: ttTaskId.value,
                    startTime: ttStartTime.value,
                    endTime: ttEndTime.value,
                    timeSpend: ttTimeSpend.value,
                    note: ttNote.value,
                    _userId: ttUserId.value,

                },
            }).then(function (res) {
                KTUtil.btnRelease(createTaskTimersFormSubmitButton);
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
            _createTaskTimers();
        },
    };
})();

jQuery(document).ready(function () {
    FarmCRUD.init();
});