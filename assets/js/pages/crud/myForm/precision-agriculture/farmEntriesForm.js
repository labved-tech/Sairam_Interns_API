/* eslint-disable */
'use strict';

// Class definition
const FarmEntriesCRUD = (function () {
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
        
    const _createFarmEntries = function () {
        // Getting Document related information
        const createFarmEntriesForm = KTUtil.getById('createFarmEntriesForm');           
        const createFarmEntriesFormSubmitButton = KTUtil.getById('createFarmEntriesFormSubmitButton');
        const feOwnerId = KTUtil.getById('feOwnerId');    
        const feName = KTUtil.getById('feName');
        const feDescription = KTUtil.getById('feDescription');
        const feNotes = KTUtil.getById('feNotes');
        const feStatus = KTUtil.getById('feFarmId');
        const feAddress = KTUtil.getById('feAddress');
        const feGPSCoordinates = KTUtil.getById('feGPSCoordinates');
        const feDocuments = KTUtil.getById('feDocuments');

        const feaAdminId = KTUtil.getById('feaAdminId');
        const feaPermissions = KTUtil.getById('feaPermissions');

        const fesSize = KTUtil.getById('fesSize');
        const fesUnits = KTUtil.getById('fesUnits');
        
        //Repeat Multiple
        const feAdmins = KTUtil.getById('feAdmins'); // Form Repeat #2 : Multiple 
        
        $('#feAdmins').repeater({
        initEmpty: false,

        defaultValues: {
            'text-input': 'foo'
        },

        show: function () {
            $(this).slideDown();
        },

        hide: function (deleteElement) {
            $(this).slideUp(deleteElement);
        }
        });

        // Number : Number Controls Same Sides
        $('#fesSize').TouchSpin({
        buttondown_class: 'btn btn-secondary',
        buttonup_class: 'btn btn-secondary',
        verticalbuttons: true,
        verticalup: '<i class="ki ki-plus"></i>',
        verticaldown: '<i class="ki ki-minus"></i>',

        min: 0,
        max: 1000000000,
        step: 5,
        decimals: 1,
        boostat: 5,
        maxboostedstep: 10,
        prefix: ''
        });

        // Dropdown List : Multiple Select
        
        $('#feDocuments').selectpicker({
        });



        FormValidation.formValidation(createFarmEntriesForm, {
            fields: {
                feName: {
                    validators: {
                        notEmpty: {
                        message: 'Name is required',
                        },
                    },
                },  
                feDescription : {
                    validators: {
                        notEmpty: {
                            message: 'Description is required',
                        },
                    },
                },       
                feOwnerId: {
                    validators: {
                        notEmpty: {
                        message: 'Owner ID is required',
                        },
                    },
                },      
                fesSize: {
                    validators: {
                        notEmpty: {
                        message: 'Size is required',
                        },
                    },
                },              
                feStatus: {
                    validators: {
                        notEmpty: {
                        message: 'Status is required',
                        },
                    },
                },  
                feAddress: {
                    validators: {
                        notEmpty: {
                        message: 'Address is required',
                        },
                    },
                },        
                feGPSCoordinates: {
                    validators: {
                        notEmpty: {
                        message: 'GPS Coordinates are required',
                        },
                    },
                },         
                feaPermissions: {
                    validators: {
                        notEmpty: {
                        message: 'Permission is required',
                        },
                    },
                },                
                feDocuments: {
                    validators: {
                        notEmpty: {
                        message: 'DOcuments are required',
                        },
                    },
                },  
                feaAdminId: {
                    validators: {
                        notEmpty: {
                        message: 'Admin ID is required',
                        },
                    },
                },        
                feNotes: {
                    validators: {
                        notEmpty: {
                        message: 'Notes are required',
                        },
                    },
                },
                fesUnits: {
                    validators: {
                        notEmpty: {
                        message: 'Unit is required',
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
            createFarmEntriesFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
             .on('core.form.valid', function () {
            KTUtil.btnWait(createFarmEntriesFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
            
            // Accessing Restful API
            feShareable.value = (feShareable.value == 'on') ? true:false

            axios({
            method: 'Post',
            url: `${HOST_URL}/api/v1/farm/entries/`,
                data: {
                    _ownerId:feOwnerId.value,
                    name: feName.value,
                    description: feDescription.value,
                    notes: feNotes.value,
                    status:feStatus.value,
                    address: feAddress.value,
                    gpsCoordinates:feGPSCoordinates.value,
                    documents:feDocuments.value,

                    size:{
                        size:fesSize.value,
                        units: fesUnits.value,
                    },

                    admins:[{
                        _adminId: feaAdminId.value,
                        permissions: feaPermissions.value,
                    }],        
            },
            }).then(function (res) {
            KTUtil.btnRelease(createFarmEntriesFormSubmitButton);
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
        _createFarmEntries();
    },
  };
})();

jQuery(document).ready(function () {
    FarmEntriesCRUD.init();
});
