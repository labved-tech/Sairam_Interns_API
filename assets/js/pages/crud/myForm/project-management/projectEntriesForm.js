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

    const _createProjectEntries = function () {
        // Getting Document related information
        const createProjectEntriesForm = KTUtil.getById('createProjectEntriesForm');           
        const createProjectEntriesFormSubmitButton = KTUtil.getById('createProjectEntriesFormSubmitButton');
        const peName = KTUtil.getById('peName');
        const peDescription = KTUtil.getById('peDescription');
        const peStatus = KTUtil.getById('peStatus');
        const peStartDate = KTUtil.getById('peStartDate');
        const peDeadLine = KTUtil.getById('peDeadLine');
        const peFinished = KTUtil.getById('peFinished');
        const peProgress = KTUtil.getById('peProgress');
        const peEstimatedHours = KTUtil.getById('peEstimatedHours');
        const peType = KTUtil.getById('peType');
        const peFarmId = KTUtil.getById('peFarmId');
        const peFarmRegionId = KTUtil.getById('peFarmRegionId');


        // Date & Time : Date
        $('#peStartDate').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        }); 
        $('#peDeadLine').datepicker({
        rtl: KTUtil.isRTL(),
        todayBtn: 'linked',
        clearBtn: true,
        todayHighlight: true,
        orientation: 'bottom left',
        templates: arrows,
        });      
        $('#peFinished').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
            });  

        // Progress
        $('#peProgress').TouchSpin({
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
        // Estimated Hours
        $('#peEstimatedHours').TouchSpin({
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
        

        if(!createProjectEntriesForm) {
            return;
        }

        FormValidation.formValidation(createProjectEntriesForm, {
            fields: {
            peName: {
                validators: {
                    notEmpty: {
                    message: 'Name is required',
                    },
                },
                },  
                peDescription : {
                    validators: {
                    notEmpty: {
                        message: 'Description is required',
                    },
                    },
                },
                peStatus: {
                validators: {
                    notEmpty: {
                    message: 'Status is required',
                    },
                },
                }, 
                peStartDate: {
                validators: {
                    notEmpty: {
                    message: 'Date is required',
                    },
                },
                },
                peDeadLine: {
                validators: {
                    notEmpty: {
                    message: 'Date is required',
                    },
                },
                },
                peFinished: {
                validators: {
                    notEmpty: {
                    message: 'Date is required',
                    },
                },
                },
                peProgress: {
                validators: {
                    notEmpty: {
                    message: 'Progress is required',
                    },
                },
                },
                peEstimatedHours: {
                validators: {
                    notEmpty: {
                    message: 'Estimated Hours is required',
                    },
                },
                },
                peType: {
                validators: {
                    notEmpty: {
                    message: 'Type is required',
                    },
                },
                },
                peFarmId: {
                validators: {
                    notEmpty: {
                    message: 'Farm ID is required',
                    },
                },
                },
                peFarmRegionId: {
                validators: {
                    notEmpty: {
                    message: 'Farm Region ID is required',
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
            createProjectEntriesFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        }).on('core.form.valid', function () {
            KTUtil.btnWait(createProjectEntriesFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
            
            // Accessing Restful API
            peShareable.value = (peShareable.value == 'on') ? true:false

            axios({
            method: 'Post',
            url: `${HOST_URL}/api/v1/project/entries/`,
                data: {
                name: peName.value,
                description: peDescription.value,
                status:peStatus.value,
                startDate: peStartDate.value,
                deadline:peDeadLine.value,
                finished:peFinished.value,
                progress:peProgress.value,
                estimatedHours: peEstimatedHours.value,
                type: peType.value,
                _farmId: peFarmId.value,
                _farmRegionId:peFarmRegionId.value,
                
            },
            }).then(function (res) {
            KTUtil.btnRelease(createProjectEntriesFormSubmitButton);
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
            _createProjectEntries();
        },
    };
})();

jQuery(document).ready(function () {
    FarmCRUD.init();
});
