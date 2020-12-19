/* eslint-disable */
'use strict';

// Class definition
const TaskEntriesCRUD = (function () {
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

    const _createTaskEntries = function () {
        // Getting Document related information
        const createTaskEntriesForm = KTUtil.getById('createTaskEntriesForm');           
        const createTaskEntriesFormSubmitButton = KTUtil.getById('createTaskEntriesFormSubmitButton');
        const teProjectId = KTUtil.getById('teProjectId');
        const teName = KTUtil.getById('teName');
        const teTaskType = KTUtil.getById('teTaskType');
        const teDescription = KTUtil.getById('teDescription');
        const teStatus = KTUtil.getById('teStatus');
        const teDateFinished = KTUtil.getById('teDateFinished');
        const teIsRepeat = KTUtil.getById('teIsRepeat');
        const teRepeatFormDate = KTUtil.getById('teRepeatFormDate');
        const teRepeatLastDate = KTUtil.getById('teRepeatLastDate');
        const teRepeatInterval = KTUtil.getById('teRepeatInterval');
        const teRepeatIntervalType = KTUtil.getById('teRepeatIntervalType');
        const teCurrentRepeatNumber = KTUtil.getById('teCurrentRepeatNumber');
        const teTotalRepeatAllowed = KTUtil.getById('teTotalRepeatAllowed');
        const teDeadlineNotified = KTUtil.getById('teDeadlineNotified');
        const teMilestone = KTUtil.getById('teMilestone');
        const teMilestoneOrder = KTUtil.getById('teMilestoneOrder');
        const teKanbanOrder = KTUtil.getById('teKanbanOrder');
        const teTaskFormURL = KTUtil.getById('teTaskFormURL');
        const teStartDate = KTUtil.getById('teStartDate');
        const teDateAdded = KTUtil.getById('teDateAdded');
        const teDueDate = KTUtil.getById('teDueDate');
        const teAssignedTo = KTUtil.getById('teAssignedTo');

        // Date & Time : Date
        $('#teDateFinished').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });
        $('#teRepeatFormDate').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });    
        $('#teRepeatLastDate').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
            });
        $('#teStartDate').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });
        $('#teDateAdded').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });    
        $('#teDueDate').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
            });


        // Dropdown List : Multiple Select1  W Seacrh
        $('teAssignedTo').selectpicker({
        });


        // Repeat Interval
        $('#teRepeatInterval').TouchSpin({
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
        prefix:''
        });

        // Current Repeat Number
        $('#teCurrentRepeatNumber').TouchSpin({
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
        
        // Total Repeat Allowed
        $('#teTotalRepeatAllowed').TouchSpin({
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
        prefix:''
        });
    
        // Milestone Order
        $('#teMilestoneOrder').TouchSpin({
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

        // Kanban Order 
        $('#teKanbanOrder').TouchSpin({
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



        if(!createTaskEntriesForm) {
            return;
        }

        FormValidation.formValidation(createTaskEntriesForm, {
            fields: {
                teProjectId: {
                    validators: {
                        notEmpty: {
                            message: 'Project ID is required',
                    },
                },
                },  
                teName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                    },
                },
                },  
                teTaskType: {
                    validators: {
                        notEmpty: {
                            message: 'Task Type is required',
                    },
                },
                },
                teDescription : {
                        validators: {
                        notEmpty: {
                                message: 'Description is required',
                    },
                    },
                },
                teStatus: {
                    validators: {
                        notEmpty: {
                            message: 'Status is required',
                    },
                },
                }, 
                teDateFinished: {
                    validators: {
                        notEmpty: {
                            message: 'Date is required',
                    },
                },
                },
                teRepeatFormDate: {
                    validators: {
                        notEmpty: {
                            message: 'Date is required',
                    },
                },
                },
                teRepeatLastDate: {
                    validators: {
                        notEmpty: {
                            message: 'Date is required',
                    },
                },
                },
                teRepeatInterval: {
                    validators: {
                        notEmpty: {
                            message: 'Repeat Interval is required',
                    },
                },
                },
                teRepeatIntervalType: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                    },
                },
                },
                teCurrentRepeatNumber: {
                    validators: {
                        notEmpty: {
                            message: 'Current Repeat Number is required',
                    },
                },
                },
                teTotalRepeatAllowed: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                    },
                },
                },
                teMilestone: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                    },
                },
                },
                teMilestoneOrder: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                    },
                },
                },
                teKanbanOrder: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                    },
                },
                },
                teTaskFormURL: {
                    validators: {
                        notEmpty: {
                            message: 'URL is required',
                    },
                },
                },
                teStartDate: {
                    validators: {
                        notEmpty: {
                            message: 'Date is required',
                    },
                },
                },
                teDateAdded: {
                    validators: {
                        notEmpty: {
                            message: 'Date is required',
                    },
                },
                },
                teDueDate: {
                    validators: {
                        notEmpty: {
                            message: 'Date is required',
                    },
                },
                },
                teAssignedTo: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
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
            createTaskEntriesFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        }).on('core.form.valid', function () {
            KTUtil.btnWait(createTaskEntriesFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
            
            // Accessing Restful API

            teDeadlineNotified.value = (teDeadlineNotified.value == 'on') ? true:false
            teIsRepeat.value = (teIsRepeat.value == 'on') ? true:false
            console.log(teDeadlineNotified.value)
            console.log(teIsRepeat.value)

            axios({
            method: 'Post',
            url: `${HOST_URL}/api/v1/project/task-entries/`,
                data: {
                _projectId: teProjectId.value,
                name: teName.value,
                taskType: teTaskType.value,
                description: teDescription.value,
                status:teStatus.value,
                dateFinished: teDateFinished.value,
                isRepeat: teIsRepeat.value,
                repeatFromDate:teRepeatFormDate.value,
                repeatLastDate:teRepeatLastDate.value,
                repeatInterval:teRepeatInterval.value,
                repeatIntervalType: teRepeatIntervalType.value, 
                currentRepeatNumber: teCurrentRepeatNumber.value,
                totalRepeatAllowed: teTotalRepeatAllowed.value,
                deadlineNotified:teDeadlineNotified.value,
                milestone: teMilestone.value,
                milestoneOrder: teMilestoneOrder.value,
                kanbanOrder: teKanbanOrder.value,
                taskFormURL: teTaskFormURL.value,
                startDate: teStartDate.value,
                dateadded: teDateAdded.value,                
                dueDate: teDueDate.value,
                assignedTo: teAssignedTo.value,            
            },
            }).then(function (res) {
            KTUtil.btnRelease(createTaskEntriesFormSubmitButton);
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
            _createTaskEntries();
        },
    };
})();

jQuery(document).ready(function () {
    TaskEntriesCRUD.init();
});
