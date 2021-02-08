/* eslint-disable */
'use strict';

/* Class definition */
const EcommerceCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    /*   Private functions */
    function _EcommerceAddress() {
        var dataSet;

        /* Table Initialize */
        const options = {
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: 'get',
                        url: `${HOST_URL}/api/v1/ecommerce/address/table`,
                        params: {
                            fields: '_id,address1,street,city,state,country,postalcode,createdBy,createdAt,updatedAt',
                        },
                        map: function (raw) {
                            // sample data mapping
                            //console.log('raw', raw);
                            dataSet = raw;

                            if (typeof raw.ecommerceAddress !== 'undefined') {
                                dataSet = raw.ecommerceAddress;
                                //console.log('dataSet', dataSet);
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
                input: $('#createEcommerceAddressTable'),
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
                    field: 'address1',
                    title: 'Address',
                    template: function (row) {
                        return '\
                                <div>\
                                <a href="#">' + row.address1 + '</a></div>\
                            ';
                    }
                },
                {
                    field: 'street',
                    title: 'Street',
                },
                {
                    field: 'city',
                    title: 'City',
                },
                {
                    field: 'state',
                    title: 'State',
                },
                {
                    field: 'country',
                    title: 'Country',
                },
                {
                    field: 'postalcode',
                    title: 'Postal Code',
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
                            ';
                    },
                },
                {
                    field: 'Actions',
                    title: 'Actions',
                    sortable: false,
                    width: 125,
                    overflow: 'visible',
                    autoHide: false,
                    template: function (row) {
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
                                    <a href="javascript:;" id="btnEdit" class="btn btn-sm btn-clean btn-icon btnEdit" title="Edit details" data-filed="_id" aria-label="'+ row._id + '">\
                                    <i class="far fa-edit">\
                                    </i>\
                                    </a>\
                                    <a href="javascript:;" id="btnDelete" class="btn btn-sm btn-clean btn-icon btnDelete" title="Delete" data-filed="_id" aria-label="'+ row._id + '">\
                                    <i class="far fa-trash-alt">\
                                    </i>\
                                    </a>\
                                ';
                    },
                },
            ],
        }
        // enable extension
        options.extensions = {
            // boolean or object (extension options)
            checkbox: true,
        };

        /* Table Initialize */
        const datatable = $('#tableEa').KTDatatable(options);

        const EaForm = document.querySelector('#formEa');
        let FormSubmitButton = document.querySelector('#btnAddNewEaFormSubmitButton');
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
        }

        let fv;

        /* Search Operations */
        // search based on status
        $('#tableEa_search_status_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });

        // search based on type
        $('#tableEa_search_type_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#tableEa_search_status_2, #tableEa_search_type_2').selectpicker();

        /* Modal Operations */
        // to open modal 
        $('#btnOpenEaModal').on('click', async function (e) {
            console.log('openButton is clicked');

            // enabling disabling buttons
            $('#btnAddNewEaFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
            $('#btnSaveEaFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

            FormSubmitButton = document.querySelector('#btnAddNewEaFormSubmitButton');

            $('#modalEa').modal('show');   // open modal

            $('#modalEa').find('.modal-title').text('Add New Entries'); // Setting title for modal


        });

        // modal post closed
        $('#modalEa').on('hidden.bs.modal', function (e) {
            console.log('Modal is closed');

            if (fv) {
                // clearing forms
                fv.resetForm();
                fv.destroy();
            }

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            // clearing fields
            $("#formEa").trigger('reset'); // clear form fields

            // manually resetting other fields
            $('#EaExpires').empty().trigger('change');  // clearing select2  */

        });

        // modal post opened
        $('#modalEa').on('shown.bs.modal', function (e) {

            // Initializing

        });

        /* Table Operations */
        // Edit Modal Window - opens modal with appropriate properties
        $('#tableEa').on('click', '.btnEdit', async function (e) {
            // console.log('btnEdit is clicked');

            var id = $(this).attr("aria-label");
            // console.log(id);

            FormSubmitButton = document.querySelector('#btnSaveEaFormSubmitButton');

            // enabling disabling buttons
            $('#btnAddNewEaFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
            $('#btnSaveEaFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

            $('#modalEa').modal('show');   // open modal

            $('#modalEa').find('.modal-title').text('Edit Entry'); // Setting title for modal

            // retrieving data
            await axios({
                method: 'GET',
                url: `${HOST_URL}/api/v1/ecommerce/address/${id}`,
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
                    document.querySelector('#eaAddress1').value = res.data.ecommerceAddress.address1;
                    document.querySelector('#eaStreet').value = res.data.ecommerceAddress.street;
                    document.querySelector('#eaCity').value = res.data.ecommerceAddress.city;
                    document.querySelector('#eaState').value = res.data.ecommerceAddress.state;
                    document.querySelector('#eaCountry').value = res.data.ecommerceAddress.country;
                    document.querySelector('#eaPostalCode').value = res.data.ecommerceAddress.postalcode;
                }
            });
        });

        /* Form Operations */
        // form reset operation
        $('#formEa').on('click', '.btnReset', function (e) {
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
            $("#formEa").trigger('reset'); // clear form fields

            // clear manually
            // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
        })

        // form add operation
        $('#formEa').on('click', '.btnAdd', function (e) {
            // console.log('addEaFormSubmitButton is clicked');

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            FormSubmitButton = document.querySelector('#btnAddNewEaFormSubmitButton');

            // Validation
            fv = FormValidation.formValidation(EaForm, formOptions);

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
                    url: `${HOST_URL}/api/v1/ecommerce/address`,
                    data: {
                        address1: document.querySelector('#eaAddress1').value,
                        street: document.querySelector('#eaStreet').value,
                        city: document.querySelector('#eaCity').value,
                        state: document.querySelector('#eaState').value,
                        country: document.querySelector('#eaCountry').value,
                        postalcode: document.querySelector('#eaPostalCode').value
                    },
                }).then(function (res) {

                    // Return valid JSON
                    // console.log(res);

                    // Release button
                    KTUtil.btnRelease(FormSubmitButton);

                    if (res.data.status == 'success') {
                        // reseting & clearing
                        $('#modalEa').modal('hide')  // hiding modal form
                        toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                        $('#tableEa').KTDatatable().reload(); // reload table
                    }
                    else if (res.data.status == 'error') {
                        $('#modalEa').modal('hide')  // hiding modal form
                        toastr.error(`${res.data.message}`, `${res.data.status}`)
                    }
                    else {
                        $('#modalEa').modal('hide')
                    };
                });
            });
        });

        // form save operation
        $('#formEa').on('click', '.btnSave', function (e) {
            console.log('btnSave is clicked');

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            FormSubmitButton = document.querySelector('#btnSaveEaFormSubmitButton');

            // Validation
            fv = FormValidation.formValidation(EaForm, formOptions);

            // validation failed
            fv.on('core.form.invalid', async function () {
                // console.log('Something went wrong!!');    
            });

            // validation successful
            fv.on('core.form.valid', async function () {

                const id = document.querySelector('#eaId').value;

                // Show loading state on button
                KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

                // Accessing Restful API
                await axios({
                    method: 'patch',
                    url: `${HOST_URL}/api/v1/ecommerce/address/${id}`,
                    data: {
                        address1: document.querySelector('#eaAddress1').value,
                        street: document.querySelector('#eaStreet').value,
                        city: document.querySelector('#eaCity').value,
                        state: document.querySelector('#eaState').value,
                        country: document.querySelector('#eaCountry').value,
                        postalcode: document.querySelector('#eaPostalCode').value

                    },
                }).then(function (res) {
                    // Return valid JSON
                    // console.log(res);

                    // Release button
                    KTUtil.btnRelease(FormSubmitButton);

                    if (res.data.status == 'success') {
                        // reseting & clearing
                        $('#modalEa').modal('hide')  // hiding modal form
                        toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                        $('#tableEa').KTDatatable().reload(); // reload table

                    }
                    else if (res.data.status == 'error') {
                        $('#modalEa').modal('hide')  // hiding modal form
                        toastr.error(`${res.data.message}`, `${res.data.status}`)
                    }
                    else {
                        $('#modalEa').modal('hide') // hiding modal form
                    };
                });
            });
        });

        // deleteOne operation
        $('#tableEa').on('click', '.btnDelete', function (e) {
            let ids = $(this).attr("aria-label");

            ids = ids.toString();

            const requests = {
                params: {
                    _id: ids,
                }
            }

            axios.delete(`${HOST_URL}/api/v1/menu/section`, requests);

            // reload table
            $('#tableEa').KTDatatable().reload();

        });

        // mass operation
        //  datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
        //      // datatable.checkbox() access to extension methods
        //      const ids = datatable.checkbox().getSelectedId();
        //      const count = ids.length;

        //      $('#tableEa_selected_records_2').html(count);

        //      console.log(count)

        //      if (count > 0) {
        //          $('#tableEa_group_action_form_2').collapse('show');
        //      } else {
        //          $('#tableEa_group_action_form_2').collapse('hide');
        //      }
        //  });

        // deleteAll operation
        $('#tableEa_group_action_form_2').on('click', '.btnDeleteAll', function () {
            // console.log('deleteAll is clicked')

            let ids = datatable.checkbox().getSelectedId();
            ids = ids.toString();
            // console.log(ids)

            const requests = {
                params: {
                    _id: ids,
                }
            }

            axios.delete(`${HOST_URL}/api/v1/menu/section`, requests);

            $('#tableEa_group_action_form_2').collapse('hide');

            // reload table
            $('#tableEa').KTDatatable().reload();
        });


    }

    return {
        // public functions
        init: function () {
            _EcommerceAddress();
        },
    };
})();

jQuery(document).ready(function () {
    EcommerceCRUD.init();
});