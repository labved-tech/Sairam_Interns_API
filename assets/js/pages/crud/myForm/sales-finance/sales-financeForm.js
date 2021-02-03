/* eslint-disable */
'use strict';

// Class definition
const SalesFinanceCRUD = (function () {
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
    const _createAddressForm = function () {

        // Getting Document related information
        const createAddressForm = KTUtil.getById('createAddressForm');
        const adFormSubmitButton = KTUtil.getById('adFormSubmitButton');
        const adAddress = KTUtil.getById('adAddress');
        const adCity = KTUtil.getById('adCity');
        const adState = KTUtil.getById('adState');
        const adCountry = KTUtil.getById('adCountry');
        const adPincode = KTUtil.getById('adPincode');

        if (!createAddressForm) {
            return;
        }

        FormValidation.formValidation(createAddressForm, {
            fields: {
                adAddress: {
                    validators: {
                        notEmpty: {
                            message: 'This field is required',
                        },
                    },
                },
                adCity: {
                    validators: {
                        notEmpty: {
                            message: 'This field is required',
                        },
                    },
                },
                adState: {
                    validators: {
                        notEmpty: {
                            message: 'This field is required',
                        },
                    },
                },
                adCountry: {
                    validators: {
                        notEmpty: {
                            message: 'This field is required',
                        },
                    },
                },
                adPincode: {
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
                adFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                KTUtil.btnWait(adFormSubmitButton, _buttonSpinnerClasses, 'Please wait');


                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/sales-finance/address`,
                    data: {
                        address: adAddress.value,
                        city: adCity.value,
                        state: adState.value,
                        country: adCountry.value,
                        pinCode: (adPincode.value) * 1
                    },
                }).then(function (res) {
                    KTUtil.btnRelease(adFormSubmitButton);
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

    const _createDeliveryNoteForm = function () {
        // Getting Document related information
        const createDeliveryNoteForm = KTUtil.getById('createDeliveryNoteForm');
        const dnFormSubmitButton = KTUtil.getById('dnFormSubmitButton');
        const dnPackingListNo = KTUtil.getById('dnPackingListNo');
        const dnTaxInvoiceNo = KTUtil.getById('dnTaxInvoiceNo');
        const dnSource = KTUtil.getById('dnSource');
        const dnSourceAddress = KTUtil.getById('dnSourceAddress');
        const dnSourceContact = KTUtil.getById('dnSourceContact');
        const dnSourceGST = KTUtil.getById('dnSourceGST');
        const dnCosignee = KTUtil.getById('dnCosignee');
        const dnCosigneeAddress = KTUtil.getById('dnCosigneeAddress');
        const dnCosigneeEmail = KTUtil.getById('dnCosigneeEmail');
        const dnCosigneeContact = KTUtil.getById('dnCosigneeContact');
        const dnCosigneeGST = KTUtil.getById('dnCosigneeGST');
        const dnBox = KTUtil.getById('dnBox');
        const dnShipMethod = KTUtil.getById('dnShipMethod');
        const dnCarrierName = KTUtil.getById('dnCarrierName');
        const dnTrackingNo = KTUtil.getById('dnTrackingNo');
        const dnShippingNotes = KTUtil.getById('dnShippingNotes');
        const dnReceivedBy = KTUtil.getById('dnReceivedBy');
        const dnFileProof = KTUtil.getById('dnFileProof');

    // Dropdown List : Single Select1 With Search
    $('dnShipMethod').selectpicker({
    });
        // Number : Number Controls Same Sides: Box Length
        $('#dnSourceGST').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',
      
            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '$'
          });  
        // Number : Number Controls Same Sides: Box Length
        $('#dnCosigneeGST').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',
      
            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '$'
          });  


        if (!createDeliveryNoteForm) {
            return;
        }

        FormValidation.formValidation(createDeliveryNoteForm, {
            fields: {
                dnPackingListNo: {
                    validators: {
                        notEmpty: {
                            message: 'Packing List No  is required',
                        },
                    },
                },
                dnTaxInvoiceNo: {
                    validators: {
                        notEmpty: {
                            message: 'Tax Invoice No is required',
                        },
                    },
                },
                dnSource: {
                    validators: {
                        notEmpty: {
                            message: 'Source is required',
                        },
                    },
                },
                dnSourceAddress: {
                    validators: {
                        notEmpty: {
                            message: 'Source Address is required',
                        },
                    },
                },
                dnSourceContact: {
                    validators: {
                        notEmpty: {
                            message: 'Source Contact is required',
                        },
                    },
                },
                dnSourceGST: {
                    validators: {
                        notEmpty: {
                            message: 'Source GST is required',
                        },
                    },
                },
                dnCosignee: {
                    validators: {
                        notEmpty: {
                            message: 'Cosignee is required',
                        },
                    },
                },
                dnCosigneeAddress: {
                    validators: {
                        notEmpty: {
                            message: 'Address is required',
                        },
                    },
                },
                dnCosigneeEmail: {
                    validators: {
                        notEmpty: {
                            message: 'Email is required',
                        },
                    },
                },
                dnCosigneeContact: {
                    validators: {
                        notEmpty: {
                            message: ' Contact is required',
                        },
                    },
                },
                dnCosigneeGST: {
                    validators: {
                        notEmpty: {
                            message: 'Cosignee GST is required',
                        },
                    },
                },
                dnBox: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                        },
                    },
                },
                dnShipMethod: {
                    validators: {
                        notEmpty: {
                            message: 'Ship Method is required',
                        },
                    },
                },
                dnCarrierName: {
                    validators: {
                        notEmpty: {
                            message: 'Carrier Name is required',
                        },
                    },
                },
                dnTrackingNo: {
                    validators: {
                        notEmpty: {
                            message: 'Tracking No is required',
                        },
                    },
                },
                dnShippingNotes: {
                    validators: {
                        notEmpty: {
                            message: 'Notes is required',
                        },
                    },
                },
                dnReceivedBy: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                        },
                    },
                },
                dnFileProof: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
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
                dnFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                KTUtil.btnWait(dnFormSubmitButton, _buttonSpinnerClasses, 'Please wait');


                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/sales-finance/delivery-note`,
                    data: {
                        packingListnumber: (dnPackingListNo.value) * 1,
                        taxInvoiceNumber: (dnTaxInvoiceNo.value) * 1,
                        source: dnSource.value,
                        sourceAddress: dnSourceAddress.value,
                        sourceContactNumber: dnSourceContact.value,
                        sourceGstin: dnSourceGST.value,
                        consignee: dnCosignee.value,
                        consigneeAddress: dnCosigneeAddress.value,
                        consigneeEmail: dnCosigneeEmail.value,
                        consigneeContactNumber: dnCosigneeContact.value,
                        consigneeGstin: dnCosigneeGST.value,
                        box: dnBox.value,
                        shipMethod: dnShipMethod.value,
                        carrierName: dnCarrierName.value,
                        carrierTrackingNumber: dnTrackingNo.value,
                        shippingNotes: dnShippingNotes.value,
                        receivedBy: dnReceivedBy.value,
                        fileProof: dnFileProof.value
                    },
                }).then(function (res) {
                    KTUtil.btnRelease(dnFormSubmitButton);
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
    const _createPackingListForm = function () {
        // Getting Document related information
        const createPackingListForm = KTUtil.getById('createPackingListForm');
        const plFormSubmitButton = KTUtil.getById('plFormSubmitButton');
        const plPackingListNo = KTUtil.getById('plPackingListNo');
        const plTaxInvoiceNo = KTUtil.getById('plTaxInvoiceNo');
        const plSource = KTUtil.getById('plSource');
        const plSourceEmail = KTUtil.getById('plSourceEmail');
        const plSourceAddress = KTUtil.getById('plSourceAddress');
        const plSourceContact = KTUtil.getById('plSourceContact');
        const plSourceGST = KTUtil.getById('plSourceGST');
        const plCosignee = KTUtil.getById('plCosignee');
        const plCosigneeAddress = KTUtil.getById('plCosigneeAddress');
        const plCosigneeEmail = KTUtil.getById('plCosigneeEmail');
        const plCosigneeContact = KTUtil.getById('plCosigneeContact');
        const plCosigneeGST = KTUtil.getById('plCosigneeGST');

        // Number : Number Controls Same Sides:Source GST
        $('#plSourceGST').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',
      
            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '$'
          });  
        // Number : Number Controls Same Sides: Cosignee GST
        $('#plCosigneeGST').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',
      
            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '$'
          });  

       
      

        if (!createPackingListForm) {
            return;
        }

        FormValidation.formValidation(createPackingListForm, {
            fields: {
                 plPackingListNo: {
                     validators: {
                         notEmpty: {
                             message: 'Packing List No  is required',
                         },
                     },
                 },
                 plTaxInvoiceNo: {
                     validators: {
                         notEmpty: {
                             message: 'Tax Invoice No is required',
                         },
                     },
                 },
                 plSource: {
                     validators: {
                         notEmpty: {
                             message: 'Source is required',
                         },
                     },
                 },
                 plSourceEmail: {
                     validators: {
                         notEmpty: {
                             message: 'Email is required',
                         },
                     },
                 },

                 plSourceAddress: {
                     validators: {
                         notEmpty: {
                             message: 'Source Address is required',
                         },
                     },
                 },
                 plSourceContact: {
                     validators: {
                         notEmpty: {
                             message: 'Source Contact is required',
                         },
                     },
                 },
                 plSourceGST: {
                     validators: {
                         notEmpty: {
                             message: 'Source GST is required',
                         },
                     },
                 },
                 plCosignee: {
                     validators: {
                         notEmpty: {
                             message: 'Cosignee is required',
                         },
                     },
                 },
                 plCosigneeAddress: {
                     validators: {
                         notEmpty: {
                             message: 'Address is required',
                         },
                     },
                 },
                 plCosigneeEmail: {
                     validators: {
                         notEmpty: {
                             message: 'Email is required',
                         },
                     },
                 },
                 plCosigneeContact: {
                     validators: {
                         notEmpty: {
                             message: ' Contact is required',
                         },
                     },
                 },
                 plCosigneeGST: {
                     validators: {
                         notEmpty: {
                             message: 'Cosignee GST is required',
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
                plFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                KTUtil.btnWait(plFormSubmitButton, _buttonSpinnerClasses, 'Please wait');


                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/sales-finance/packing-list`,
                    data: {
                        packingListnumber: (plPackingListNo.value) * 1,
                        taxInvoiceNumber: (plTaxInvoiceNo.value) * 1,
                        source: plSource.value,
                        // sourceAddress: plSourceAddress.value,
                        sourceEmail: plSourceEmail.value,
                        sourceContactNumber: plSourceContact.value,
                        sourceGstin: (plSourceGST.value) * 1,
                        consignee: plCosignee.value,
                        // consigneeAddress: plCosigneeAddress.value,
                        consigneeEmail: plCosigneeEmail.value,
                        consigneeContactNumber: plCosigneeContact.value,
                        consigneeGstin: plCosigneeGST.value,
                    },
                }).then(function (res) {
                    KTUtil.btnRelease(plFormSubmitButton);
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
    const _createTaxInvoiceForm = function () {
        // Getting Document related information
        const createTaxInvoiceForm = KTUtil.getById('createTaxInvoiceForm ');
        const tiFormSubmitButton = KTUtil.getById('tiFormSubmitButton');
        const tiNo = KTUtil.getById('tiNo');
        const tiHeader = KTUtil.getById('tiHeader');
        const tiDate = KTUtil.getById('tiDate');
        const tiOrderID = KTUtil.getById('tiOrderID');
        const tiOrderDate = KTUtil.getById('tiOrderDate');
        const tiBuyerID = KTUtil.getById('tiBuyerID');
        const tiBillingName = KTUtil.getById('tiBillingName');
        const tiBillingAddress = KTUtil.getById('tiBillingAddress');
        const tiBillingEmail = KTUtil.getById('tiBillingEmail');
        const tiBillingContact = KTUtil.getById('tiBillingContact');
        const tiBillingGST = KTUtil.getById('tiBillingGST');
        const tiCosigneeName = KTUtil.getById('tiCosigneeName');
        const tiCosigneeAddress = KTUtil.getById('tiCosigneeAddress');
        const tiCosigneeContact = KTUtil.getById('tiCosigneeContact');
        const tiSellerID = KTUtil.getById('tiSellerID');
        const tiSellerName = KTUtil.getById('tiSellerName');
        const tiSellerAddress = KTUtil.getById('tiSellerAddress');
        const tiSellerContact = KTUtil.getById('tiSellerContact');
        const tiTrackingNo = KTUtil.getById('tiTrackingNo');
        const tiCarrierCharge = KTUtil.getById('tiCarrierCharge');
        const tiAccNo = KTUtil.getById('tiAccNo');
        const tiBankName = KTUtil.getById('tiBankName');
        const tiBankIFSC = KTUtil.getById('tiBankIFSC');
        const tibeforeTax = KTUtil.getById('tibeforeTax');
        const tiCGSTTotal = KTUtil.getById('tiCGSTTotal');
        const tiSGSTTotal = KTUtil.getById('tiSGSTTotal');
        const tiIGSTTotal = KTUtil.getById('tiIGSTTotal');
        const tiGrandTotal = KTUtil.getById('tiGrandTotal');
        const tiTermsCondition = KTUtil.getById('tiTermsCondition');
        const tiFooter = KTUtil.getById('tiFooter');
        const tiMeta = KTUtil.getById('tiMeta');
        const tiSource = KTUtil.getById('tiSource');

        // intialising
        $(tiDate).datepicker({
            placeholder: "Select Date"
        });

        $(tiOrderDate).datepicker({
            placeholder: "Select Date"
        });



        if (!createTaxInvoiceForm) {
            return;
        }

        FormValidation.formValidation(createTaxInvoiceForm, {
            fields: {
                tiOrderID: {
                    validators: {
                        notEmpty: {
                            message: 'Order Id is required',
                        },
                    },
                },
                tiBuyerID: {
                    validators: {
                        notEmpty: {
                            message: 'Buyer Id is required',
                        },
                    },
                },
                tiBillingAddress: {
                    validators: {
                        notEmpty: {
                            message: 'Address is required',
                        },
                    },
                },
                tiCosigneeAddress: {
                    validators: {
                        notEmpty: {
                            message: 'Address is required',
                        },
                    },
                },
                tiSellerID: {
                    validators: {
                        notEmpty: {
                            message: 'Seller Id is required',
                        },
                    },
                },
                tiSellerAddress: {
                    validators: {
                        notEmpty: {
                            message: 'Address is required',
                        },
                    },
                },
                tiTermsCondition: {
                    validators: {
                        notEmpty: {
                            message: 'Terms and Condition is required',
                        },
                    },
                },
                tiMeta: {
                    validators: {
                        notEmpty: {
                            message: 'Meta is required',
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
                tiFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                KTUtil.btnWait(tiFormSubmitButton, _buttonSpinnerClasses, 'Please wait');

                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/sales-finance/tax-invoice`,
                    data: {
                        taxInvoiceNo: tiNo.value,
                        header: tiHeader.value,
                        date: tiDate.value,
                        // _orderId: tiOrderID.value,
                        orderDate: tiOrderDate.value,
                        // _buyerId: tiBuyerID.value,                        
                        billingName: tiBillingName.value,
                        // billingAddress: tiBillingAddress.value, 
                        billingEmail :tiBillingEmail.value,
                        contactNumber: (tiBillingContact.value) * 1,
                        billingGSTIN: tiBillingGST.value,
                        // consigneeAddress: tiCosigneeAddress.value,
                        consigneeName: tiCosigneeName.value,
                        consigneeContactNumber: (tiCosigneeContact.value)*1,
                         // _sellerId: tiSellerID.value, 
                         sellerName: tiSellerName.value,
                        // sellerAddress: tiSellerAddress.value, 
                        sellerContactNumber :(tiSellerContact.value)*1,  
                        carrierTrackingNo : tiTrackingNo.value,
                        carrierCharges:(tiCarrierCharge.value)*1,  
                        paymentMeta: {
                            accountNo: tiAccNo.value,
                            bankName: tiBankName.value,
                            bankIFSC: tiBankIFSC.value,
                          },
                          totalBeforeTax: (tibeforeTax.value)*1,
                          CGSTTotal: (tiCGSTTotal.value)*1,
                          SGSTTotal: (tiSGSTTotal.value)*1,
                          IGSTTotal: (tiIGSTTotal.value)*1,
                          grandTotal: (tiGrandTotal.value)*1,
                        //   termsAndConditions: tiTermsCondition.value,
                          footer: tiFooter.value,
                        //   meta: tiMeta.value,
                          source: tiSource.value,          
                        
                    },

                    }).then(function (res) {
                    KTUtil.btnRelease(dnFormSubmitButton);
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
    const _createPackingListBoxForm = function () {

        // Getting Document related information
        const createPackingListBoxForm = KTUtil.getById('createPackingListBoxForm');
        const plBoxFormSubmitButton = KTUtil.getById('plBoxFormSubmitButton');
        const plBoxNo = KTUtil.getById('plBoxNo');
        const plBoxlength = KTUtil.getById('plBoxlength');
        const plBoxBreadth = KTUtil.getById('plBoxBreadth');
        const plBoxWidth = KTUtil.getById('plBoxWidth');
        const plBoxUnits = KTUtil.getById('plBoxUnits');
        const plBoxWeight = KTUtil.getById('plBoxWeight');
        const plBoxWeightUnits = KTUtil.getById('plBoxWeightUnits');
        // Number : Number Controls Same Sides: Box Length
        $('#plBoxlength').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',
      
            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: ''
          });  
        // Number : Number Controls Same Sides: Box Breadth
        $('#plBoxBreadth').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',
      
            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: ''
          });  
        // Number : Number Controls Same Sides: Box Width
        $('#plBoxWidth').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',
      
            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: ''
          });  
        // Number : Number Controls Same Sides: Box Weight
        $('#plBoxWeight').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',
      
            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: ''
          });  
    // Dropdown List : Single Select1 With Search
    $('plBoxUnits').selectpicker({
    });
    // Dropdown List : Single Select1 With Search
    $('plBoxWeightUnits').selectpicker({
    });
        


        if (!createPackingListBoxForm) {
            return;
        }

        FormValidation.formValidation(createPackingListBoxForm, {
            fields: {
                plBoxNo: {
                    validators: {
                        notEmpty: {
                            message: 'Box No is required',
                        },
                    },
                },

                plBoxlength: {
                    validators: {
                        notEmpty: {
                            message: 'Length is required',
                        },
                    },
                },
                plBoxBreadth: {
                    validators: {
                        notEmpty: {
                            message: 'Breadth is required',
                        },
                    },
                },
                plBoxWidth: {
                    validators: {
                        notEmpty: {
                            message: 'Box Width is required',
                        },
                    },
                },
                plBoxWeight: {
                    validators: {
                        notEmpty: {
                            message: 'Weight is required',
                        },
                    },
                },
                plBoxUnits: {
                    validators: {
                        notEmpty: {
                            message: 'Units is required',
                        },
                    },
                },
                plBoxWeightUnits: {
                    validators: {
                        notEmpty: {
                            message: 'Weight Units is required',
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
                plBoxFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                KTUtil.btnWait(plBoxFormSubmitButton, _buttonSpinnerClasses, 'Please wait');


                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/sales-finance/packing-list`,
                    data: {
                        boxNumber :(plBoxNo.value)*1,
                        length: (plBoxlength.value)*1,
                        breadth: (plBoxBreadth.value)*1,
                        width: (plBoxWidth.value)*1,
                        units: plBoxUnits.value,
                        weight: (plBoxWeight.value) * 1,
                        weightUnit: plBoxWeightUnits.value,
                    },
                }).then(function (res) {
                    KTUtil.btnRelease(plBoxFormSubmitButton);
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
    const _createPackingListItemForm = function () {

        // Getting Document related information
        const createPackingListItemForm = KTUtil.getById('createPackingListItemForm');
        const plItemFormSubmitButton = KTUtil.getById('plItemFormSubmitButton');
        const plItemCode = KTUtil.getById('plItemCode');
        const plName = KTUtil.getById('plName');
        const plQuantity = KTUtil.getById('plQuantity');
        const plItemUnits = KTUtil.getById('plItemUnits');
        const plBoxMeta = KTUtil.getById('plBoxMeta');

        // Number : Number Controls Same Sides: Quantity
        $('#plQuantity').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',
      
            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: ''
          }); 
    // Dropdown List : Single Select1 With Search
    $('plItemUnits').selectpicker({
    });
        


        if (!createPackingListItemForm) {
            return;
        }

        FormValidation.formValidation(createPackingListItemForm, {
            fields: {
                plItemCode: {
                    validators: {
                        notEmpty: {
                            message: 'Item Code is required',
                        },
                    },
                },
                plName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                        },
                    },
                },
                plQuantity: {
                    validators: {
                        notEmpty: {
                            message: 'Quantity is required',
                        },
                    },
                },
                plBoxMeta: {
                    validators: {
                        notEmpty: {
                            message: 'Box Meta is required',
                        },
                    },
                },
                plItemUnits: {
                    validators: {
                        notEmpty: {
                            message: 'Units is required',
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
                plItemFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                KTUtil.btnWait(plItemFormSubmitButton, _buttonSpinnerClasses, 'Please wait');


                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/sales-finance/packing-list`,
                    data: {
                        itemCode :plItemCode.value,
                        name: plName.value,
                        quantity: (plQuantity.value)*1,
                        unitOfMeasurement: plItemUnits.value,
                        boxmeta: plBoxMeta.value,
                    },
                }).then(function (res) {
                    KTUtil.btnRelease(plItemFormSubmitButton);
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

    const _createPackingListShippingForm = function () {

        // Getting Document related information
        const createPackingListShippingForm = KTUtil.getById('createPackingListShippingForm');
        const plShippingFormSubmitButton = KTUtil.getById('plShippingFormSubmitButton');
        const plShippingMethod = KTUtil.getById('plShippingMethod');
        const plCarrierName = KTUtil.getById('plCarrierName');
        const plCarrierTrackingNo = KTUtil.getById('plCarrierTrackingNo');
        const plShippingNotes = KTUtil.getById('plShippingNotes');
        const plFileProof = KTUtil.getById('plFileProof');


    // Dropdown List : Single Select1 With Search
    $('plShippingMethod').selectpicker({
    });
        


        if (!createPackingListShippingForm) {
            return;
        }

        FormValidation.formValidation(createPackingListShippingForm, {
            fields: {
                plShippingMethod: {
                    validators: {
                        notEmpty: {
                            message: 'Shipping Method is required',
                        },
                    },
                },
                plCarrierName: {
                    validators: {
                        notEmpty: {
                            message: 'Carrier Name is required',
                        },
                    },
                },
                plCarrierTrackingNo: {
                    validators: {
                        notEmpty: {
                            message: ' Carrier Tracking No is required',
                        },
                    },
                },
                plShippingNotes: {
                    validators: {
                        notEmpty: {
                            message: 'Shipping Notes is required',
                        },
                    },
                },
                plFileProof: {
                    validators: {
                        notEmpty: {
                            message: 'File Proof is required',
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
                plShippingFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                KTUtil.btnWait(plShippingFormSubmitButton, _buttonSpinnerClasses, 'Please wait');


                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/sales-finance/packing-list`,
                    data: {
                        shipMethod :plShippingMethod.value,
                        carrierName: plCarrierName.value,
                        carrierTrackingNumber: plCarrierTrackingNo.value,
                        shippingNotes: plShippingNotes.value,
                        fileProof: plFileProof.value,
                    },
                }).then(function (res) {
                    KTUtil.btnRelease(plShippingFormSubmitButton);
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
    const _createTaxItemForm = function () {
        // Getting Document related information
        const createTaxItemForm = KTUtil.getById('createTaxItemForm');
        const tiItemFormSubmitButton = KTUtil.getById('tiItemFormSubmitButton');
        const tiItemCode = KTUtil.getById('tiItemCode');
        const tiSerialNo = KTUtil.getById('tiSerialNo');
        const tiName = KTUtil.getById('tiName');
        const tiQuantity = KTUtil.getById('tiQuantity');
        const tiItemUnits = KTUtil.getById('tiItemUnits');
        const tiUnitPrice = KTUtil.getById('tiUnitPrice');
        const tiDiscount = KTUtil.getById('tiDiscount');
        const tiDiscountRate = KTUtil.getById('tiDiscountRate');
        const tiTaxValue = KTUtil.getById('tiTaxValue');
        const tiCGSTRate = KTUtil.getById('tiCGSTRate');
        const tiCGSTAmt = KTUtil.getById('tiCGSTAmt');
        const tiSGSTRate = KTUtil.getById('tiSGSTRate');
        const tiSGSTAmt = KTUtil.getById('tiSGSTAmt');
        const tiIGSTRate = KTUtil.getById('tiIGSTRate');
        const tiIGSTAmt = KTUtil.getById('tiIGSTAmt');
        const tiTotalPrice = KTUtil.getById('tiTotalPrice');
        // Dropdown List : Single Select1 With Search
        $('tiItemUnits').selectpicker({
        });

        // Number : Number Controls Same Sides: Quantity
        $('#tiQuantity').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',

            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: ''
        });
        // Number : Number Controls Same Sides: Discount
        $('#tiDiscount').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',

            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '$'
        });
        // Number : Number Controls Same Sides: CGST Rate
        $('#tiCGSTRate').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',

            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '%'
        });
        // Number : Number Controls Same Sides: CGST Amount
        $('#tiCGSTAmt').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',

            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '$'
        });
        // Number : Number Controls Same Sides: SGST Rate
        $('#tiSGSTRate').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',

            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '%'
        });
        // Number : Number Controls Same Sides: SGST Amount
        $('#tiSGSTAmt').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',

            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '$'
        });
        // Number : Number Controls Same Sides: Discount Rate
        $('#tiDiscountRate').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',

            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '%'
        });
        // Number : Number Controls Same Sides: Tax Value
        $('#tiTaxValue').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',

            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '$'
        });
        // Number : Number Controls Same Sides: IGST Rate
        $('#tiIGSTRate').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',

            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '%'
        });
        // Number : Number Controls Same Sides: IGST Amount
        $('#tiIGSTAmt').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',

            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '$'
        });
        // Number : Number Controls Same Sides: Unit Price
        $('#tiUnitPrice').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',

            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '$'
        });




        if (!createTaxItemForm) {
            return;
        }

        FormValidation.formValidation(createTaxItemForm, {
            fields: {
                tiItemCode: {
                    validators: {
                        notEmpty: {
                            message: 'Item Code  is required',
                        },
                    },
                },
                tiSerialNo: {
                    validators: {
                        notEmpty: {
                            message: 'Serial No  is required',
                        },
                    },
                },
                tiName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                        },
                    },
                },
                tiQuantity: {
                    validators: {
                        notEmpty: {
                            message: 'Quantity is required',
                        },
                    },
                },
                tiItemUnits: {
                    validators: {
                        notEmpty: {
                            message: 'Units is required',
                        },
                    },
                },
                tiUnitPrice: {
                    validators: {
                        notEmpty: {
                            message: 'Unit Price is required',
                        },
                    },
                },
                tiDiscount: {
                    validators: {
                        notEmpty: {
                            message: 'Discount is required',
                        },
                    },
                },
                tiDiscountRate: {
                    validators: {
                        notEmpty: {
                            message: 'Discount Rate is required',
                        },
                    },
                },
                tiTaxValue: {
                    validators: {
                        notEmpty: {
                            message: 'Tax Value is required',
                        },
                    },
                },
                tiCGSTRate: {
                    validators: {
                        notEmpty: {
                            message: 'CGST Rate is required',
                        },
                    },
                },
                tiCGSTAmt: {
                    validators: {
                        notEmpty: {
                            message: 'CGST Amount is required',
                        },
                    },
                },
                tiSGSTRate: {
                    validators: {
                        notEmpty: {
                            message: 'SGST Rate is required',
                        },
                    },
                },
                tiSGSTAmt: {
                    validators: {
                        notEmpty: {
                            message: 'SGST Amount is required',
                        },
                    },
                },
                tiIGSTRate: {
                    validators: {
                        notEmpty: {
                            message: 'IGST Rate is required',
                        },
                    },
                },
                tiIGSTAmt: {
                    validators: {
                        notEmpty: {
                            message: 'IGST Amount is required',
                        },
                    },
                },
                tiTotalPrice: {
                    validators: {
                        notEmpty: {
                            message: 'Total Price is required',
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
                tiItemFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        })
            .on('core.form.valid', function () {
                KTUtil.btnWait(tiItemFormSubmitButton, _buttonSpinnerClasses, 'Please wait');


                // Accessing Restful API
                axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/sales-finance/tax-invoice`,
                    data: {
                        serialNo: tiSerialNo.value,
                        itemCode: tiItemCode.value,
                        name: tiName.value,
                        quantity: (tiQuantity.value) * 1,
                        unitofMeasurement: tiItemUnits.value,
                        unitPrice: (tiUnitPrice.value) * 1,
                        dicount: (tiDiscount.value) * 1,
                        discountRate: (tiDiscountRate.value) * 1,
                        taxableValue: (tiTaxValue.value) * 1,
                        CGSTRate: (tiCGSTRate.value) * 1,
                        CGSTAmount: (tiCGSTAmt.value) * 1,
                        SGSTRate: (tiSGSTRate.value) * 1,
                        SGSTAmount: (tiSGSTAmt.value) * 1,
                        IGSTRate: (tiIGSTRate.value) * 1,
                        IGSTAmount: (tiIGSTAmt.value) * 1,
                        totalPrice: (tiTotalPrice.value) * 1,

                    },
                }).then(function (res) {
                    KTUtil.btnRelease(tiItemFormSubmitButton);
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
        }


    return {
        // public functions
        init: function () {
            _createAddressForm();
            _createDeliveryNoteForm();
            _createPackingListForm();
            _createTaxInvoiceForm();
            _createPackingListBoxForm();
            _createPackingListItemForm();
            _createPackingListShippingForm();
            _createTaxItemForm();

        },
    };
})();


jQuery(document).ready(function () {
    SalesFinanceCRUD.init();
});



