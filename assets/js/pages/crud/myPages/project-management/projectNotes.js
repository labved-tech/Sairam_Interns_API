/* eslint-disable */
'use strict';

/* Class definition */
const ProjectNotesCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

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

    /*   Private functions */
    function _ProjectNotes() {
        var dataSet;

        /* Table Options */
        const options = {
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: 'get',
                        url: `${HOST_URL}/api/v1/project/notes/table`,
                        params: {
                            fields: '_id,_projectId,_userId,content,createdAt,updatedAt',
                        },
                        map: function (raw) {
                            // sample data mapping
                            console.log('raw', raw);
                            dataSet = raw;

                            if (typeof raw.projectNotes !== 'undefined') {
                                dataSet = raw.projectNotes;
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
                input: $('#createProjectNotesTable'),
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
                    field: 'fullName',
                    title: 'Full Name',
                    template: function (row) {
                        return '\
                  <div>\
                  <a href="#">' + row.fullName + '</a></div>\
                ';
                    }
                },
                {
                    field: '_projectId',
                    title: 'Project ID',
                },
                {
                    field: '_userId',
                    title: 'User ID',
                },
                {
                    field: 'content',
                    title: 'content',
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

        options.extensions = {
            // boolean or object (extension options)
            checkbox: true,
        };

        /* Table Initialize */
        const datatable = $('#tablePn').KTDatatable(options);

        /* Form */
        const PnForm = document.querySelector('#formPn');
        let FormSubmitButton = document.querySelector('#btnAddNewPnFormSubmitButton');
        // Options
        let formOptions = {
            fields: {
                pnProjectId: {
                    validators: {
                        notEmpty: {
                            message: 'ProjectId is required',
                        },
                    },
                },
                pnUserId: {
                    validators: {
                        notEmpty: {
                            message: 'UserId is required',
                        },
                    },
                },
                pnContent: {
                    validators: {
                        callback: {
                            message: 'The content is required and cannot be empty',
                            callback: function (input) {
                                const code = $('[name="pnContent"]').summernote('code');
                                // <p><br></p> is code generated by Summernote for empty content
                                return (code !== '' && code !== '<p><br></p>');
                            }
                        },
                    },
                },
            },
            plugins: {
                //Learn more: https://formvalidation.io/guide/plugins
                trigger: new FormValidation.plugins.Trigger(),
                // Bootstrap framework Integration
                bootstrap: new FormValidation.plugins.Bootstrap(),
                // Validate fields when clicking the Submit button
                createProjectNotesFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        };

        let fv;

        /* Search Operations */
        // search based on status
        $('#tablePn_search_status_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });

        // search based on type
        $('#tablePn_search_type_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#tablePn_search_status_2, #tablePn_search_type_2').selectpicker();

        // modal open
        $('#btnOpenPnModal').on('click', async function (e) {
            console.log('openButton is clicked');

            // enabling disabling buttons
            $('#btnAddNewPnFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
            $('#btnSavePnFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

            FormSubmitButton = document.querySelector('#btnAddNewPnFormSubmitButton');

            $('#modalPn').modal('show');   // open modal

            $('#modalPn').find('.modal-title').text('Add New Entries'); // Setting title for modal

        });

        // modal post closed
        $('#modalPn').on('hidden.bs.modal', function (e) {
            console.log('Modal closed');

            if (fv) {
                // clearing forms
                fv.resetForm();
                fv.destroy();
            }

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            // clearing fields
            $("#formPn").trigger('reset'); // clear form fields

            // manually resetting other fields
        });

        // modal post opened
        $('#modalPn').on('shown.bs.modal', function (e) {
            console.log('Modal open');

            // Initializing

            $(pnContent).summernote({
                height: 400,
                tabsize: 2,
            });

            if (!createProjectNotesForm) {
                return;
            }
        });

        // form reset operation
        $('#formPn').on('click', '.btnReset', function (e) {
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
            $("#formPn").trigger('reset'); // clear form fields

            // clear manually
            // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
        })

        // form add operation
        $('#formPn').on('click', '.btnAdd', function (e) {
            // console.log('btnCreate is clicked');

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            FormSubmitButton = document.querySelector('#btnAddNewPnFormSubmitButton');

            // Validation
            fv = FormValidation.formValidation(PnForm, formOptions);

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
                    url: `${HOST_URL}/api/v1/project/notes`,
                    data: {
                        _projectId: document.querySelector('#pnProjectId').value,
                        _userId: document.querySelector('#pnUserId').value,
                        content: document.querySelector('#pnContent').value,
                    },
                }).then(function (res) {


                    // Return valid JSON
                    // console.log(res);

                    // Release button
                    KTUtil.btnRelease(FormSubmitButton);

                    if (res.data.status == 'success') {
                        // reseting & clearing
                        $('#modalPn').modal('hide')  // hiding modal form
                        toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                        $('#tablePn').KTDatatable().reload(); // reload table
                    }
                    else if (res.data.status == 'error') {
                        $('#modalPn').modal('hide')  // hiding modal form
                        toastr.error(`${res.data.message}`, `${res.data.status}`)
                    }
                    else {
                        $('#modalPn').modal('hide')
                    };
                });
            });
        });

        // form save operation
        $('#formPn').on('click', '.btnSave', function (e) {
            console.log('btnSave is clicked');

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            FormSubmitButton = document.querySelector('#btnSavePnFormSubmitButton');

            // Validation
            fv = FormValidation.formValidation(PnForm, formOptions);

            // validation failed
            fv.on('core.form.invalid', async function () {
                // console.log('Something went wrong!!');    
            });

            // validation successful
            fv.on('core.form.valid', async function () {

                const id = document.querySelector('#pnId').value;

                // Show loading state on button
                KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

                // Accessing Restful API
                await axios({
                    method: 'patch',
                    url: `${HOST_URL}/api/v1/project/notes/${id}`,
                    data: {
                        _projectId: document.querySelector('#pnProjectId').value,
                        _userId: document.querySelector('#pnUserId').value,
                        content: document.querySelector('#pnContent').value,
                    },
                }).then(function (res) {
                    // Return valid JSON
                    // console.log(res);

                    // Release button
                    KTUtil.btnRelease(FormSubmitButton);

                    if (res.data.status == 'success') {
                        // reseting & clearing
                        $('#modalPn').modal('hide')  // hiding modal form
                        toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                        $('#tablePn').KTDatatable().reload(); // reload table

                    }
                    else if (res.data.status == 'error') {
                        $('#modalPn').modal('hide')  // hiding modal form
                        toastr.error(`${res.data.message}`, `${res.data.status}`)
                    }
                    else {
                        $('#modalPn').modal('hide') // hiding modal form
                    };
                });
            });
        });

        // Edit Modal Window - opens modal with appropriate properties
        $('#tablePn').on('click', '.btnEdit', async function (e) {
            // console.log('btnEdit is clicked');

            var id = $(this).attr("aria-label");
            // console.log(id);

            FormSubmitButton = document.querySelector('#btnSavePnFormSubmitButton');

            // enabling disabling buttons
            $('#btnAddNewPnFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
            $('#btnSavePnFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

            $('#modalPn').modal('show');   // open modal

            $('#modalPn').find('.modal-title').text('Edit Entry'); // Setting title for modal


            // retrieving data
            await axios({
                method: 'GET',
                url: `${HOST_URL}/api/v1/project/notes/${id}`,
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
                    document.querySelector('#pnId').value = res.data.projectNotes._id;
                    document.querySelector('#pnProjectId').value = res.data.projectNotes._projectId;
                    document.querySelector('#pnUserId').value = res.data.projectNotes._userId;
                    document.querySelector('#pnContent').value = res.data.projectNotes.content;

                }

            });
        });

        // deleteOne operation
        $('#tablePn').on('click', '.btnDelete', function (e) {
            console.log('btnDelete Clicked');
            let ids = $(this).attr("aria-label");

            ids = ids.toString();

            const requests = {
                params: {
                    _id: ids,
                }
            }

            axios.delete(`${HOST_URL}/api/v1/project/notes`, requests);

            // reload table
            $('#tablePn').KTDatatable().reload();

        });

        // deleteAll mass operation
        datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
            // datatable.checkbox() access to extension methods
            const ids = datatable.checkbox().getSelectedId();
            const count = ids.length;

            $('#tablePn_selected_records_2').html(count);

            console.log(count)

            if (count > 0) {
                $('#tablePn_group_action_form_2').collapse('show');
            } else {
                $('#tablePn_group_action_form_2').collapse('hide');
            }
        });

    };

    return {
        // public functions
        init: function () {
            _ProjectNotes();

        },
    };
})();

jQuery(document).ready(function () {
    ProjectNotesCRUD.init();
});    