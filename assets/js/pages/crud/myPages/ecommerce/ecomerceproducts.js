/* eslint-disable */
'use strict';

/* Class definition */
const EcommerceCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    /*   Private functions */
    function _EcommerceProducts() {
        var dataSet;

        /* Table Options */
        const options = {
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: 'get',
                        url: `${HOST_URL}/api/v1/ecommerce/products/table`,
                        params: {
                            fields: '_id, manufacturerPartNo, name, description, categoryId,unitPrice,MRP, note,ranking,maxQuantityPerOrderNumber,sellerId,_reviewAttributeId,status,HSNCode, createdBy,createdAt,updatedAt',
                        },
                        map: function (raw) {
                            // sample data mapping
                            console.log('raw', raw);
                            dataSet = raw;

                            if (typeof raw.ecommerceProducts !== 'undefined') {
                                dataSet = raw.ecommerceProducts;
                                console.log('dataSet', dataSet);
                            }
                            return dataSet;
                        }

                    },
                },
                pageSize: 10,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                //autoColumns: true,  // newly added
            },

            // layout definition
            layout: {
                scroll: true, // enable/disable datatable scroll both horizontal and
                footer: false, // display/hide footer
                height: 450,

            },

            // column sorting
            sortable: true,

            pagination: true,
            search: {
                input: $('#kt_datatable_search_query_2'),
                key: 'generalSearch',
            },

            // columns definition
            columns: [
                {
                    field: '_id',
                    title: '#',
                    sortable: false,
                    width: 20,
                    selector: {
                        class: '',
                    },
                    textAlign: 'center',
                },
                {
                    field: 'manufacturerPartNo',
                    title: 'Manufacturer Part No',
                },
                {
                    field: 'name',
                    title: 'Name',
                },
                {
                    field: 'description',
                    title: 'Description',
                },
                {
                    field: 'categoryId',
                    title: 'Category Id',
                },
                {
                    field: 'unitPrice',
                    title: 'UnitPrice',
                },
                {
                    field: 'MRP',
                    title: 'MRP',
                },
                {
                    field: 'note',
                    title: 'Note',
                },

                {
                    field: 'ranking',
                    title: 'Ranking',
                },
                {
                    field: 'maxQuantityPerOrderNumber',
                    title: 'Max Quantity Per Order No',
                },
                {
                    field: 'sellerId',
                    title: 'Seller Id',
                },
                {
                    field: '_reviewAttributeId',
                    title: 'Review Attribute Id',
                },
                {
                    field: 'status',
                    title: 'Status',
                },
                {
                    field: 'HSNCode',
                    title: 'HSN Code ',
                },

                {
                    field: 'createdBy',
                    title: 'createdBy',
                },
                {
                    field: 'createdAt',
                    title: 'createdAt',
                },
                {
                    field: 'updatedAt',
                    title: 'updatedAt',
                },
                {
                    field: 'details',
                    title: 'Details',
                    textAlign: 'center',
                    //width: 100,
                    sortable: false,
                    template: function () {
                        return '\
            <a href="#" class="btn btn-sm btn-light" role="button">\
              view details\
            </a >\
          '
                            ;
                    },
                },
                {
                    field: 'Actions',
                    title: 'Actions',
                    sortable: false,
                    width: 125,
                    overflow: 'visible',
                    autoHide: false,
                    template: function () {
                        return '\
                      <div class="dropdown dropdown-inline">\
                          <a href="javascript:;" class="btn btn-sm btn-clean btn-icon mr-2" data-toggle="dropdown">\
                            <i class="fas fa-cog">\
                            </i>\
                          </a>\
                          <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
                              <ul class="navi flex-column navi-hover py-2">\
                                  <li class="navi-header font-weight-bolder text-uppercase font-size-xs text-primary pb-2">\
                                      Choose an action:\
                                  </li>\
                                  <li class="navi-item">\
                                      <a href="#" class="navi-link">\
                                          <span class="navi-icon"><i class="fas fa-print"></i></span>\
                                          <span class="navi-text">Print</span>\
                                      </a>\
                                  </li>\
                                  <li class="navi-item">\
                                      <a href="#" class="navi-link">\
                                          <span class="navi-icon"><i class="fas fa-copy"></i></span>\
                                          <span class="navi-text">Copy</span>\
                                      </a>\
                                  </li>\
                                  <li class="navi-item">\
                                      <a href="#" class="navi-link">\
                                          <span class="navi-icon"><i class="fas fa-file-excel"></i></span>\
                                          <span class="navi-text">Excel</span>\
                                      </a>\
                                  </li>\
                                  <li class="navi-item">\
                                      <a href="#" class="navi-link">\
                                          <span class="navi-icon"><i class="fas fa-file-csv"></i></span>\
                                          <span class="navi-text">CSV</span>\
                                      </a>\
                                  </li>\
                                  <li class="navi-item">\
                                      <a href="#" class="navi-link">\
                                          <span class="navi-icon"><i class="fas fa-file-pdf"></i></span>\
                                          <span class="navi-text">PDF</span>\
                                      </a>\
                                  </li>\
                              </ul>\
                          </div>\
                      </div>\
                      <a href="javascript:;" class="btn btn-sm btn-clean btn-icon mr-2" title="Edit details">\
                        <i class="far fa-edit">\
                        </i>\
                      </a>\
                      <a href="javascript:;" class="btn btn-sm btn-clean btn-icon" title="Delete">\
                        <i class="far fa-trash-alt">\
                        </i>\
                      </a>\
                  ';
                    },
                },
            ],
        }
        /* Table Initialize */
        const datatable = $('#tableEp').KTDatatable(options);

        /* Form */
        const EpForm = document.querySelector('#formEp');
        let FormSubmitButton = document.querySelector('#btnAddNewEpFormSubmitButton');
        // Options
        let formOptions = {
            fields: {
                eaAddress1: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                        },
                    },
                },
                eaStreet: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                        },
                    },
                },
                eaCity: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                        },
                    },
                },
                eaState: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                        },
                    },
                },
                eaCountry: {
                    validators: {
                        notEmpty: {
                            message: 'This Field is required',
                        },
                    },
                },
                eaPostalCode: {
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
                createEcommerceAddressFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },

        };

        let fv;

        /* Search Operations */
        // search based on status
        $('#tableEp_search_status_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });

        // search based on type
        $('#tableEp_search_type_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#tableEp_search_status_2, #tableEp_search_type_2').selectpicker();


        // modal open
        $('#btnOpenEpModal').on('click', async function (e) {
            console.log('openButton is clicked');

            // enabling disabling buttons
            $('#btnAddNewEpFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
            $('#btnSaveEpFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

            FormSubmitButton = document.querySelector('#btnAddNewEpFormSubmitButton');

            $('#modalEp').modal('show');   // open modal

            $('#modalEp').find('.modal-title').text('Add New Entries'); // Setting title for modal

        });

        // modal post closed
        $('#modalEp').on('hidden.bs.modal', function (e) {
            console.log('Modal closed');

            if (fv) {
                // clearing forms
                fv.resetForm();
                fv.destroy();
            }

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            // clearing fields
            $("#formEp").trigger('reset'); // clear form fields

            // manually resetting other fields
            $('#epExpires').empty().trigger('change');  // clearing select2  */

        });

        // modal post opened
        $('#modalEp').on('shown.bs.modal', function (e) {
            console.log('Modal open');

            // Initializing
            // Number : Number Controls Same Sides: Unit Price
            $('#epUnitPrice').TouchSpin({
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
            // Number : Number Controls Same Sides: Max Quantity
            $('#epMaxQtyNo').TouchSpin({
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
        });

        // form reset operation
        $('#formEp').on('click', '.btnReset', function (e) {
            // console.log('btnResetMenuSectionForm is clicked');

            if (fv) {
                // clearing forms
                fv.resetForm();
                fv.destroy();
            }
            else {
                // initiate validation
                fv = FormValidation.formValidation(menuSectionForm, formOptions);
            }

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            // clearing fields
            $("#formEp").trigger('reset'); // clear form fields

            // clear manually
            // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
        })

        // form add operation
        $('#formEp').on('click', '.btnAdd', function (e) {
            // console.log('btnCreate is clicked');

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            FormSubmitButton = document.querySelector('#btnAddNewEpFormSubmitButton');

            // Validation
            fv = FormValidation.formValidation(EpForm, formOptions);

            // validation failed
            fv.on('core.form.invalid', async function () {
                // console.log('Something went wrong!!');    
            });

            // validation successful
            fv.on('core.form.valid', async function () {

                // Show loading state on button
                KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

                // Accessing Restful API
                await axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/ecommerce/products`,
                    data: {
                        title: document.querySelector('#aeTitle').value,
                        message: $('#aeMessage').summernote('code'),   // not working - Summernote WYSIWYG
                        from: document.querySelector('#aeFrom').value,
                        isEmailReq: document.querySelector('#aeIsEmailReq').value,   //if(aeIsEmailReq.value=== 'on') return true
                        priority: document.querySelector('#aePriority').value * 1,
                        expires: document.querySelector('#aeExpires').value,
                    },
                }).then(function (res) {

                    // Return valid JSON
                    // console.log(res);

                    // Release button
                    KTUtil.btnRelease(FormSubmitButton);

                    if (res.data.status == 'success') {
                        // reseting & clearing
                        $('#modalEp').modal('hide')  // hiding modal form
                        toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                        $('#tableEp').KTDatatable().reload(); // reload table
                    }
                    else if (res.data.status == 'error') {
                        $('#modalEp').modal('hide')  // hiding modal form
                        toastr.error(`${res.data.message}`, `${res.data.status}`)
                    }
                    else {
                        $('#modalEp').modal('hide')
                    };
                });
            });
        });

        // form save operation
        $('#formEp').on('click', '.btnSave', function (e) {
            console.log('btnSave is clicked');

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            FormSubmitButton = document.querySelector('#btnSaveEpFormSubmitButton');

            // Validation
            fv = FormValidation.formValidation(EpForm, formOptions);

            // validation failed
            fv.on('core.form.invalid', async function () {
                // console.log('Something went wrong!!');    
            });

            // validation successful
            fv.on('core.form.valid', async function () {

                const id = document.querySelector('#epId').value;

                // Show loading state on button
                KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

                // Accessing Restful API
                await axios({
                    method: 'patch',
                    url: `${HOST_URL}/api/v1/ecommerce/products/${id}`,
                    data: {
                        title: document.querySelector('#aeTitle').value,
                        message: $('#aeMessage').summernote('code'),   // not working - Summernote WYSIWYG
                        from: document.querySelector('#aeFrom').value,
                        isEmailReq: document.querySelector('#aeIsEmailReq').value,   //if(aeIsEmailReq.value=== 'on') return true
                        priority: document.querySelector('#aePriority').value * 1,
                        expires: document.querySelector('#aeExpires').value,
                    },
                }).then(function (res) {
                    // Return valid JSON
                    // console.log(res);

                    // Release button
                    KTUtil.btnRelease(FormSubmitButton);

                    if (res.data.status == 'success') {
                        // reseting & clearing
                        $('#modalEp').modal('hide')  // hiding modal form
                        toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                        $('#tableEp').KTDatatable().reload(); // reload table

                    }
                    else if (res.data.status == 'error') {
                        $('#modalEp').modal('hide')  // hiding modal form
                        toastr.error(`${res.data.message}`, `${res.data.status}`)
                    }
                    else {
                        $('#modalEp').modal('hide') // hiding modal form
                    };
                });
            });
        });

        // Edit Modal Window - opens modal with appropriate properties
        $('#tableEp').on('click', '.btnEdit', async function (e) {
            // console.log('btnEdit is clicked');

            var id = $(this).attr("aria-label");
            // console.log(id);

            FormSubmitButton = document.querySelector('#btnSaveEpFormSubmitButton');

            // enabling disabling buttons
            $('#btnAddNewEpFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
            $('#btnSaveEpFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

            $('#modalEp').modal('show');   // open modal

            $('#modalEp').find('.modal-title').text('Edit Entry'); // Setting title for modal


            // retrieving data
            await axios({
                method: 'GET',
                url: `${HOST_URL}/api/v1/ecommerce/products/${id}`,
            }).then(async function (res) {
                // Return valid JSON
                console.log(res);

                if (res.data.status == 'success') {

                    // // fetching menu manager select2
                    // await axios({
                    //     method: 'GET',
                    //     url: `${HOST_URL}/api/v1/menu/manager/popSel2/`+ res.data.menuManager._id,
                    // }).then(function (res) {
                    //     //Return valid JSON
                    //     console.log(res);

                    //     if (res.data.status === 'success') {
                    //         // updating menuManagerSelect values
                    //         var option = new Option(res.data.manager.text, res.data.manager.id, true, true);
                    //         $('#menuManagerSelect').append(option).trigger('change');
                    //     }
                    // });

                    // updating fields with data
                    document.querySelector('#aeId').value = res.data.announcementEntries._id;
                    document.querySelector('#aeTitle').value = res.data.announcementEntries.title;
                    document.querySelector('#aeFrom').value = res.data.announcementEntries.from;
                    document.querySelector('#aeIsEmailReq').value = res.data.announcementEntries.isEmailReq;
                    document.querySelector('#aePriority').value = res.data.announcementEntries.priority;
                    document.querySelector('#aeMessage').value = res.data.announcementEntries.message;
                }
            });
        });

        // deleteOne operation
        $('#tableEp').on('click', '.btnDelete', function (e) {
            console.log('btnDelete Clicked');
            let ids = $(this).attr("aria-label");

            ids = ids.toString();


            const requests = {
                params: {
                    _id: ids,
                }
            }

            axios.delete(`${HOST_URL}/api/v1/ecommerce/products`, requests);

            // reload table
            $('#tableEp').KTDatatable().reload();

        });

        // deleteAll mass operation
        datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
            // datatable.checkbox() access to extension methods
            const ids = datatable.checkbox().getSelectedId();
            const count = ids.length;

            $('#tableEp_selected_records_2').html(count);

            console.log(count)

            if (count > 0) {
                $('#tableEp_group_action_form_2').collapse('show');
            } else {
                $('#tableEp_group_action_form_2').collapse('hide');
            }
        });

    };

    return {
        // public functions
        init: function () {
            _EcommerceProducts();
        },
    };
})();

jQuery(document).ready(function () {
    EcommerceCRUD.init();
});