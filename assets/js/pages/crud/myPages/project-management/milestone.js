/* eslint-disable */
'use strict';

/* Class definition */
const MilestoneCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    /*   Private functions */
    function _Milestone() {
        var dataSet;


        /* Table Options */
        const options = {
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: 'get',
                        url: `${HOST_URL}/api/v1/project/milestone/table`,
                        params: {
                            fields: '_id,name,description,descriptionVisible,dueDate,_projectId,color,milestone_order,datecreated,createdAt,updatedAt',
                        },
                        map: function (raw) {
                            // sample data mapping
                            console.log('raw', raw);
                            dataSet = raw;

                            if (typeof raw.milestone !== 'undefined') {
                                dataSet = raw.milestone;
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
                input: $('#createMilestoneTable'),
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
                    field: 'name',
                    title: 'Name',
                },
                {
                    field: 'description',
                    title: 'Description',
                },
                {
                    field: 'descriptionVisible',
                    title: 'Description Visible',
                },
                {
                    field: 'dueDate',
                    title: 'Due Date',
                },
                {
                    field: '_projectId',
                    title: 'Project ID',
                },
                {
                    field: 'color',
                    title: 'Color',
                },
                {
                    field: 'milestone_order',
                    title: 'Milestone order',
                },
                {
                    field: 'datecreated',
                    title: 'Date created',
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

        // enable extension
        options.extensions = {
            // boolean or object (extension options)
            checkbox: true,
        };

        /* Table Initialize */
        const datatable = $('#tableM').KTDatatable(options);

        /* Form */
        const MForm = document.querySelector('#formM');
        let FormSubmitButton = document.querySelector('#btnAddNewMFormSubmitButton');
        // Options
        let formOptions = {
            fields: {
                mName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                        },
                    },
                },
                mDescription: {
                    validators: {
                        notEmpty: {
                            message: 'Description is required',
                        },
                    },
                },
                mDescriptionVisible: {
                    validators: {
                        notEmpty: {
                            message: 'DescriptionVisible is required',
                        },
                    },
                },
                mDueDate: {
                    validators: {
                        notEmpty: {
                            message: 'DueDate is required',
                        },
                    },
                },
                mProjectId: {
                    validators: {
                        notEmpty: {
                            message: 'ProjectId is required',
                        },
                    },
                },
                mcolor: {
                    validators: {
                        notEmpty: {
                            message: 'color is required',
                        },
                    },
                },
                mMilestoneOrder: {
                    validators: {
                        notEmpty: {
                            message: 'MilestoneOrder is required',
                        },
                    },
                },
                mDatecreated: {
                    validators: {
                        notEmpty: {
                            message: 'Datecreated is required',
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
                createMilestoneFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        };

        let fv;

        /* Search Operations */
        // search based on status
        $('#tableM_search_status_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });

        // search based on type
        $('#tableM_search_type_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#tableM_search_status_2, #tableM_search_type_2').selectpicker();

        // modal open
        $('#btnOpenMModal').on('click', async function (e) {
            console.log('openButton is clicked');

            // enabling disabling buttons
            $('#btnAddNewMFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
            $('#btnSaveMFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

            FormSubmitButton = document.querySelector('#btnAddNewMFormSubmitButton');

            $('#modalM').modal('show');   // open modal

            $('#modalM').find('.modal-title').text('Add New Entries'); // Setting title for modal

        });

        // modal post closed
        $('#modalM').on('hidden.bs.modal', function (e) {
            console.log('Modal closed');

            if (fv) {
                // clearing forms
                fv.resetForm();
                fv.destroy();
            }

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            // clearing fields
            $("#formM").trigger('reset'); // clear form fields

            // manually resetting other fields
        });

        // modal post opened
        $('#modalM').on('shown.bs.modal', function (e) {
            console.log('Modal open');

            // Initializing
            $('#mDueDate').datepicker({
                rtl: KTUtil.isRTL(),
                todayBtn: 'linked',
                clearBtn: true,
                todayHighlight: true,
                orientation: 'bottom left',
                templates: arrows,
            });

            $('#mDatecreated').datepicker({
                rtl: KTUtil.isRTL(),
                todayBtn: 'linked',
                clearBtn: true,
                todayHighlight: true,
                orientation: 'bottom left',
                templates: arrows,
            });
        });

        // form reset operation
        $('#formM').on('click', '.btnReset', function (e) {
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
            $("#formM").trigger('reset'); // clear form fields

            // clear manually
            // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
        })

        // form add operation
        $('#formM').on('click', '.btnAdd', function (e) {
            // console.log('btnCreate is clicked');

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            FormSubmitButton = document.querySelector('#btnAddNewMFormSubmitButton');

            // Validation
            fv = FormValidation.formValidation(MForm, formOptions);

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
                    url: `${HOST_URL}/api/v1/milestone`,
                    data: {
                        description: mDescription.value,
                        descriptionVisible: mDescriptionVisible.value,
                        dueDate: mDueDate.value,
                        _projectId: mProjectId.value,
                        color: mcolor.value,
                        milestone_order: mMilestoneOrder.value,
                        datecreated: mDatecreated.value,

                    },

                }).then(function (res) {

                    // Return valid JSON
                    // console.log(res);

                    // Release button
                    KTUtil.btnRelease(FormSubmitButton);

                    if (res.data.status == 'success') {
                        // reseting & clearing
                        $('#modalM').modal('hide')  // hiding modal form
                        toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                        $('#tableM').KTDatatable().reload(); // reload table
                    }
                    else if (res.data.status == 'error') {
                        $('#modalM').modal('hide')  // hiding modal form
                        toastr.error(`${res.data.message}`, `${res.data.status}`)
                    }
                    else {
                        $('#modalM').modal('hide')
                    };
                });
            });
        });


        // form save operation
        $('#formM').on('click', '.btnSave', function (e) {
            console.log('btnSave is clicked');

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            FormSubmitButton = document.querySelector('#btnSaveMFormSubmitButton');

            // Validation
            fv = FormValidation.formValidation(MForm, formOptions);

            // validation failed
            fv.on('core.form.invalid', async function () {
                // console.log('Something went wrong!!');    
            });

            // validation successful
            fv.on('core.form.valid', async function () {

                const id = document.querySelector('#mId').value;

                // Show loading state on button
                KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

                // Accessing Restful API
                await axios({
                    method: 'patch',
                    url: `${HOST_URL}/api/v1/milestone/${id}`,
                    data: {
                        description: mDescription.value,
                        descriptionVisible: mDescriptionVisible.value,
                        dueDate: mDueDate.value,
                        _projectId: mProjectId.value,
                        color: mcolor.value,
                        milestone_order: mMilestoneOrder.value,
                        datecreated: mDatecreated.value,

                    },
                }).then(function (res) {
                    // Return valid JSON
                    // console.log(res);

                    // Release button
                    KTUtil.btnRelease(FormSubmitButton);


                    if (res.data.status == 'success') {
                        // reseting & clearing
                        $('#modalM').modal('hide')  // hiding modal form
                        toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                        $('#tableM').KTDatatable().reload(); // reload table

                    }
                    else if (res.data.status == 'error') {
                        $('#modalM').modal('hide')  // hiding modal form
                        toastr.error(`${res.data.message}`, `${res.data.status}`)
                    }
                    else {
                        $('#modalM').modal('hide') // hiding modal form
                    };
                });
            });
        });

        // Edit Modal Window - opens modal with appropriate properties
        $('#tableM').on('click', '.btnEdit', async function (e) {
            // console.log('btnEdit is clicked');

            var id = $(this).attr("aria-label");
            // console.log(id);

            FormSubmitButton = document.querySelector('#btnSaveMFormSubmitButton');

            // enabling disabling buttons
            $('#btnAddNeMFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
            $('#btnSaveMFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

            $('#modalM').modal('show');   // open modal

            $('#modalM').find('.modal-title').text('Edit Entry'); // Setting title for modal

            // retrieving data
            await axios({
                method: 'GET',
                url: `${HOST_URL}/api/v1/milestone/${id}`,
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
                    document.querySelector('#mId').value = res.data.milestone._id;
                    document.querySelector('#mDescription').value = res.data.milestone.description;
                    document.querySelector('#mDescriptionVisible').value = res.data.milestone.descriptionVisible;
                    document.querySelector('#mDueDate').value = res.data.milestone.dueDate;
                    document.querySelector('#mProjectId').value = res.data.milestone._projectId;
                    document.querySelector('#mcolor').value = res.data.milestone.color;
                    document.querySelector('#mMilestoneOrder').value = res.data.milestone.milestone_order;
                    document.querySelector('#mDatecreated').value = res.data.milestone.datecreated;

                }

            });
        });

        // deleteOne operation
        $('#tableM').on('click', '.btnDelete', function (e) {
            console.log('btnDelete Clicked');
            let ids = $(this).attr("aria-label");

            ids = ids.toString();

            const requests = {
                params: {
                    _id: ids,
                }
            }

            axios.delete(`${HOST_URL}/api/v1/milestone`, requests);

            // reload table
            $('#tableM').KTDatatable().reload();

        });


        // deleteAll mass operation
        datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
            // datatable.checkbox() access to extension methods
            const ids = datatable.checkbox().getSelectedId();
            const count = ids.length;

            $('#tableM_selected_records_2').html(count);

            console.log(count)

            if (count > 0) {
                $('#tableM_group_action_form_2').collapse('show');
            } else {
                $('#tableM_group_action_form_2').collapse('hide');
            }
        });

    };


    return {
        // public functions
        init: function () {
            _Milestone();

        },
    };
})();

jQuery(document).ready(function () {
    MilestoneCRUD.init();
});