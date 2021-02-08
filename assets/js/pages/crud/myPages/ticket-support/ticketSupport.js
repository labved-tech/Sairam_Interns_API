/* eslint-disable */
//'use strict';

// Class definition

const TicketSupportCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    // Private functions

    function _TicketCategories() {
        var dataSet;

        /* Table Options */
        const options = {
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: 'get',
                        url: `${HOST_URL}/api/v1/ticket-support/categories/table`,
                        params: {
                            fields: '_id, name, description, notes,  status, createdBy,createdAt,updatedAt',
                        },
                        map: function (raw) {
                            // sample data mapping
                            //console.log('raw', raw);
                            dataSet = raw;

                            if (typeof raw.ticketCategories !== 'undefined') {
                                dataSet = raw.ticketCategories;
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
                input: $('#tableTc_search_query_2'),
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
                    field: 'name',
                    title: 'Name',
                },
                {
                    field: 'description',
                    title: 'Description',
                },
                {
                    field: 'notes',
                    title: 'Notes',
                },
                {
                    field: 'status',
                    title: 'Status',
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


        const datatable = $('#tableTc').KTDatatable(options);

        const TcForm = document.querySelector('#formTc');
        let FormSubmitButton = document.querySelector('#btnAddNewTcFormSubmitButton');
        let formOptions = {
            fields: {
                tcName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                        },
                    },
                },
                tcDescription: {
                    validators: {
                        callback: {
                            message: 'The content is required and cannot be empty',
                            callback: function (input) {
                                const code = $('[name="tcDescription"]').summernote('code');
                                // <p><br></p> is code generated by Summernote for empty content
                                return (code !== '' && code !== '<p><br></p>');
                            }
                        },
                    },
                },
                tcNotes: {
                    validators: {
                        notEmpty: {
                            message: 'Notes is required',
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
                FormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),     
            },
        }

        let fv;

        /* Search Operations */
        // search based on status
        $('#tableTc_search_status_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });

        // search based on type
        $('#tableTc_search_type_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#tableTc_search_status_2, #tableTc_search_type_2').selectpicker();

        /* Modal Operations */
        // to open modal 
        $('#btnOpenTcModal').on('click', async function (e) {
            // console.log('btnNewItem is clicked');

            FormSubmitButton = document.querySelector('#btnAddNewTcFormSubmitButton');

            // enabling disabling buttons
            $('#btnAddNewTcFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
            $('#btnSaveTcFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

            $('#modalTc').modal('show');   // open modal  

            $('#modalTc').find('.modal-title').text('Add New Ticket Support  Entries'); // Setting title for modal

        });

        // modal post closed
        $('#modalTc').on('hidden.bs.modal', function (e) {
            //  console.log('Modal is closed');

            if (fv) {
                // clearing forms
                fv.resetForm();
                fv.destroy();
            }

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            // clearing fields
            $("#formTc").trigger('reset'); // clear form fields

            // manually resetting other fields
            $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */

        });

        // modal post opened
        $('#modalTc').on('shown.bs.modal', function (e) {

            // Initialise

            $(tcDescription).summernote({
                height: 400,
                tabsize: 2,
            });
        });

        /* Form Operations */
        // form reset operation
        $('#formTc').on('click', '.btnReset', function (e) {
            // console.log('btnResetTcForm is clicked');

            if (fv) {
                // clearing forms
                fv.resetForm();
                fv.destroy();
            }
            else {
                // initiate validation
                fv = FormValidation.formValidation(TcForm, formOptions);
            }

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            // clearing fields
            $("#formTc").trigger('reset'); // clear form fields

            // manually resetting other fields
            $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
        })

        // form add operation
        $('#formTc').on('click', '.btnAdd', function (e) {
            // console.log('addTcFormSubmitButton is clicked');

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            FormSubmitButton = document.querySelector('#btnAddNewTcFormSubmitButton');

            // Validation
            fv = FormValidation.formValidation(TcForm, formOptions);

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
                    url: `${HOST_URL}/api/v1/ticket-support/categories`,
                    data: {
                        name: document.querySelector('#tcName').value,
                        description: document.querySelector('#tcDescription').value,
                        notes: document.querySelector('#tcNotes').value,
                    },
                }).then(function (res) {

                    // Return valid JSON
                    // console.log(res);

                    // Release button
                    KTUtil.btnRelease(FormSubmitButton);

                    if (res.data.status == 'success') {
                        // reseting & clearing
                        $('#modalTc').modal('hide')  // hiding modal form
                        toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                        $('#tableTc').KTDatatable().reload(); // reload table
                    }
                    else if (res.data.status == 'error') {
                        $('#modalTc').modal('hide')  // hiding modal form
                        toastr.error(`${res.data.message}`, `${res.data.status}`)
                    }
                    else {
                        $('#modalTc').modal('hide')
                    };
                });
            });
        });

        // form save operation
        $('#formTc').on('click', '.btnSave', function (e) {
            // console.log('btnSaveMenuSectionFormSubmitButton is clicked');

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            FormSubmitButton = document.querySelector('#btnSaveTcFormSubmitButton');

            // Validation
            fv = FormValidation.formValidation(TcForm, formOptions);

            // validation failed
            fv.on('core.form.invalid', async function () {
                // console.log('Something went wrong!!');    
            });

            // validation successful
            fv.on('core.form.valid', async function () {

                const id = document.querySelector('#tcId').value;

                // Show loading state on button
                KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

                // Accessing Restful API
                await axios({
                    method: 'patch',
                    url: `${HOST_URL}/api/v1/ticket-support/categories${id}`,
                    data: {
                        name: document.querySelector('#tcName').value,
                        description: document.querySelector('#tcDescription').value,
                        notes: document.querySelector('#tcNotes').value,
                    },
                }).then(function (res) {
                    // Return valid JSON
                    // console.log(res);

                    // Release button
                    KTUtil.btnRelease(FormSubmitButton);

                    if (res.data.status == 'success') {
                        // reseting & clearing
                        $('#modalTc').modal('hide')  // hiding modal form
                        toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                        $('#tableTc').KTDatatable().reload(); // reload table

                    }
                    else if (res.data.status == 'error') {
                        $('#modalTc').modal('hide')  // hiding modal form
                        toastr.error(`${res.data.message}`, `${res.data.status}`)
                    }
                    else {
                        $('#modalTc').modal('hide') // hiding modal form
                    };
                });
            });
        });

        /* Table Operations */
        // Edit Modal Window - opens modal with appropriate properties
        $('#tableTc').on('click', '.btnEdit', async function (e) {
            // console.log('btnEdit is clicked');

            var id = $(this).attr("aria-label");
            // console.log(id);

            FormSubmitButton = document.querySelector('#btnSaveTcFormSubmitButton');

            // enabling disabling buttons
            $('#btnAddNewTcFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
            $('#btnSaveTcFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

            $('#modalTc').modal('show');   // open modal

            $('#modalTc').find('.modal-title').text('Edit Section Item'); // Setting title for modal

            // retrieving data
            await axios({
                method: 'GET',
                url: `${HOST_URL}/api/v1/ticket-support/categories/${id}`,
            }).then(async function (res) {
                // Return valid JSON
                console.log(res);

                if (res.data.status == 'success') {

                    /*// fetching menu manager select2
                    await axios({
                        method: 'GET',
                        url: `${HOST_URL}/api/v1/ticket-support/categories` + res.data.menuManager._id,
                    }).then(function (res) {
                        //Return valid JSON
                        // console.log(res);

                        if (res.data.status === 'success') {
                            // updating menuManagerSelect values
                            var option = new Option(res.data.manager.text, res.data.manager.id, true, true);
                            $('#menuManagerSelect').append(option).trigger('change');
                        }
                    });*/

                    // updating fields with data
                    document.querySelector('#tcId').value = res.data.ticketCategories._id;
                    document.querySelector('#tcName').value = res.data.ticketCategories.name;
                    document.querySelector('#tcDescription').value = res.data.ticketCategories.description;
                    document.querySelector('#tcNotes').value = res.data.ticketCategories.notes;
                }
            });
        });

        // deleteOne operation
        $('#tableTc').on('click', '.btnDelete', function (e) {
            let ids = $(this).attr("aria-label");

            ids = ids.toString();

            const requests = {
                params: {
                    _id: ids,
                }
            }

            axios.delete(`${HOST_URL}/api/v1/ticket-support/categories`, requests);

            // reload table
            $('#tableTc').KTDatatable().reload();

        });

        //  deleteAll mass operation
        datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
            // datatable.checkbox() access to extension methods
            const ids = datatable.checkbox().getSelectedId();
            const count = ids.length;

            $('#tableTc_selected_records_2').html(count);

            console.log(count)

            if (count > 0) {
                $('#tableTc_group_action_form_2').collapse('show');
            } else {
                $('#tableTc_group_action_form_2').collapse('hide');
            }
        });

        // deleteAll operation
        $('#tableTc_group_action_form_2').on('click', '.btnDeleteAll', function () {
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

            $('#tableTc_group_action_form_2').collapse('hide');

            // reload table
            $('#tableTc').KTDatatable().reload();
        });


    }



    return {
        // public functions
        init: function () {
            _TicketCategories();
        },
    };
})();

jQuery(document).ready(function () {
    TicketSupportCRUD.init();
});