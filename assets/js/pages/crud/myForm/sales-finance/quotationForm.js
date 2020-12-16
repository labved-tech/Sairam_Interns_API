/* eslint-disable */
'use strict';

// Class definition
const QuotationCRUD = (function () {
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
    const _createQuotationForm = function () {
        // Getting Document related information
        const createQuotationForm = KTUtil.getById('createQuotationForm');
        const quFormSubmitButton = KTUtil.getById('quFormSubmitButton');
        const quModuleRef = KTUtil.getById('quModuleRef');
        const quHeader = KTUtil.getById('quHeader');
        const quDate = KTUtil.getById('quDate');

        const quBuyerID = KTUtil.getById('quBuyerID');
        const quBuyerName = KTUtil.getById('quBuyerName');
        const quBuyerAddress = KTUtil.getById('quBuyerAddress');
        const quBuyerEmail = KTUtil.getById('quBuyerEmail');
        const quBuyerContact = KTUtil.getById('quBuyerContact');
        const quContactTypeB = KTUtil.getById('quContactTypeB');

        const quSellerID = KTUtil.getById('quSellerID');
        const quSellerName = KTUtil.getById('quSellerName');
        const quSellerAName = KTUtil.getById('quSellerAName');
        const quSellerAddress = KTUtil.getById('quSellerAddress');
        const quSellerEmail = KTUtil.getById('quSellerEmail');
        const quSellerContact = KTUtil.getById('quSellerContact');
        const quContactTypeS = KTUtil.getById('quContactTypeS');

        const quSubject = KTUtil.getById('quSubject');
        const quBody = KTUtil.getById('quBody');
        const quItemTable = KTUtil.getById('quItemTable');
        const quTermsCondition = KTUtil.getById('quTermsCondition');
        const quNumber = KTUtil.getById('quNumber');
        const quFooter = KTUtil.getById('quFooter');
        const quType = KTUtil.getById('quType');
        const quMeta = KTUtil.getById('quMeta');

        // intialising
        $(quDate).datepicker({
            placeholder: "Select Date"
        });

    // Dropdown List : Single Select1 With Search
    $('quContactTypeB').selectpicker({
    });
    // Dropdown List : Single Select1 With Search
    $('quContactTypeS').selectpicker({
    });
    // Dropdown List : Single Select1 With Search
    $('quType').selectpicker({
    });

        if (!createQuotationForm) {
            return;
        }

    FormValidation.formValidation(createQuotationForm, {
        fields: {
            quModuleRef: {
                validators: {
                    notEmpty: {
                        message: 'Module Reference is required',
                    },
                },
            },
            quHeader: {
                validators: {
                    notEmpty: {
                        message: 'Header is required',
                    },
                },
            },
            quDate: {
                validators: {
                    notEmpty: {
                        message: 'Date is required',
                    },
                },
            },
            quBuyerID: {
                validators: {
                    notEmpty: {
                        message: 'Buyer ID is required',
                    },
                },
            },
            quBuyerName: {
                validators: {
                    notEmpty: {
                        message: 'Buyer Name is required',
                    },
                },
            },
            quBuyerAddress: {
                validators: {
                    notEmpty: {
                        message: 'Buyer Address is required',
                    },
                },
            },
            quBuyerEmail: {
                validators: {
                    notEmpty: {
                        message: 'Buyer Email is required',
                    },
                },
            },
            quBuyerContact: {
                validators: {
                    notEmpty: {
                        message: 'Buyer Contact is required',
                    },
                },
            },
            quContactTypeB: {
                validators: {
                    notEmpty: {
                        message: 'Contact Tyoe is required',
                    },
                },
            },
            quSellerID: {
                validators: {
                    notEmpty: {
                        message: 'Seller Id is required',
                    },
                },
            },
            quSellerName: {
                validators: {
                    notEmpty: {
                        message: 'Seller Name is required',
                    },
                },
            },
            quSellerAName: {
                validators: {
                    notEmpty: {
                        message: 'Seller Attention Name is required',
                    },
                },
            },
            quSellerAddress: {
                validators: {
                    notEmpty: {
                        message: 'Seller Address is required',
                    },
                }, 
            },
            quSellerEmail: {
                validators: {
                    notEmpty: {
                        message: 'Seller Email is required',
                    },
                },
            },
            quSellerContact: {
                validators: {
                    notEmpty: {
                        message: 'Seller Contact is required',
                    },
                },
            },
            quContactTypeS: {
                validators: {
                    notEmpty: {
                        message: 'Contact Type is required',
                    },
                },
            },
            quSubject: {
                validators: {
                    notEmpty: {
                        message: 'Subject is required',
                    },
                },
            },
            quBody: {
                validators: {
                    notEmpty: {
                        message: 'Body is required',
                    },
                },
            },
            quItemTable: {
                validators: {
                    notEmpty: {
                        message: 'This Field is required',
                    },
                },
            },

            quTermsCondition: {
                validators: {
                    notEmpty: {
                        message: 'This Field is required',
                    },
                },
            },
            quFooter: {
                validators: {
                    notEmpty: {
                        message: 'Footer is required',
                    },
                },
            },
            quType: {
                validators: {
                    notEmpty: {
                        message: 'Type is required',
                    },
                },
            },
            quMeta: {
                validators: {
                    notEmpty: {
                        message: 'Meta is required',
                    },
                },
            },

            quNumber: {
                validators: {
                    notEmpty: {
                        message: 'Quotation No is required',
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
            quFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
    })
        .on('core.form.valid', function () {
            KTUtil.btnWait(quFormSubmitButton, _buttonSpinnerClasses, 'Please wait');

            // Accessing Restful API
            axios({
                method: 'post',
                url: `${HOST_URL}/api/v1/sales-finance/quotation`,
                data: {
                    moduleReference: quModuleRef.value,
                    header: quHeader.value,
                    date: quDate.value,
                    // buyerId: quBuyerID.value,
                    buyerName: quBuyerName.value,
                    // buyerAddress: quBuyerAddress.value,
                    buyerEmail: quBuyerEmail.value,
                    buyerContactNumber: (quBuyerContact.value) * 1,
                    buyerContactNumbertype: quContactTypeB.value,
                    // sellerId : quSellerID.value,
                    sellerName: quSellerName.value,
                    sellerAttentionName: quSellerAName.value,
                    // sellerAddress: quSellerAddress.value,
                    sellerEmail: quSellerEmail.value,
                    sellerContactNumber: (quSellerContact.value) * 1,
                    sellerContactNumbertype: quContactTypeS,
                    subject: quSubject.value,
                    body: quBody.value,
                    itemTable: quItemTable.value,
                    termsAndConditions: quTermsCondition.value,
                    footer: quFooter.value,
                    paymentMethod: {
                        type: quType.value,
                        // meta: quMeta.value
                    },
                    quotationNumber: (quNumber.value) * 1
                },
            }).then(function (res) {
                KTUtil.btnRelease(quFormSubmitButton);
                console.log(res)
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
        _createQuotationForm();
    },
};
})();

jQuery(document).ready(function () {
    QuotationCRUD.init();
});
