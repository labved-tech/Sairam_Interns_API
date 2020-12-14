/* eslint-disable */
'use strict';

/* Class definition */
const menuCRUD = (function () {
  const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

/*   Private functions */
    const _createMenuForm = function () {
        // Initializing 
        $("#kt_tree_1").jstree({
            "core": {
                "themes": {
                    "responsive": false
                }
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder"
                },
                "file": {
                    "icon": "fa fa-file"
                }
            },
            "plugins": ["types"]
        });
        
        $("#treeMenuPreview").jstree({
            "core": {
                "themes": {
                    "responsive": false
                }
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder"
                },
                "file": {
                    "icon": "fa fa-file"
                }
            },
            "plugins": ["types"]
        });

            // demoSelect2Single - Dropdown List : Single Select2
            var managerSelect = $('#demoSelect2Single');
                
            // Fetch the preselected item, and add to the control
            $.ajax({
                type: 'GET',
                url: `${HOST_URL}/api/v1/menu/manager`,

            }).then(function (data) {
                // Set up options
                for (let i = 0; i < data.manager.length; i++)   {
                    var newOption = new Option(data.manager[i].name, data.manager[i]._id, false, false);
                    managerSelect.append(newOption).trigger('change');
                }
            });
       
        // demoSelect2Single - Dropdown List : Single Select2
        $('#demoSelect2Single').select2({

        });
    };




    const _createMenuSectionForm = function () {

        // Getting Document related information
        const menuSectionForm = KTUtil.getById('menuSectionForm');
        const menuSectionFormSubmitButton = KTUtil.getById('menuSectionFormSubmitButton');
        const menuManager = KTUtil.getById('menuManager');
        const menuSectionName = KTUtil.getById('menuSectionName');
        const menuSectionDescription = KTUtil.getById('menuSectionDescription');
        const menuSectionPriority = KTUtil.getById('menuSectionPriority');
        
        // menuManager - Dropdown List : Single Select2
        $('#menuManager').select2({
        });
        
        // menuSectionPriority - Number : Number Controls Same Sides
        $('#menuSectionPriority').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',

            min: 1,
            max: 1000,
            step: 1,

        });
        

        // Return Form
        if (!menuSectionForm) {
        return;
        }

        // Validation
        const fv = FormValidation.formValidation(menuSectionForm, {
        fields: {
            menuManager: {
                validators: {
                    notEmpty: {
                    message: 'Manager is required',
                    },
                },
            },
            menuSectionName: {
                validators: {
                    notEmpty: {
                    message: 'Name cannot be empty',
                    },
                },
            },
            menuSectionDescription: {
                validators: {
                    notEmpty: {
                    message: 'Description cannot be empty',
                    },
                },
            },
            menuSectionPriority: {
                validators: {
                    notEmpty: {
                    message: 'This field is required',
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
            menuSectionFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
        })
        .on('core.form.valid', function () {
            // Show loading state on button
            KTUtil.btnWait(menuSectionFormSubmitButton, _buttonSpinnerClasses, 'Please wait');

            // Accessing Restful API
            axios({
            method: 'post',
            url: `${HOST_URL}/api/v1/menu/section`,
                data: {
                    manager: menuManager.value,
                    name: menuSectionName.value,
                    description: menuSectionDescription.value,
                    priority: menuSectionPriority.value,
            },

            }).then(function (res) {
            // Return valid JSON
            // Release button
            KTUtil.btnRelease(menuSectionFormSubmitButton);
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
    const _createMenuItemForm = function () {

        // Getting Document related information
        const menuItemForm = KTUtil.getById('menuItemForm');
        const menuItemFormSubmitButton = KTUtil.getById('menuItemFormSubmitButton');
        const menuSection = KTUtil.getById('menuSection');
        const menuItemName = KTUtil.getById('menuItemName');
        const menuItemRoute = KTUtil.getById('menuItemRoute');
        const menuItemPriority = KTUtil.getById('menuItemPriority');
        
        // menuSection - Dropdown List : Single Select2
        $('#menuSection').select2({
        });
        
        // menuItemPriority - Number : Number Controls Same Sides
        $('#menuItemPriority').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',

            min: 1,
            max: 1000,
            step: 1,

        });
        

        // Return Form
        if (!menuItemForm) {
        return;
        }

        // Validation
        const fv = FormValidation.formValidation(menuItemForm, {
        fields: {
            menuSection: {
                validators: {
                    notEmpty: {
                    message: 'This field is required',
                    },
                },
            },
            menuItemName: {
                validators: {
                    notEmpty: {
                    message: 'Name cannot be empty',
                    },
                },
            },
            menuItemRoute: {
                validators: {
                    notEmpty: {
                    message: 'Description cannot be empty',
                    },
                },
            },
            menuItemPriority: {
                validators: {
                    notEmpty: {
                    message: 'This field is required',
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
            menuItemFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
        })
        .on('core.form.valid', function () {
            // Show loading state on button
            KTUtil.btnWait( menuItemFormSubmitButton, _buttonSpinnerClasses, 'Please wait');

            // Accessing Restful API
            axios({
            method: 'post',
            url: `${HOST_URL}/api/v1/menu/items`,
                data: {
                    section: menuSection.value,
                    name: menuItemName.value,
                    route: menuItemRoute.value,
                    priority: menuItemPriority.value,
            },

            }).then(function (res) {
            // Return valid JSON
            // Release button
            KTUtil.btnRelease( menuItemFormSubmitButton);
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
    const _createMenuSubItem1Form = function () {

        // Getting Document related information
        const menuSubItem1Form = KTUtil.getById('menuSubItem1Form');
        const menuSubItem1FormSubmitButton = KTUtil.getById('menuSubItem1FormSubmitButton');
        const menuItem = KTUtil.getById('menuItem');
        const menuSubItem1Name = KTUtil.getById('menuSubItem1Name');
        const menuSubItem1Route = KTUtil.getById('menuItemRoute');
        const menuSubItem1Priority = KTUtil.getById('menuItemPriority');
        
        // menuItem - Dropdown List : Single Select2
        $('#menuItem').select2({
        });
        
        // menuSubItem1Priority - Number : Number Controls Same Sides
        $('#menuSubItem1Priority').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',

            min: 1,
            max: 1000,
            step: 1,

        });
        

        // Return Form
        if (!menuSubItem1Form) {
        return;
        }

        // Validation
        const fv = FormValidation.formValidation(menuSubItem1Form, {
        fields: {
            menuItem: {
                validators: {
                    notEmpty: {
                    message: 'This field is required',
                    },
                },
            },
            menuSubItem1Name: {
                validators: {
                    notEmpty: {
                    message: 'Name cannot be empty',
                    },
                },
            },
            menuSubItem1Route: {
                validators: {
                    notEmpty: {
                    message: 'Description cannot be empty',
                    },
                },
            },
            menuSubItem1Priority: {
                validators: {
                    notEmpty: {
                    message: 'This field is required',
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
            menuSubItem1FormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
        })
        .on('core.form.valid', function () {
            // Show loading state on button
            KTUtil.btnWait( menuSubItem1FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

            // Accessing Restful API
            axios({
            method: 'post',
            url: `${HOST_URL}/api/v1/menu/subItems1`,
                data: {
                    item: menuItem.value,
                    name: menuSubItem1Name.value,
                    route: menuSubItem1Route.value,
                    priority: menuSubItem1Priority.value,
            },

            }).then(function (res) {
            // Return valid JSON
            // Release button
            KTUtil.btnRelease( menuSubItem1FormSubmitButton);
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
        _createMenuForm();
        _createMenuSectionForm();
        _createMenuItemForm();
        _createMenuSubItem1Form();
    },
  };
})();

jQuery(document).ready(function () {
    menuCRUD.init();
});