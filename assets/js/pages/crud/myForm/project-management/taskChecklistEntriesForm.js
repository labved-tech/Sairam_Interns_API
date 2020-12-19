/* eslint-disable */
'use strict';

// Class definition
const TaskChecklistEntriesCRUD = (function () {
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

    const _createTaskChecklistEntries = function () {
        // Getting Document related information
        const createTaskChecklistEntriesForm = KTUtil.getById('createTaskChecklistEntriesForm');           
        const createTaskChecklistEntriesFormSubmitButton = KTUtil.getById('createTaskChecklistEntriesFormSubmitButton');
        const tceTaskId = KTUtil.getById('tceTaskId');
        const tceFinished = KTUtil.getById('tceFinished');
        const tceDescription = KTUtil.getById('tceDescription');
        const tceDateAdded = KTUtil.getById('tceDateAdded');
        const tceAddedBy = KTUtil.getById('tceAddedBy');
        const tceListOrder = KTUtil.getById('tceListOrder');

        // Date & Time : Date
        $('#tceDateAdded').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });
        // List Order Number
        $('#tceListOrder').TouchSpin({
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
        

        if(!createTaskChecklistEntriesForm) {
            return;
        }

        FormValidation.formValidation(createTaskChecklistEntriesForm, {
            fields: {
                tceTaskId: {
                    validators: {
                        notEmpty: {
                            message: 'Task ID is required',
                    },
                },
                },  
                tceDescription : {
                        validators: {
                        notEmpty: {
                                message: 'Description is required',
                    },
                    },
                },
                tceDateAdded: {
                    validators: {
                        notEmpty: {
                            message: 'Date is required',
                    },
                },
                },
                tceAddedBy: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                    },
                },
                },
                tceListOrder: {
                    validators: {
                        notEmpty: {
                            message: 'Current Repeat Number is required',
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
            createTaskChecklistEntriesFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        }).on('core.form.valid', function () {
            KTUtil.btnWait(createTaskChecklistEntriesFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
            
            // Accessing Restful API

            tceFinished.value = (tceFinished.value == 'on') ? true:false
            console.log(tceFinished.value)

            axios({
            method: 'Post',
            url: `${HOST_URL}/api/v1/project/task-checklist-entries/`,
                data: {
                _taskId: tceTaskId.value,
                finished: tceFinished.value,
                description: tceDescription.value,
                dateadded: tceDateAdded.value,
                addedBy: tceAddedBy.value, 
                listOrder: tceListOrder.value,            
            },
            }).then(function (res) {
            KTUtil.btnRelease(createTaskChecklistEntriesFormSubmitButton);
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
            _createTaskChecklistEntries();
        },
    };
})();

jQuery(document).ready(function () {
    TaskChecklistEntriesCRUD.init();
});
