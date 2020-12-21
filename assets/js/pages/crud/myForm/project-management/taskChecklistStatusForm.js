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
    const _createtaskChecklistStatusForm = function () {

        // Getting Document related information
        const createTaskChecklistStatusForm = KTUtil.getById('createTaskChecklistStatusForm');
        const tcsFormSubmitButton = KTUtil.getById('tcsFormSubmitButton');
        const tcstaskId = KTUtil.getById('tcstaskId');
        const tcsfinished = KTUtil.getById('tcsfinished');
        const tcstaskChecklistId = KTUtil.getById('tcstaskChecklistId');
        const tcsdateadded = KTUtil.getById('tcsdateadded');
        const tcsaddedBy = KTUtil.getById('tcsaddedBy');
        const tcslistOrder = KTUtil.getById('tcslistOrder');

        //Intialize

        $('#tcsdateadded').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });


        // Return Form
        if (!createTaskChecklistStatusForm) {
            return;
        }

        // Validation
        const fv = FormValidation.formValidation(createTaskChecklistStatusForm, {
            fields: {
                tcstaskId: {
                    validators: {
                        notEmpty: {
                            message: 'TaskId is required',
                        },
                    },
                },
                tcsfinished: {
                    validators: {
                        notEmpty: {
                            message: 'Finished is required',
                        },
                    },
                },
                tcstaskChecklistId: {
                    validators: {
                        notEmpty: {
                            message: 'TaskChecklistId is required',
                        },
                    },
                },
                tcsdateadded: {
                    validators: {
                        notEmpty: {
                            message: 'Date added is required',
                        },
                    },
                },
                tcsaddedBy: {
                    validators: {
                        notEmpty: {
                            message: 'Added By is required',
                        },
                    },
                },
                tcslistOrder: {
                    validators: {
                        notEmpty: {
                            message: 'ListOrder is required',
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
                tcFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                // Show loading state on button
                KTUtil.btnWait(tcsFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
                console.log(`Value:${tcstaskId.value}`);

                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/project/taskcheckliststatus`,
                    data: {
                        taskId: tcstaskId.value,
                        finished: tcsfinished.value,
                        taskChecklistId: tcstaskChecklistId.value,
                        dateadded: tcsdateadded.value,
                        addedBy: tcsaddedBy.value,
                        listOrder: tcslistOrder.value,
                    },

                }).then(function (res) {
                    // Return valid JSON
                    // Release button
                    KTUtil.btnRelease(tcsFormSubmitButton);
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
            _createtaskChecklistStatusForm();
        },
    };
})();

jQuery(document).ready(function () {
    ProjectManagementCRUD.init();
});