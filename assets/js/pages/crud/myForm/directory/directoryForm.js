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
        const dcSlug = KTUtil.getById('dcslug');
        const dcAttributeGroupsId = KTUtil.getById('dcAttributeGroupsId');
        const dcRatingAttributeGroupId = KTUtil.getById('dcRatingAttributeGroupId');

        // Initialise

        if (!createDirectoryCategoriesForm) {
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
                },
                dcSlug: {
                    validators: {
                        notEmpty: {
                            message: 'Slug is required',
                        },
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
            plugins: {
                //Learn more: https://formvalidation.io/guide/plugins
                trigger: new FormValidation.plugins.Trigger(),
                // Bootstrap Framework Integration
                bootstrap: new FormValidation.plugins.Bootstrap(),
                // Validate fields when clicking the Submit button
                dcFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        }).on('core.form.valid', function () {
            KTUtil.btnWait(createDirectoryCategoriesFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
            console.log(`Value:${dcName.value}`);

            // Accessing Restful API
            axios({
                method: 'post',
                url: `${HOST_URL}/api/v1/directory/categories`,
                data: {
                    name: dcName.value,
                    _attributeGroupsId: dcAttributeGroupsId.value,
                    _ratingAttributeGroupId: dcRatingAttributeGroupId.value,
                    slug: dcSlug.value
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

    const _createDirectoryForm = function () {

        // Getting Document related information
        const createDirectoryForm = KTUtil.getById('createDirectoryForm');
        const dFormSubmitButton = KTUtil.getById('dFormSubmitButton');
        const dName = KTUtil.getById('dName');
        const dSingular = KTUtil.getById('dSingular');
        const dPlural = KTUtil.getById('dPlural');
        const dSlug = KTUtil.getById('dSlug');

        // Initialise

        if (!createDirectoryForm) {
            return;
        }

        FormValidation.formValidation(createDirectoryForm, {
            fields: {
                dName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
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
                dFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                // Show loading state on button
                KTUtil.btnWait(dFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
                console.log(`Value:${dName.value}`);

                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/directory`,
                    data: {
                        name: dName.value,
                        singular: dSingular.value,
                        plural: dPlural.value,
                        slug: dSlug.value,
                    },
                }).then(function (res) {
                    KTUtil.btnRelease(dFormSubmitButton);
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

    const _createDirectoryLevelsForm = function () {
        // Getting Document related information
        const createDirectoryLevelsForm = KTUtil.getById('createDirectoryLevelsForm');
        const dlFormSubmitButton = KTUtil.getById('dlFormSubmitButton');
        const dlName = KTUtil.getById('dlName');
        const dlDescription = KTUtil.getById('dlDescription');
        const dlChangeLevelId = KTUtil.getById('dlChangeLevelId');
        const dlListingsInPackage = KTUtil.getById('dlListingsInPackage');
        const dlRiseUpEnabled = KTUtil.getById('dlRiseUpEnabled');
        const dlSticky = KTUtil.getById('dlSticky');
        const dlFeatured = KTUtil.getById('dlFeatured');
        const dlOwnPage = KTUtil.getById('dlOwnPage');
        const dlUnlimitedCategories = KTUtil.getById('dlUnlimitedCategories');
        const dlMap = KTUtil.getById('dlMap');
        const dlMapMakers = KTUtil.getById('dlMapMakers');
        const dlLogoEnabled = KTUtil.getById('dlLogoEnabled');
        const dlImageLimit = KTUtil.getById('dlImageLimit');
        const dlUpdatedAt = KTUtil.getById('dlUpdatedAt');
        const dlVideoLimit = KTUtil.getById('dlVideoLimit');
        const dlContentFields = KTUtil.getById('dlContentFields');

        // Initialise

        $(raDescription).summernote({
            height: 400,
            tabsize: 2,
        });

        if (!createDirectoryLevelsForm) {
            return;
        }

        FormValidation.formValidation(createDirectoryLevelsForm, {
            fields: {
                dlName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
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
                dlFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                // Show loading state on button
                KTUtil.btnWait(dlFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
                console.log(`Value:${dlName.value}`);

                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/ratings/attribute`,
                    data: {
                        name: dlName.value,
                        description: $('#dlDescription').summernote('code'),

                    },

                }).then(function (res) {
                    KTUtil.btnRelease(dlFormSubmitButton);
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
            _createDirectoryCategoriesForm();
            _createDirectoryForm();
            _createDirectoryLevelsForm();
        }
    }
})();

jQuery(document).ready(function () {
    DirectoryCRUD.init();
});
