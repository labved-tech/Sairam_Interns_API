/* eslint-disable */
'use strict';

// Class definition
const DirectoryCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    // Private functions
    const _createDirectoryCategoriesForm = function () {

        // Getting Document related information
        const createDirectoryCategoriesForm = KTUtil.getById('createDirectoryCategoriesForm');
        const dcFormSubmitButton = KTUtil.getById('dcFormSubmitButton');
        const dcName = KTUtil.getById('dcName');
        const dcslug = KTUtil.getById('dcslug');
        const dcAttributeGroupsId = KTUtil.getById('dcAttributeGroupsId');
        const dcRatingAttributeGroupId = KTUtil.getById('dcRatingAttributeGroupId');

        // Initialise

        if (!createRatingAttributeGroupsForm) {
            return;
        }

        FormValidation.formValidation(createDirectoryCategoriesForm, {
            fields: {
                dcName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                        },
                    },
                    dcAttributeGroupsId: {
                        validators: {
                            notEmpty: {
                                message: '_attributeGroupsId is required',
                            },
                        },
                    },
                    dcRatingAttributeGroupId: {
                        validators: {
                            notEmpty: {
                                message: '_ratingattributegroupId is required',
                            },
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
                createDirectoryCategoriesFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        }).on('core.form.valid', function () {
            KTUtil.btnWait(createDirectoryCategoriesFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
            console.log(`Value:${dcName.value}`);

            // Accessing Restful API
            axios({
                method: 'post',
                url: `${HOST_URL}/api/v1/ratings/attribute/groups`,
                data: {
                    name: ragName.value,
                    _attributeGroupsId: dcAttributeGroupsId.value,
                    _ratingAttributeGroupId: dcRatingAttributeGroupId.value
                    //slug
                },
            }).then(function (res) {
                KTUtil.btnRelease(dcFormSubmitButton);
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
                    "timeOut": "3000",
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
            _createDirectoryCategories();
        }
    }
})();

jQuery(document).ready(function () {
    DirectoryCRUD.init();
});
