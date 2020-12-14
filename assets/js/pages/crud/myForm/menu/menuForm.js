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
            url: `${HOST_URL}/api/v1/menu/section`,
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
        // menuSection - Dropdown List : Single Select2
        $('#menuItem').select2({
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