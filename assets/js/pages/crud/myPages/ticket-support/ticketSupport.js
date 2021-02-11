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
    // Private functions

    function _TicketResponse() {
        var dataSet;

        const options = {
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: 'get',
                        url: `${HOST_URL}/api/v1/ticket-support/response/table`,
                        params: {
                            fields: '_id, _ticketId, _responderId, emailSent,  isStatusChange, createdBy,createdAt,updatedAt',
                        },
                        map: function (raw) {
                            // sample data mapping
                            console.log('raw', raw);
                            dataSet = raw;

                            if (typeof raw.ticketResponse !== 'undefined') {
                                dataSet = raw.ticketResponse;
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
                input: $('#tableTr_search_query_2'),
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
                    field: '_ticketId',
                    title: 'TicketId',
                },
                {
                    field: '_responderId',
                    title: 'ResponderId',
                },
                {
                    field: 'responderName',
                    title: 'ResponderName',
                },
                {
                    field: 'emailSent',
                    title: 'EmailSent',
                },
                {
                    field: 'isStatusChange',
                    title: 'IsStatusChange',
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


        const datatable = $('#tableTr').KTDatatable(options);

        // const TrForm = document.querySelector('#formTr');
        // let FormSubmitButton = document.querySelector('#btnAddNewTrFormSubmitButton');
        // let formOptions = {
        //     // Options
        //     fields: {
        //         trticketId: {
        //             validators: {
        //                 notEmpty: {
        //                     message: 'ticketId is required',
        //                 },
        //             },
        //         },
        //         trresponderId: {
        //             validators: {
        //                 notEmpty: {
        //                     message: 'responderId is required',
        //                 },
        //             },
        //         },
        //         trresponderName: {
        //             validators: {
        //                 notEmpty: {
        //                     message: 'responderName is required',
        //                 },
        //             },
        //         },
        //         tremailSent: {
        //             validators: {
        //                 notEmpty: {
        //                     message: 'emailSent is required',
        //                 },
        //             },
        //         },
        //         trisStatusChange: {
        //             validators: {
        //                 notEmpty: {
        //                     message: 'isStatusChange is required',
        //                 },
        //             },
        //         },
        //         trbody: {
        //             validators: {
        //                 notEmpty: {
        //                     message: 'body is required',
        //                 },
        //             },
        //         },
        //     },
        //     plugins: {
        //         //Learn more: https://formvalidation.io/guide/plugins
        //         trigger: new FormValidation.plugins.Trigger(),
        //         // Bootstrap Framework Integration
        //         bootstrap: new FormValidation.plugins.Bootstrap(),
        //         // Validate fields when clicking the Submit button
        //         FormSubmitButton: new FormValidation.plugins.SubmitButton(),
        //         // Submit the form when all fields are valid
        //         //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        //     },
        // };

        // let fv;

        // /* Search Operations */
        // // search based on status
        // $('#tableTr_search_status_2').on('change', function () {
        //     datatable.search($(this).val().toLowerCase(), 'Status');
        // });

        // // search based on type
        // $('#tableTr_search_type_2').on('change', function () {
        //     datatable.search($(this).val().toLowerCase(), 'Type');
        // });

        // $('#tableTr_search_status_2, #tableTr_search_type_2').selectpicker();

        // // modal open
        // $('#btnOpenTrModal').on('click', async function (e) {
        //     console.log('openButton is clicked');

        //     // enabling disabling buttons
        //     $('#btnAddNewTrFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
        //     $('#btnSaveTrFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

        //     FormSubmitButton = document.querySelector('#btnAddNewTrFormSubmitButton');

        //     $('#modalTr').modal('show');   // open modal

        //     $('#modalTr').find('.modal-title').text('Add New Entries'); // Setting title for modal

        // });

        // // modal post closed
        // $('#modalTr').on('hidden.bs.modal', function (e) {
        //     console.log('Modal closed');

        //     if (fv) {
        //         // clearing forms
        //         fv.resetForm();
        //         fv.destroy();
        //     }

        //     // clearing validator messages
        //     $('.fv-plugins-message-container').text(''); // remove message

        //     // clearing fields
        //     $("#formTr").trigger('reset'); // clear form fields

        //     // manually resetting other fields
        //     $('#aeExpires').empty().trigger('change');  // clearing select2  */

        // });

        // // modal post opened
        // $('#modalTr').on('shown.bs.modal', function (e) {
        //     console.log('Modal open');

        //     // Initializing

        //     // form reset operation
        //     $('#formTr').on('click', '.btnReset', function (e) {
        //         // console.log('btnResetMenuSectionForm is clicked');

        //         if (fv) {
        //             // clearing forms
        //             fv.resetForm();
        //             fv.destroy();
        //         }
        //         else {
        //             // initiate validation
        //             fv = FormValidation.formValidation(menuSectionForm, formOptions);
        //         }

        //         // clearing validator messages
        //         $('.fv-plugins-message-container').text(''); // remove message

        //         // clearing fields
        //         $("#formTr").trigger('reset'); // clear form fields

        //         // clear manually
        //         // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
        //     })

        //     // form add operation
        //     $('#formTr').on('click', '.btnAdd', function (e) {
        //         // console.log('btnCreate is clicked');

        //         // clearing validator messages
        //         $('.fv-plugins-message-container').text(''); // remove message

        //         FormSubmitButton = document.querySelector('#btnAddNewTrFormSubmitButton');

        //         // Validation
        //         fv = FormValidation.formValidation(TrForm, formOptions);

        //         // validation failed
        //         fv.on('core.form.invalid', async function () {
        //             // console.log('Something went wrong!!');    
        //         });

        //         // validation successful
        //         fv.on('core.form.valid', async function () {

        //             // Show loading state on button
        //             KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

        //             // Accessing Restful API
        //             axios({
        //                 method: 'post',
        //                 url: `${HOST_URL}/api/v1/ticket-support/response`,
        //                 data: {
        //                     _ticketId: trticketId.value,
        //                     _responderId: trresponderId.value,
        //                     responderName: trresponderName.value,
        //                     emailSent: tremailSent.value,
        //                     isStatusChange: trisStatusChange.value,
        //                     body: trbody.value,
        //                 },

        //             }).then(function (res) {

        //                 // Return valid JSON
        //                 // console.log(res);

        //                 // Release button
        //                 KTUtil.btnRelease(FormSubmitButton);

        //                 if (res.data.status == 'success') {
        //                     // reseting & clearing
        //                     $('#modalTr').modal('hide')  // hiding modal form
        //                     toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
        //                     $('#tableTr').KTDatatable().reload(); // reload table
        //                 }
        //                 else if (res.data.status == 'error') {
        //                     $('#modalTr').modal('hide')  // hiding modal form
        //                     toastr.error(`${res.data.message}`, `${res.data.status}`)
        //                 }
        //                 else {
        //                     $('#modalTr').modal('hide')
        //                 };
        //             });
        //         });
        //     });

        //     // form save operation
        //     $('#formTr').on('click', '.btnSave', function (e) {
        //         console.log('btnSave is clicked');

        //         // clearing validator messages
        //         $('.fv-plugins-message-container').text(''); // remove message

        //         FormSubmitButton = document.querySelector('#btnSaveTrFormSubmitButton');

        //         // Validation
        //         fv = FormValidation.formValidation(TrForm, formOptions);

        //         // validation failed
        //         fv.on('core.form.invalid', async function () {
        //             // console.log('Something went wrong!!');    
        //         });

        //         // validation successful
        //         fv.on('core.form.valid', async function () {

        //             const id = document.querySelector('#aeId').value;

        //             // Show loading state on button
        //             KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

        //             // Accessing Restful API
        //             await axios({
        //                 method: 'patch',
        //                 url: `${HOST_URL}/api/v1/ticket-support/response/${id}`,
        //                 data: {
        //                     trticketId: document.querySelector('#trticketId').value,
        //                     trresponderId: $('#trresponderId').summernote('code'),   // not working - Summernote WYSIWYG
        //                     trresponderName: document.querySelector('#trresponderName').value,
        //                     tremailSent: document.querySelector('#tremailSent').value,   //if(aeIsEmailReq.value=== 'on') return true
        //                     trisStatusChange: document.querySelector('#trisStatusChange').value * 1,
        //                     trbody: document.querySelector('#trbody').value,
        //                 },
        //             }).then(function (res) {
        //                 // Return valid JSON
        //                 // console.log(res);

        //                 // Release button
        //                 KTUtil.btnRelease(FormSubmitButton);

        //                 if (res.data.status == 'success') {
        //                     // reseting & clearing
        //                     $('#modalTr').modal('hide')  // hiding modal form
        //                     toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
        //                     $('#tableTr').KTDatatable().reload(); // reload table

        //                 }
        //                 else if (res.data.status == 'error') {
        //                     $('#modalTr').modal('hide')  // hiding modal form
        //                     toastr.error(`${res.data.message}`, `${res.data.status}`)
        //                 }
        //                 else {
        //                     $('#modalTr').modal('hide') // hiding modal form
        //                 };
        //             });
        //         });
        //     });

        //     // Edit Modal Window - opens modal with appropriate properties
        //     $('#tableTr').on('click', '.btnEdit', async function (e) {
        //         // console.log('btnEdit is clicked');

        //         var id = $(this).attr("aria-label");
        //         // console.log(id);

        //         FormSubmitButton = document.querySelector('#btnSaveTrFormSubmitButton');

        //         // enabling disabling buttons
        //         $('#btnAddNewTrFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
        //         $('#btnSaveTrFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

        //         $('#modalTr').modal('show');   // open modal

        //         $('#modalTr').find('.modal-title').text('Edit Entry'); // Setting title for modal

        //         // retrieving data
        //         await axios({
        //             method: 'GET',
        //             url: `${HOST_URL}/api/v1/ticket-support/response/${id}`,
        //         }).then(async function (res) {
        //             // Return valid JSON
        //             console.log(res);

        //             if (res.data.status == 'success') {

        //                 // // fetching menu manager select2
        //                 // await axios({
        //                 //     method: 'GET',
        //                 //     url: `${HOST_URL}/api/v1/menu/manager/popSel2/`+ res.data.menuManager._id,
        //                 // }).then(function (res) {
        //                 //     //Return valid JSON
        //                 //     console.log(res);

        //                 //     if (res.data.status === 'success') {
        //                 //         // updating menuManagerSelect values
        //                 //         var option = new Option(res.data.manager.text, res.data.manager.id, true, true);
        //                 //         $('#menuManagerSelect').append(option).trigger('change');
        //                 //     }
        //                 // });

        //                 // updating fields with data
        //                 document.querySelector('#trId').value = res.data.ticketResponse._id;
        //                 document.querySelector('#trticketId').value = res.data.announcementEntries.title;
        //                 document.querySelector('#trresponderId').value = res.data.announcementEntries.from;
        //                 document.querySelector('#trresponderName').value = res.data.announcementEntries.isEmailReq;
        //                 document.querySelector('#tremailSent').value = res.data.announcementEntries.priority;
        //                 document.querySelector('#trisStatusChange').value = res.data.announcementEntries.message;
        //                 document.querySelector('#trbody').value = res.data.announcementEntries.message;
        //             }
        //         });
        //     });

        //     // deleteOne operation
        //     $('#tableTr').on('click', '.btnDelete', function (e) {
        //         console.log('btnDelete Clicked');
        //         let ids = $(this).attr("aria-label");

        //         ids = ids.toString();

        //         const requests = {
        //             params: {
        //                 _id: ids,
        //             }
        //         }

        //         axios.delete(`${HOST_URL}/api/v1/ticket-support/response`, requests);

        //         // reload table
        //         $('#tableTr').KTDatatable().reload();

        //     });

        //     // deleteAll mass operation
        //     datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
        //         // datatable.checkbox() access to extension methods
        //         const ids = datatable.checkbox().getSelectedId();
        //         const count = ids.length;

        //         $('#tableTr_selected_records_2').html(count);

        //         console.log(count)

        //         if (count > 0) {
        //             $('#tableTr_group_action_form_2').collapse('show');
        //         } else {
        //             $('#tableTr_group_action_form_2').collapse('hide');
        //         }
        //     });
        // });
    };
    return {
        // public functions
        init: function () {
            _TicketCategories();
            _TicketResponse();
        },
    };
})();

jQuery(document).ready(function () {
    TicketSupportCRUD.init();
});