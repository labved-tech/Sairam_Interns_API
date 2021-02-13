/* eslint-disable */
//'use strict';


// Class definition

const TicketSupportCRUD = (function () {
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

    function _TicketEntries() {
        var dataSet;

        /* Table Options */
        const options = {
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: 'get',
                        url: `${HOST_URL}/api/v1/ticket-support/entries/table`,
                        params: {
                            fields: '_id, _userId, userName, userEmail, userPhoneNumber, category, product, subject, body, status, lastStatusChange, assignedTo, priority, lastActivityDate, lastActivityBy, _agencyId, createdBy,createdAt,updatedAt',
                        },
                        map: function (raw) {
                            // sample data mapping
                            console.log('raw', raw);
                            dataSet = raw;

                            if (typeof raw.ticketEntries !== 'undefined') {
                                dataSet = raw.ticketEntries;
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
                input: $('#tableTe_search_query_2'),
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
                    field: '_userId',
                    title: 'UserId',
                },
                {
                    field: 'userName',
                    title: 'UserName',
                },
                {
                    field: 'userEmail',
                    title: 'UserEmail',
                },
                {
                    field: 'userPhoneNumber',
                    title: 'UdserPhoneNumber',
                },
                {
                    field: 'category',
                    title: 'Category',
                },
                {
                    field: 'product',
                    title: 'Product',
                },
                {
                    field: 'subject',
                    title: 'Subject',
                },
                {
                    field: 'body',
                    title: 'Body',
                },
                {
                    field: 'status',
                    title: 'Status',
                },
                {
                    field: 'lastStatusChange',
                    title: 'LastStatusChange',
                },
                {
                    field: 'assignedTo',
                    title: 'AssignedTo',
                },
                {
                    field: 'priority',
                    title: 'Priority',
                },
                {
                    field: 'lastActivityDate',
                    title: 'LastActivityDate',
                },
                {
                    field: 'lastActivityBy',
                    title: 'LastActivityBy',
                },
                {
                    field: '_agencyId',
                    title: 'AgencyId',
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


        const datatable = $('#tableTe').KTDatatable(options);

        const TeForm = document.querySelector('#formTe');
        let FormSubmitButton = document.querySelector('#btnAddNewTeFormSubmitButton');
        let formOptions = {
            fields: {
                teuserId: {
                    validators: {
                        notEmpty: {
                            message: 'UserId is required',
                        },
                    },
                },
                teuserName: {
                    validators: {
                        notEmpty: {
                            message: 'UserName is required',
                        },
                    },
                },
                teuserEmail: {
                    validators: {
                        notEmpty: {
                            message: 'UserEmail is required',
                        },
                    },
                },
                teuserPhoneNumber: {
                    validators: {
                        notEmpty: {
                            message: 'UserPhoneNumber is required',
                        },
                    },
                },
                tecategory: {
                    validators: {
                        notEmpty: {
                            message: 'Category is required',
                        },
                    },
                },
                teproduct: {
                    validators: {
                        notEmpty: {
                            message: 'Product is required',
                        },
                    },
                },
                tesubject: {
                    validators: {
                        notEmpty: {
                            message: 'Subject is required',
                        },
                    },
                },
                tebody: {
                    validators: {
                        notEmpty: {
                            message: 'Body is required',
                        },
                    },
                },
                teLastStatusChange: {
                    validators: {
                        notEmpty: {
                            message: 'LastStatusChange is required',
                        },
                    },
                },
                teassignedTo: {
                    validators: {
                        notEmpty: {
                            message: 'AssignedTo is required',
                        },
                    },
                },
                tepriority: {
                    validators: {
                        notEmpty: {
                            message: 'Priority is required',
                        },
                    },
                },
                tepriority: {
                    validators: {
                        notEmpty: {
                            message: 'Priority is required',
                        },
                    },
                },
                teLastActivityDate: {
                    validators: {
                        notEmpty: {
                            message: 'LastActivityDate is required',
                        },
                    },
                },
                telastActivityBy: {
                    validators: {
                        notEmpty: {
                            message: 'LastActivityBy is required',
                        },
                    },
                },
                teagencyId: {
                    validators: {
                        notEmpty: {
                            message: 'AgencyId is required',
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
        };

        let fv;

        /* Search Operations */
        // search based on status
        $('#tableTe_search_status_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });

        // search based on type
        $('#tableTe_search_type_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#tableTe_search_status_2, #tableTe_search_type_2').selectpicker();

        /* Modal Operations */
        // to open modal 
        $('#btnOpenTeModal').on('click', async function (e) {
            // console.log('btnNewItem is clicked');

            FormSubmitButton = document.querySelector('#btnAddNewTeFormSubmitButton');

            // enabling disabling buttons
            $('#btnAddNewTeFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
            $('#btnSaveTeFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

            $('#modalTe').modal('show');   // open modal  

            $('#modalTe').find('.modal-title').text('Add New Ticket Support  Entries'); // Setting title for modal

        });

        // modal post closed
        $('#modalTe').on('hidden.bs.modal', function (e) {
            //  console.log('Modal is closed');

            if (fv) {
                // clearing forms
                fv.resetForm();
                fv.destroy();
            }

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            // clearing fields
            $("#formTe").trigger('reset'); // clear form fields

            // manually resetting other fields
            $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */

        });

        // modal post opened
        $('#modalTe').on('shown.bs.modal', function (e) {

            // Initialise

            $('#teLastStatusChange').datepicker({
                rtl: KTUtil.isRTL(),
                todayBtn: 'linked',
                clearBtn: true,
                todayHighlight: true,
                orientation: 'bottom left',
                templates: arrows,
            });
            $('#teLastActivityDate').datepicker({
                rtl: KTUtil.isRTL(),
                todayBtn: 'linked',
                clearBtn: true,
                todayHighlight: true,
                orientation: 'bottom left',
                templates: arrows,
            });
        });


        /* Form Operations */
        // form reset operation
        $('#formTe').on('click', '.btnReset', function (e) {
            // console.log('btnResetTeForm is clicked');

            if (fv) {
                // clearing forms
                fv.resetForm();
                fv.destroy();
            }
            else {
                // initiate validation
                fv = FormValidation.formValidation(TeForm, formOptions);
            }

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            // clearing fields
            $("#formTe").trigger('reset'); // clear form fields

            // manually resetting other fields
            $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
        })

        // form add operation
        $('#formTe').on('click', '.btnAdd', function (e) {
            // console.log('addTeFormSubmitButton is clicked');

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            FormSubmitButton = document.querySelector('#btnAddNewTeFormSubmitButton');

            // Validation
            fv = FormValidation.formValidation(TeForm, formOptions);

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
                    url: `${HOST_URL}/api/v1/ticket-support/entries`,
                    data: {
                        name: document.querySelector('#teuserId').value,
                        teuserName: document.querySelector('#teuserName').value,
                        teuserEmail: document.querySelector('#teuserEmail').value,
                        teuserPhoneNumber: document.querySelector('#teuserPhoneNumber').value,
                        tecategory: document.querySelector('#tecategory').value,
                        teproduct: document.querySelector('#teproduct').value,
                        tesubject: document.querySelector('#tesubject').value,
                        tebody: document.querySelector('#tebody').value,
                        teLastStatusChange: document.querySelector('#teLastStatusChange').value,
                        teassignedTo: document.querySelector('#teassignedTo').value,
                        tepriority: document.querySelector('#tepriority').value,
                        teLastActivityDate: document.querySelector('#teLastActivityDate').value,
                        telastActivityBy: document.querySelector('#telastActivityBy').value,
                        teagencyId: document.querySelector('#teagencyId').value,
                    },
                }).then(function (res) {

                    // Return valid JSON
                    // console.log(res);

                    // Release button
                    KTUtil.btnRelease(FormSubmitButton);

                    if (res.data.status == 'success') {
                        // reseting & clearing
                        $('#modalTe').modal('hide')  // hiding modal form
                        toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                        $('#tableTe').KTDatatable().reload(); // reload table
                    }
                    else if (res.data.status == 'error') {
                        $('#modalTe').modal('hide')  // hiding modal form
                        toastr.error(`${res.data.message}`, `${res.data.status}`)
                    }
                    else {
                        $('#modalTe').modal('hide')
                    };
                });
            });
        });

        // form save operation
        $('#formTe').on('click', '.btnSave', function (e) {
            // console.log('btnSaveMenuSectionFormSubmitButton is clicked');

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            FormSubmitButton = document.querySelector('#btnSaveTeFormSubmitButton');

            // Validation
            fv = FormValidation.formValidation(TeForm, formOptions);

            // validation failed
            fv.on('core.form.invalid', async function () {
                // console.log('Something went wrong!!');    
            });

            // validation successful
            fv.on('core.form.valid', async function () {

                const id = document.querySelector('#teId').value;

                // Show loading state on button
                KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

                // Accessing Restful API
                await axios({
                    method: 'patch',
                    url: `${HOST_URL}/api/v1/ticket-support/entries/${id}`,
                    data: {

                        name: document.querySelector('#teuserId').value,
                        teuserName: document.querySelector('#teuserName').value,
                        teuserEmail: document.querySelector('#teuserEmail').value,
                        teuserPhoneNumber: document.querySelector('#teuserPhoneNumber').value,
                        tecategory: document.querySelector('#tecategory').value,
                        teproduct: document.querySelector('#teproduct').value,
                        tesubject: document.querySelector('#tesubject').value,
                        tebody: document.querySelector('#tebody').value,
                        teLastStatusChange: document.querySelector('#teLastStatusChange').value,
                        teassignedTo: document.querySelector('#teassignedTo').value,
                        tepriority: document.querySelector('#tepriority').value,
                        teLastActivityDate: document.querySelector('#teLastActivityDate').value,
                        telastActivityBy: document.querySelector('#telastActivityBy').value,
                        teagencyId: document.querySelector('#teagencyId').value,
                    },
                }).then(function (res) {
                    // Return valid JSON
                    // console.log(res);

                    // Release button
                    KTUtil.btnRelease(FormSubmitButton);

                    if (res.data.status == 'success') {
                        // reseting & clearing
                        $('#modalTe').modal('hide')  // hiding modal form
                        toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                        $('#tableTe').KTDatatable().reload(); // reload table

                    }
                    else if (res.data.status == 'error') {
                        $('#modalTe').modal('hide')  // hiding modal form
                        toastr.error(`${res.data.message}`, `${res.data.status}`)
                    }
                    else {
                        $('#modalTe').modal('hide') // hiding modal form
                    };
                });
            });
        });

        /* Table Operations */
        // Edit Modal Window - opens modal with appropriate properties
        $('#tableTe').on('click', '.btnEdit', async function (e) {
            // console.log('btnEdit is clicked');

            var id = $(this).attr("aria-label");
            // console.log(id);

            FormSubmitButton = document.querySelector('#btnSaveTeFormSubmitButton');

            // enabling disabling buttons
            $('#btnAddNewTeFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
            $('#btnSaveTeFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

            $('#modalTe').modal('show');   // open modal

            $('#modalTe').find('.modal-title').text('Edit Section Item'); // Setting title for modal

            // retrieving data
            await axios({
                method: 'GET',
                url: `${HOST_URL}/api/v1/ticket-support/entries/${id}`,
            }).then(async function (res) {
                // Return valid JSON
                console.log(res);

                if (res.data.status == 'success') {

                    /*// fetching menu manager select2
                    await axios({
                        method: 'GET',
                        url: `${HOST_URL}/api/v1/ticket-support/entries` + res.data.menuManager._id,
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
                    document.querySelector('#teId').value = res.data.ticketProducts._id;
                    document.querySelector('#teName').value = res.data.ticketProducts.name;
                    document.querySelector('#teDescription').value = res.data.ticketProducts.description;
                    document.querySelector('#teNotes').value = res.data.ticketProducts.notes;
                }
            });
        });

        // deleteOne operation
        $('#tableTe').on('click', '.btnDelete', function (e) {
            let ids = $(this).attr("aria-label");

            ids = ids.toString();

            const requests = {
                params: {
                    _id: ids,
                }
            }

            axios.delete(`${HOST_URL}/api/v1/ticket-support/entries`, requests);

            // reload table
            $('#tableTe').KTDatatable().reload();

        });

        //  deleteAll mass operation
        datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
            // datatable.checkbox() access to extension methods
            const ids = datatable.checkbox().getSelectedId();
            const count = ids.length;

            $('#tableTe_selected_records_2').html(count);

            console.log(count)

            if (count > 0) {
                $('#tableTe_group_action_form_2').collapse('show');
            } else {
                $('#tableTe_group_action_form_2').collapse('hide');
            }
        });

        // deleteAll operation
        $('#tableTe_group_action_form_2').on('click', '.btnDeleteAll', function () {
            // console.log('deleteAll is clicked')

            let ids = datatable.checkbox().getSelectedId();
            ids = ids.toString();
            // console.log(ids)

            const requests = {
                params: {
                    _id: ids,
                }
            }

            axios.delete(`${HOST_URL}/api/v1/ticket-support/entries`, requests);

            $('#tableTe_group_action_form_2').collapse('hide');

            // reload table
            $('#tableTe').KTDatatable().reload();
        });

    }

    return {
        // public functions
        init: function () {
            _TicketEntries();
        },
    };
})();

jQuery(document).ready(function () {
    TicketSupportCRUD.init();
});