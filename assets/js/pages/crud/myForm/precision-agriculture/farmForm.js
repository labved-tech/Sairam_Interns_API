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
    
    const _createFarmExportedStrategy = function () {
        // Getting Document related information
        const createFarmExportedStrategyForm = KTUtil.getById('createFarmExportedStrategyForm');           
        const createFarmExportedStrategyFormSubmitButton = KTUtil.getById('createFarmExportedStrategyFormSubmitButton');
        const fesName = KTUtil.getById('fesName');
        const fesDescription = KTUtil.getById('fesDescription');
        const fesZoneId = KTUtil.getById('fesZoneId');
        const fesCropId = KTUtil.getById('fesCropId');
        const fesFarmId = KTUtil.getById('fesFarmId');
        const fesExpectedYield = KTUtil.getById('fesExpectedYield');
        const fesExpectedYieldUnit = KTUtil.getById('fesExpectedYieldUnit');
        const fesActualYield = KTUtil.getById('fesActualYield');
        const fesActualYieldUnit = KTUtil.getById('fesActualYieldUnit');
        const fesStart = KTUtil.getById('fesStart');
        const fesExpectedEnd = KTUtil.getById('fesExpectedEnd');
        const fesShareable = KTUtil.getById('fesShareable');
        const fesShareableType = KTUtil.getById('fesShareableType');
        const fesContractTemplateId = KTUtil.getById('fesContractTemplateId');
        const fesRate = KTUtil.getById('fesRate');
        const fesTotalExpense = KTUtil.getById('fesTotalExpense');
        const fesAuthorNotes = KTUtil.getById('fesAuthorNotes');
        const fesParentId = KTUtil.getById('fesParentId');
        const fesStages = KTUtil.getById('fesStages');


        // Date & Time : Date
        $('#fesStart').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        }); 
        $('#fesExpectedEnd').datepicker({
        rtl: KTUtil.isRTL(),
        todayBtn: 'linked',
        clearBtn: true,
        todayHighlight: true,
        orientation: 'bottom left',
        templates: arrows,
        });      

        // EXPECTED YIELD
        $('#fesExpectedYield').TouchSpin({
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
        // ACTUAL YIELD
        $('#fesActualYield').TouchSpin({
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
        
        //  TOTAL EXPENSES
        $('#fesTotalExpense').TouchSpin({
        buttondown_class: 'btn btn-secondary',
        buttonup_class: 'btn btn-secondary',
        verticalbuttons: true,
        verticalup: '<i class="ki ki-plus"></i>',
        verticaldown: '<i class="ki ki-minus"></i>',

        min: 0,
        max: 10000,
        step: 10,
        decimals: 2,
        boostat: 5,
        maxboostedstep: 10,
        prefix: '$'
        });
        // Dropdown List : Multiple Select
        
        $('fesStages').selectpicker({
        });
 

        if(!createFarmExportedStrategyForm) {
            return;
        }

        FormValidation.formValidation(createFarmExportedStrategyForm, {
            fields: {
                fesName: {
                    validators: {
                    notEmpty: {
                        message: 'Name is required',
                    },
                },
                },  
                fesDescription : {
                    validators: {
                    notEmpty: {
                        message: 'Description is required',
                    },
                    },
                },       
                fesZoneId: {
                validators: {
                    notEmpty: {
                    message: 'Zone ID is required',
                    },
                },
                },
                fesCropId: {
                validators: {
                    notEmpty: {
                    message: 'Crop ID is required',
                    },
                },
                },  
                fesFarmId: {
                validators: {
                    notEmpty: {
                    message: 'Farm ID is required',
                    },
                },
                },        
                fesExpectedYield: {
                validators: {
                    notEmpty: {
                    message: 'Expected Yield is required',
                    },
                },
                },
                fesExpectedYieldUnit: {
                validators: {
                    notEmpty: {
                    message: 'Expected Yield Unit is required',
                    },
                },
                },                         
                fesActualYield: {
                validators: {
                    notEmpty: {
                    message: 'Actual Yield is required',
                    },
                },
                },
                fesActualYieldUnit: {
                validators: {
                    notEmpty: {
                    message: 'Actual Yield Unit is required',
                    },
                },
                },  
                fesStart: {
                validators: {
                    notEmpty: {
                    message: 'Date is required',
                    },
                },
                },        
                fesExpectedEnd: {
                validators: {
                    notEmpty: {
                    message: 'Date is required',
                    },
                },
                },
                fesStages: {
                validators: {
                    notEmpty: {
                    message: 'Stage is required',
                    },
                },
                },                         
                fesShareable: {
                validators: {
                    notEmpty: {
                    message: 'This is required',
                    },
                },
                },
                fesRate: {
                validators: {
                    notEmpty: {
                    message: 'Rate is required',
                    },
                },
                },                
                fesShareableType: {
                validators: {
                    notEmpty: {
                    message: 'Type is required',
                    },
                },
                },  
                fesContractTemplateId: {
                validators: {
                    notEmpty: {
                    message: 'Contract ID is required',
                    },
                },
                },        
                fesAuthorNotes: {
                validators: {
                    notEmpty: {
                    message: 'Notes are required',
                    },
                },
                },
                fesTotalExpense: {
                validators: {
                    notEmpty: {
                    message: 'Expenses are required',
                    },
                },
                },
                fesParentId: {
                validators: {
                    notEmpty: {
                    message: 'Parent ID required',
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
            createFarmExportedStrategyFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        }).on('core.form.valid', function () {
            KTUtil.btnWait(createFarmExportedStrategyFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
            
            // Accessing Restful API
            fesShareable.value = (fesShareable.value == 'on') ? true:false

            axios({
            method: 'Post',
            url: `${HOST_URL}/api/v1/farm/exported-strategy/`,
                data: {
                name: fesName.value,
                description: fesDescription.value,
                _zoneId:fesZoneId.value,
                _cropId: fesCropId.value,
                _farmId: fesFarmId.value,
                expectedYield:fesExpectedYield.value,
                expectedYieldUnit: fesExpectedYieldUnit.value,
                actualYield: fesActualYield.value,
                actualYieldUnit:fesActualYieldUnit.value,
                start: fesStart.value,
                expectedEnd:fesExpectedEnd.value,
                stages: fesStages.value,
                shareable: fesShareable.value,
                shareableType:fesShareableType.value,
                _contractTemplateId: fesContractTemplateId.value,
                rate: fesRate.value,
                totalExpense:fesTotalExpense.value,
                authorNotes: fesAuthorNotes.value,
                _parentId: fesParentId.value,
            },
            }).then(function (res) {
            KTUtil.btnRelease(createFarmExportedStrategyFormSubmitButton);
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



    const _createFarmRegions = function () {
        // Getting Document related information
        const createFarmRegionsForm = KTUtil.getById('createFarmRegionsForm');           
        const createFarmRegionsFormSubmitButton = KTUtil.getById('createFarmRegionsFormSubmitButton');
        const frFarmId = KTUtil.getById('frFarmId');
        const frZoneId = KTUtil.getById('frZoneId');
        const frConsultant = KTUtil.getById('frConsultant');
        
        /* Initializing */ 

        // Dropdown List : Multiple Select
        
        $('#frConsultant').selectpicker({
        });

        if(!createFarmRegionsForm) {
        return;
        }

        FormValidation.formValidation(createFarmRegionsForm, {
        fields: {
        frFarmId: {
            validators: {
            notEmpty: {
                message: 'Farm ID is required',
            },
            },
        },  
            frZoneId: {
            validators: {
                notEmpty: {
                message: 'Zone ID is required',
                },
            },
            },
            frConsultant: {
            validators: {
                notEmpty: {
                message: 'Consultant is required',
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
        createFarmRegionsFormSubmitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
        }).on('core.form.valid', function () {
        KTUtil.btnWait(createFarmRegionsFormSubmitButton, _buttonSpinnerClasses, 'Please wait');

        // Accessing Restful API
        axios({
        method: 'Post',
        url: `${HOST_URL}/api/v1/farm/regions/`,
            data: {
            _farmId: frFarmId.value,
            _zoneId: frZoneId.value,
            consultant:frConsultant.value,
                
        },
        }).then(function (res) {
        KTUtil.btnRelease(createFarmRegionsFormSubmitButton);
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

    const _createFarmStrategy = function () {
        // Getting Document related information
        const createFarmStrategyForm = KTUtil.getById('createFarmStrategyForm');           
        const createFarmStrategyFormSubmitButton = KTUtil.getById('createFarmStrategyFormSubmitButton');
        const fsName = KTUtil.getById('fsName');
        const fsDescription = KTUtil.getById('fsDescription');
        const fsZoneId = KTUtil.getById('fsZoneId');
        const fsCropId = KTUtil.getById('fsCropId');
        const fsRegionId = KTUtil.getById('fsRegionId');
        const fsExpectedYield = KTUtil.getById('fsExpectedYield');
        const fsExpectedYieldUnit = KTUtil.getById('fsExpectedYieldUnit');
        const fsActualYield = KTUtil.getById('fsActualYield');
        const fsActualYieldUnit = KTUtil.getById('fsActualYieldUnit');
        const fsStart = KTUtil.getById('fsStart');
        const fsExpectedEnd = KTUtil.getById('fsExpectedEnd');
        const fsContractId = KTUtil.getById('fsContractId');
        const fsExportedStrategyId = KTUtil.getById('fsExportedStrategyId');
        const fsRate = KTUtil.getById('fsRate');
        const fsTotalExpense = KTUtil.getById('fsTotalExpense');
        const fsAuthorNotes = KTUtil.getById('fsAuthorNotes');
        const fsParentId = KTUtil.getById('fsParentId');

        const fssName = KTUtil.getById('fssName');
        const fssDescription = KTUtil.getById('fssDescription');
        const fssStart = KTUtil.getById('fssStart');
        const fssEnd = KTUtil.getById('fssEnd');
        const fssStageOrder = KTUtil.getById('fssStageOrder');
        const fssEditable = KTUtil.getById('fssEditable');

        const fsscType = KTUtil.getById('fsscType');
        const fsscName = KTUtil.getById('fsscName');
        const fsscQuantity = KTUtil.getById('fsscQuantity');
        const fsscUnitOfMeasurement = KTUtil.getById('fsscUnitOfMeasurement');
        const fsscEditable = KTUtil.getById('fsscEditable');
        const fsscQuotations = KTUtil.getById('fsscQuotations');
        const fsscPerformsInvoices = KTUtil.getById('fsscPerformsInvoices');
        const fsscTaxInvoices = KTUtil.getById('fsscTaxInvoices');
        const fsscDeliveryNotes = KTUtil.getById('fsscDeliveryNotes');
        const fsscPackingLists = KTUtil.getById('fsscPackingLists');
        const fsscEcommOrders = KTUtil.getById('fsscEcommOrders');



        // Date & Time : Date
        $('#fsStart').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
        }); 
        $('#fsExpectedEnd').datepicker({
        rtl: KTUtil.isRTL(),
        todayBtn: 'linked',
        clearBtn: true,
        todayHighlight: true,
        orientation: 'bottom left',
        templates: arrows,
        });      
        $('#fssStart').datepicker({
        rtl: KTUtil.isRTL(),
        todayBtn: 'linked',
        clearBtn: true,
        todayHighlight: true,
        orientation: 'bottom left',
        templates: arrows,
        });   
        $('#fssEnd').datepicker({
        rtl: KTUtil.isRTL(),
        todayBtn: 'linked',
        clearBtn: true,
        todayHighlight: true,
        orientation: 'bottom left',
        templates: arrows,
        });   

        //  EXPECTED YIELD
        $('#fsExpectedYield').TouchSpin({
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
        //  ACTUAL YIELD
        $('#fsActualYield').TouchSpin({
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
        
        //  TOTAL EXPENSES
        $('#fsTotalExpense').TouchSpin({
        buttondown_class: 'btn btn-secondary',
        buttonup_class: 'btn btn-secondary',
        verticalbuttons: true,
        verticalup: '<i class="ki ki-plus"></i>',
        verticaldown: '<i class="ki ki-minus"></i>',

        min: 0,
        max: 10000,
        step: 10,
        decimals: 2,
        boostat: 5,
        maxboostedstep: 10,
        prefix: '$'
        });

        // Quantity 
        $('#fsscQuantity').TouchSpin({
        buttondown_class: 'btn btn-secondary',
        buttonup_class: 'btn btn-secondary',
        verticalbuttons: true,
        verticalup: '<i class="ki ki-plus"></i>',
        verticaldown: '<i class="ki ki-minus"></i>',

        min: 0,
        max: 10000,
        step: 10,
        decimals: 2,
        boostat: 5,
        maxboostedstep: 10,
        prefix: '$'
        });

        //  STAGE ORDER
        $('#fssStageOrder').TouchSpin({
        buttondown_class: 'btn btn-secondary',
        buttonup_class: 'btn btn-secondary',
        verticalbuttons: true,
        verticalup: '<i class="ki ki-plus"></i>',
        verticaldown: '<i class="ki ki-minus"></i>',

        min: 0,
        max: 10000,
        step: 10,
        decimals: 2,
        boostat: 5,
        maxboostedstep: 10,
        prefix: '$'
        });        
        if(!createFarmStrategyForm) {
            return;
        }

        //Repeat Multiple : Stages Array
        const fsStages = KTUtil.getById('fsStages'); // Form Repeat #2 : Multiple 
        
        $('#fsStages').repeater({
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
        //Repeat Multiple : Commodities Array
        const fssCommodities = KTUtil.getById('fssCommodities'); // Form Repeat #2 : Multiple 
        
        $('#fssCommodities').repeater({
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


        FormValidation.formValidation(createFarmStrategyForm, {
            fields: {
                fsName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                    },
                },
                },  
                fsDescription : {
                    validators: {
                        notEmpty: {
                        message: 'Description is required',
                    },
                    },
                },       
                fsZoneId: {
                validators: {
                    notEmpty: {
                    message: 'Zone ID is required',
                    },
                },
                },
                fsCropId: {
                validators: {
                    notEmpty: {
                    message: 'Crop ID is required',
                    },
                },
                },  
                fsRegionId: {
                validators: {
                    notEmpty: {
                    message: 'Region ID is required',
                    },
                },
                },        
                fsExpectedYield: {
                validators: {
                    notEmpty: {
                    message: 'Expected Yield is required',
                    },
                },
                },
                fsExpectedYieldUnit: {
                validators: {
                    notEmpty: {
                    message: 'Expected Yield Unit is required',
                    },
                },
                },                         
                fsActualYield: {
                validators: {
                    notEmpty: {
                    message: 'Actual Yield is required',
                    },
                },
                },
                fsActualYieldUnit: {
                validators: {
                    notEmpty: {
                    message: 'Actual Yield Unit is required',
                    },
                },
                },  
                fsStart: {
                validators: {
                    notEmpty: {
                    message: 'Date is required',
                    },
                },
                },        
                fsExpectedEnd: {
                validators: {
                    notEmpty: {
                    message: 'Date is required',
                    },
                },
                },
                fsContractId: {
                validators: {
                    notEmpty: {
                    message: 'Contract ID is required',
                    },
                },
                },
                fsExportedStrategyId: {
                validators: {
                    notEmpty: {
                    message: 'Exported Strategy ID is required',
                    },
                },
                },    
                fsRate: {
                validators: {
                    notEmpty: {
                    message: 'Rate is required',
                    },
                },
                },
                fsTotalExpense: {
                validators: {
                    notEmpty: {
                    message: 'Expenses are required',
                    },
                },
                },
                    
                fsAuthorNotes: {
                validators: {
                    notEmpty: {
                    message: 'Notes are required',
                    },
                },
                },
                fsParentId: {
                validators: {
                    notEmpty: {
                    message: 'Parent ID required',
                    },
                },
                },
                // Stages Array
                fssName: {
                validators: {
                    notEmpty: {
                    message: 'Name is required',
                    },
                },
                },  
                fssDescription: {
                validators: {
                    notEmpty: {
                    message: 'Description required',
                    },
                },
                },        
                fssStart: {
                validators: {
                    notEmpty: {
                    message: 'Date required',
                    },
                },
                },
                fssEnd: {
                validators: {
                    notEmpty: {
                    message: 'Date is required',
                    },
                },
                },                         
                fssStageOrder: {
                validators: {
                    notEmpty: {
                    message: 'This is reuired',
                    },
                },
                },
                fssEditable: {
                validators: {
                    notEmpty: {
                    message: 'This is reuired',
                    },
                },
                },  
                // Commodities Array
                fsscType: {
                validators: {
                    notEmpty: {
                    message: 'Type is required',
                    },
                },
                },        
                fsscName: {
                validators: {
                    notEmpty: {
                    message: 'Name is required',
                    },
                },
                },
                fsscQuantity: {
                validators: {
                    notEmpty: {
                    message: 'Quantity is required',
                    },
                },
                },                         
                fsscUnitOfMeasurement: {
                validators: {
                    notEmpty: {
                    message: 'Unit is required',
                    },
                },
                },
                fsscEditable: {
                validators: {
                    notEmpty: {
                    message: 'This is reuired',
                    },
                },
                },                
                fsscQuotations: {
                validators: {
                    notEmpty: {
                    message: 'This is reuired',
                    },
                },
                },  
                fsscPerformsInvoices: {
                validators: {
                    notEmpty: {
                    message: 'This is reuired',
                    },
                },
                },        
                fsscTaxInvoices: {
                validators: {
                    notEmpty: {
                    message: 'This is reuired',
                    },
                },
                },
                fsscDeliveryNotes: {
                validators: {
                    notEmpty: {
                    message: 'This is reuired',
                    },
                },
                },
                fsscPackingLists: {
                validators: {
                    notEmpty: {
                    message: 'This is reuired',
                    },
                },
                },
                fsscEcommOrders: {
                validators: {
                    notEmpty: {
                    message: 'This is reuired',
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
            createFarmStrategyFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        }).on('core.form.valid', function () {
            KTUtil.btnWait(createFarmStrategyFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
            
            // Accessing Restful API
            fssEditable.value = (fssEditable.value == 'on') ? true:false
            fsscEditable.value = (fsscEditable.value == 'on') ? true:false

            axios({
            method: 'Post',
            url: `${HOST_URL}/api/v1/farm/exported-strategy/`,
                data: {
                name: fsName.value,
                description: fsDescription.value,
                _zoneId:fsZoneId.value,
                _cropId: fsCropId.value,
                _regionId: fsRegionId.value,
                expectedYield:fsExpectedYield.value,
                expectedYieldUnit: fsExpectedYieldUnit.value,
                actualYield: fsActualYield.value,
                actualYieldUnit:fsActualYieldUnit.value,
                start: fsStart.value,
                expectedEnd:fsExpectedEnd.value,
                _contractId: fsContractId.value,
                _StrategyId: fsExportedStrategyId.value,
                rate: fsRate.value,
                totalExpense:fsTotalExpense.value,
                authorsNote: fsAuthorNotes.value,
                _parentId: fsParentId.value,

                stages:[{
                    name: fssName.value,
                    description: fssDescription.value,
                    start:fssStart.value,
                    end: fssEnd.value,
                    stageOrder: fssStageOrder.value,
                    editable:fssEditable.value,

                   commodities:[{
                        type: fsscType.value,
                        name: fsscName.value,
                        quantity:fsscQuantity.value,
                        unitOfMeasurement: fsscUnitOfMeasurement.value,
                        editable: fsscEditable.value,
                        quotations:fsscQuotations.value,
                        proformaInvoices: fsscPerformsInvoices.value,
                        taxInvoices: fsscTaxInvoices.value,
                        deliveryNotes:fsscDeliveryNotes.value,
                        packingLists: fsscPackingLists.value,
                        ecommOrders:fsscEcommOrders.value,
                   }],
                    
                }],
            },
            }).then(function (res) {
            KTUtil.btnRelease(createFarmStrategyFormSubmitButton);
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
            _createFarmExportedStrategy();
            _createFarmRegions();
            _createFarmStrategy();
        },
    };
})();

jQuery(document).ready(function () {
    FarmCRUD.init();
});
