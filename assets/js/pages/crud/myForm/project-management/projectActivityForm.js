/* eslint-disable */
'use strict';

// Class definition
const ProjectActivityCRUD = (function () {
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

    const _createProjectActivity = function () {
        // Getting Document related information
        const createProjectActivityForm = KTUtil.getById('createProjectActivityForm');           
        const createProjectActivityFormSubmitButton = KTUtil.getById('createProjectActivityFormSubmitButton');
        const paProjectId = KTUtil.getById('paProjectId');
        const paUserId = KTUtil.getById('paUserId');
        const paFullName = KTUtil.getById('paFullName');
        const paVisibleToUser = KTUtil.getById('paVisibleToUser');
        const paDescriptionKey = KTUtil.getById('paDescriptionKey');
        const paAdditionalData = KTUtil.getById('paAdditionalData');
        const paDateAdded = KTUtil.getById('paDateAdded');

        // Date & Time : Date
        $('#paDateAdded').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        });


        if(!createProjectActivityForm) {
            return;
        }

        FormValidation.formValidation(createProjectActivityForm, {
            fields: {
                paProjectId: {
                    validators: {
                        notEmpty: {
                            message: 'Project ID is required',
                    },
                },
                }, 
                paUserId: {
                    validators: {
                        notEmpty: {
                            message: 'User ID is required',
                    },
                },
                },  
                paFullName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                    },
                },
                },  
                paDescriptionKey: {
                    validators: {
                        notEmpty: {
                            message: 'Task Type is required',
                    },
                },
                },
                paAdditionalData: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                    },
                },
                },
                paDateAdded: {
                    validators: {
                        notEmpty: {
                            message: 'Date is required',
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
            createProjectActivityFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        }).on('core.form.valid', function () {
            KTUtil.btnWait(createProjectActivityFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
            
            // Accessing Restful API
            paVisibleToUser.value = (paVisibleToUser.value == 'on') ? true:false
            console.log(paVisibleToUser.value)

            axios({
            method: 'Post',
            url: `${HOST_URL}/api/v1/project/activity`,
                data: {
                _projectId: paProjectId.value,
                _userId: paUserId.value,
                fullName: paFullName.value,
                descriptionKey: paDescriptionKey.value,
                visibleToUser: paVisibleToUser.value,
                additionalData: paAdditionalData.value,
                dateadded: paDateAdded.value,           
            },
            }).then(function (res) {
            KTUtil.btnRelease(createProjectActivityFormSubmitButton);
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
            _createProjectActivity();
        },
    };
})();

jQuery(document).ready(function () {
    ProjectActivityCRUD.init();
});
