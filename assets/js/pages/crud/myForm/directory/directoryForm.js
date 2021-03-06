/* eslint-disable */
'use strict';

// Class definition
const DirectoryCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    // Date Picker
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
        })
            .on('core.form.valid', function () {
                KTUtil.btnWait(dcFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
                console.log(`Value:${dcName.value}`);

                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/directory/categories`,
                    data: {
                        name: dcName.value,
                        _attributeGroupsId: dcAttributeGroupsId.value,
                        _ratingAttributeGroupId: dcRatingAttributeGroupId.value,
                        slug: dcSlug.value,
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
        const dCategories = KTUtil.getById('dCategories');

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
                dSingular: {
                    validators: {
                        notEmpty: {
                            message: 'Singular is required',
                        },
                    },
                },
                dPlural: {
                    validators: {
                        notEmpty: {
                            message: 'Plural is required',
                        },
                    },
                },
                dSlug: {
                    validators: {
                        notEmpty: {
                            message: 'Slug is required',
                        },
                    },
                },
                dCategories: {
                    validators: {
                        notEmpty: {
                            message: 'Categories is required',
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
                        categories: dCategories.value
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
        const dlActivePeriod = KTUtil.getById('dlActivePeriod');
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
        $(dlDescription).summernote({
            height: 400,
            tabsize: 2,
        });

        $('#dlUpdatedAt').datepicker({
            rtl: KTUtil.isRTL(),
            todayBtn: 'linked',
            clearBtn: true,
            todayHighlight: true,
            orientation: 'bottom left',
            templates: arrows,
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
                dlDescription: {
                    validators: {
                        callback: {
                            message: 'The content is required and cannot be empty',
                            callback: function (input) {
                                const code = $('[name="dlDescription"]').summernote('code');
                                // <p><br></p> is code generated by Summernote for empty content
                                return (code !== '' && code !== '<p><br></p>');
                            }
                        },
                    },
                },
                dlActivePeriod: {
                    validators: {
                        notEmpty: {
                            message: 'ActivePeriod is required',
                        },
                    },
                },
                dlChangeLevelId: {
                    validators: {
                        notEmpty: {
                            message: 'ChangeLevelId is required',
                        },
                    },
                },
                dlListingsInPackage: {
                    validators: {
                        notEmpty: {
                            message: 'ListingsInPackage is required',
                        },
                    },
                },
                dlImageLimit: {
                    validators: {
                        notEmpty: {
                            message: 'ImageLimit is required',
                        },
                    },
                },
                dlUpdatedAt: {
                    validators: {
                        notEmpty: {
                            message: 'UpdatedAt is required',
                        },
                    },
                },
                dlVideoLimit: {
                    validators: {
                        notEmpty: {
                            message: 'VideoLimit is required',
                        },
                    },
                },
                dlContentFields: {
                    validators: {
                        notEmpty: {
                            message: 'ContentFields is required',
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
                    url: `${HOST_URL}/api/v1/directory/levels`,
                    data: {
                        name: dlName.value,
                        description: $('#dlDescription').summernote('code'),
                        activePeriod: dlActivePeriod.value,
                        changeLevelId: dlChangeLevelId,
                        listingsInPackage: dlListingsInPackage.value,
                        riseUpEnabled: dlRiseUpEnabled.value,
                        sticky: dlSticky.value,
                        featured: dlFeatured.value,
                        ownPage: dlOwnPage.value,
                        unlimitedCategories: dlUnlimitedCategories.value,
                        map: dlMap.value,
                        mapMakers: dlMapMakers.value,
                        logoEnabled: dlLogoEnabled.value,
                        imageLimit: dlImageLimit.value,
                        updatedAt: dlUpdatedAt.value,
                        videoLimit: dlVideoLimit.value,
                        contentFields: dlContentFields.value,
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

    const _createDirectoryAttributesGroupsForm = function () {

        // Getting Document related information
        const createDirectoryAttributesGroupsForm = KTUtil.getById('createDirectoryAttributesGroupsForm');
        const dagFormSubmitButton = KTUtil.getById('dagFormSubmitButton');
        const dagName = KTUtil.getById('dagName');
        const dagStatus = KTUtil.getById('dagStatus');
        const dagDescription = KTUtil.getById('dagDescription');
        const dagaId = KTUtil.getById('dagaId');
        const dagaName = KTUtil.getById('dagaName');
        const dagaType = KTUtil.getById('dagaType');
        const dagaDescription = KTUtil.getById('dagaDescription');
        const dagaNotes = KTUtil.getById('dagaNotes');

        // Initialise
        $(dagaType).select2({
            placeholder: "Select a Type"
        });

        $(dagDescription).summernote({
            height: 400,
            tabsize: 2,
        });

        if (!createDirectoryAttributesGroupsForm) {
            return;
        }

        const dagaAttributes = KTUtil.getById('dagaAttributes');

        $('#dagaAttributes').repeater({
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

        FormValidation.formValidation(createDirectoryAttributesGroupsForm, {
            fields: {
                dagName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                        },
                    },
                },
                dagStatus: {
                    validators: {
                        notEmpty: {
                            message: 'Status is required',
                        },
                    },
                },
                dagDescription: {
                    validators: {
                        callback: {
                            message: 'The content is required and cannot be empty',
                            callback: function (input) {
                                const code = $('[name="dagDescription"]').summernote('code');
                                // <p><br></p> is code generated by Summernote for empty content
                                return (code !== '' && code !== '<p><br></p>');
                            }
                        },
                    },
                },
                dagaId: {
                    validators: {
                        notEmpty: {
                            message: 'Id is required',
                        },
                    },
                },
                dagaName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                        },
                    },
                },
                dagaType: {
                    validators: {
                        notEmpty: {
                            message: 'Type is required',
                        },
                    },
                },
                dagaDescription: {
                    validators: {
                        notEmpty: {
                            message: 'Description is required',
                        },
                    },
                },
                dagaNotes: {
                    validators: {
                        notEmpty: {
                            message: 'Description is required',
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
                dagFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                // Show loading state on button
                KTUtil.btnWait(dagFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
                console.log(`Value:${dagName.value}`);

                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/directory/attributes/groups`,
                    data: {
                        name: dagName.value,
                        status: dagStatus.value,
                        description: dagDescription.value,
                        id: dagaId.value,
                        name: dagaName.value,
                        type: dagaType.value,
                        description: dagaDescription.value,
                        notes: dagaNotes.value,
                    },
                }).then(function (res) {
                    KTUtil.btnRelease(dagFormSubmitButton);
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

    const _createDirectoryEntriesForm = function () {

        // Getting Document related information
        const createDirectoryEntriesForm = KTUtil.getById('createDirectoryEntriesForm');
        const deFormSubmitButton = KTUtil.getById('deFormSubmitButton');
        const deAuthor = KTUtil.getById('deAuthor');
        const deDate = KTUtil.getById('deDate');
        const deImage = KTUtil.getById('deImage');
        const deMessage = KTUtil.getById('deMessage');
        const deTitle = KTUtil.getById('deTitle');
        const deSlug = KTUtil.getById('deSlug');
        const deSellerId = KTUtil.getById('deSellerId');
        const deStatus = KTUtil.getById('deStatus');
        const deLocation = KTUtil.getById('deLocation');
        const deName = KTUtil.getById('deName');
        const deParentId = KTUtil.getById('deParentId');
        const deCommentStatus = KTUtil.getById('deCommentStatus');
        const deCommentCount = KTUtil.getById('deCommentCount');
        const deMeta = KTUtil.getById('deMeta');
        const deCategories = KTUtil.getById('deCategories');
        const deLevel = KTUtil.getById('deLevel');
        const deLogo = KTUtil.getById('deLogo');

        // Initialise

        $(deMessage).summernote({
            height: 400,
            tabsize: 2,
        });


        if (!createDirectoryEntriesForm) {
            return;
        }

        FormValidation.formValidation(createDirectoryEntriesForm, {
            fields: {
                deAuthor: {
                    validators: {
                        notEmpty: {
                            message: 'Author is required',
                        },
                    },
                },
                deDate: {
                    validators: {
                        notEmpty: {
                            message: 'Date is required',
                        },
                    },
                },
                deImage: {
                    validators: {
                        notEmpty: {
                            message: 'Image is required',
                        },
                    },
                },
                deMessage: {
                    validators: {
                        callback: {
                            message: 'The content is required and cannot be empty',
                            callback: function (input) {
                                const code = $('[name="deMessage"]').summernote('code');
                                // <p><br></p> is code generated by Summernote for empty content
                                return (code !== '' && code !== '<p><br></p>');
                            }
                        },
                    },
                },
                deTitle: {
                    validators: {
                        notEmpty: {
                            message: 'Title is required',
                        },
                    },
                },
                deSlug: {
                    validators: {
                        notEmpty: {
                            message: 'Slug is required',
                        },
                    },
                },
                deSellerId: {
                    validators: {
                        notEmpty: {
                            message: 'SellerId is required',
                        },
                    },
                },
                deStatus: {
                    validators: {
                        notEmpty: {
                            message: 'Status is required',
                        },
                    },
                },
                deLocation: {
                    validators: {
                        notEmpty: {
                            message: 'Location is required',
                        },
                    },
                },
                deName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                        },
                    },
                },
                deParentId: {
                    validators: {
                        notEmpty: {
                            message: 'ParentId is required',
                        },
                    },
                },
                deCommentStatus: {
                    validators: {
                        notEmpty: {
                            message: 'CommentStatus is required',
                        },
                    },
                },
                deCommentCount: {
                    validators: {
                        notEmpty: {
                            message: 'CommentCount is required',
                        },
                    },
                },
                deMeta: {
                    validators: {
                        notEmpty: {
                            message: 'Meta is required',
                        },
                    },
                },
                deCategories: {
                    validators: {
                        notEmpty: {
                            message: 'Categories is required',
                        },
                    },
                },
                deLevel: {
                    validators: {
                        notEmpty: {
                            message: 'Level is required',
                        },
                    },
                },
                deLogo: {
                    validators: {
                        notEmpty: {
                            message: 'Logo is required',
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
                deFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                // Show loading state on button
                KTUtil.btnWait(deFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
                console.log(`Value:${deAuthor.value}`);

                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/ratings/entries`,
                    data: {
                        author: deAuthor.value,
                        date: deDate.value,
                        image: deImage.value,
                        message: demessage.value,
                        title: deTitle.value,
                        slug: deSlug.value,
                        sellerId: deSellerId.value,
                        status: deStatus.value,
                        location: deLocation.value,
                        name: deName.value,
                        parentId: deParentId.value,
                        commentStatus: deCommentStatus.value,
                        CommentCount: deCommentCount.value,
                        meta: deMeta.value,
                        categories: deCategories.value,
                        level: deLevel.value,
                        logo: deLogo.value,
                    },
                }).then(function (res) {
                    KTUtil.btnRelease(deFormSubmitButton);
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
            _createDirectoryAttributesGroupsForm();
            _createDirectoryEntriesForm();

        }
    }
})();

jQuery(document).ready(function () {
    DirectoryCRUD.init();
});
