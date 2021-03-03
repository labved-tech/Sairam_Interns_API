/* eslint-disable */
'use strict';

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

/* Class definition */
const TaskTimersCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    /*   Private functions */
    function _TaskTimers() {
        var dataSet;

        /* Table Options */
        const options = {
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: 'get',
                        url: `${HOST_URL}/api/v1/project/task-timers/table`,
                        params: {
                            fields: '_id,_taskId,startTime,endTime,timeSpend,note,_userId,createdAt,updatedAt',
                        },
                        map: function (raw) {
                            // sample data mapping
                            console.log('raw', raw);
                            dataSet = raw;

                            if (typeof raw.taskTimers !== 'undefined') {
                                dataSet = raw.taskTimers;
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
                input: $('#createTaskTimersTable'),
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
                    field: '_taskId',
                    title: 'Task ID',
                },
                {
                    field: 'startTime',
                    title: 'Start Time',
                },
                {
                    field: 'endTime',
                    title: 'End Time',
                },
                {
                    field: 'timeSpend',
                    title: 'Time Spend',
                },
                {
                    field: 'note',
                    title: 'Note',
                },
                {
                    field: '_userId',
                    title: 'User ID',
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
        const datatable = $('#tableTt').KTDatatable(options);

        /* Form */
        const TtForm = document.querySelector('#formTt');
        let FormSubmitButton = document.querySelector('#btnAddNewTtFormSubmitButton');
        // Options
        let formOptions = {
            fields: {
                ttTaskId: {
                    validators: {
                        notEmpty: {
                            message: 'ttTaskId is required',
                        },
                    },
                },
                ttStartTime: {
                    validators: {
                        notEmpty: {
                            message: 'StartTime is required',
                        },
                    },
                },
                ttEndTime: {
                    validators: {
                        notEmpty: {
                            message: 'EndTime is required',
                        },
                    },
                },
                ttTimeSpend: {
                    validators: {
                        notEmpty: {
                            message: 'TimeSpend is required',
                        },
                    },
                },
                ttNote: {
                    validators: {
                        notEmpty: {
                            message: 'Note is required',
                        },
                    },
                },
                ttUserId: {
                    validators: {
                        notEmpty: {
                            message: 'UserId is required',
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
                createTaskTimersFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        };

        let fv;

        /* Search Operations */
        // search based on status
        $('#tableTt_search_status_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });

        // search based on type
        $('#tableTt_search_type_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#tableTt_search_status_2, #tableTt_search_type_2').selectpicker();

        // modal open
        $('#btnOpenTtModal').on('click', async function (e) {
            console.log('openButton is clicked');

            // enabling disabling buttons
            $('#btnAddNewTtFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
            $('#btnSaveTtFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

            FormSubmitButton = document.querySelector('#btnAddNewTtFormSubmitButton');

            $('#modalTt').modal('show');   // open modal

            $('#modalTt').find('.modal-title').text('Add New Entries'); // Setting title for modal

        });

        // modal post closed
        $('#modalTt').on('hidden.bs.modal', function (e) {
            console.log('Modal closed');

            if (fv) {
                // clearing forms
                fv.resetForm();
                fv.destroy();
            }

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            // clearing fields
            $("#formTt").trigger('reset'); // clear form fields

            // manually resetting other fields
        });

        // modal post opened
        $('#modalTt').on('shown.bs.modal', function (e) {
            console.log('Modal open');

            // Initializing

            // Date & Time : Date
            $('#ttStartTime').datepicker({
                rtl: KTUtil.isRTL(),
                todayBtn: 'linked',
                clearBtn: true,
                todayHighlight: true,
                orientation: 'bottom left',
                templates: arrows,
            });

            $('#ttEndTime').datepicker({
                rtl: KTUtil.isRTL(),
                todayBtn: 'linked',
                clearBtn: true,
                todayHighlight: true,
                orientation: 'bottom left',
                templates: arrows,
            });

            $('#ttTimeSpend').TouchSpin({
                buttondown_class: 'btn btn-secondary',
                buttonup_class: 'btn btn-secondary',
                verticalbuttons: true,
                verticalup: '<i class="ki ki-plus"></i>',
                verticaldown: '<i class="ki ki-minus"></i>',

                min: 0,
                max: 10000,
                step: 5,
                decimals: 0,
                boostat: 5,
                maxboostedstep: 10,
                prefix: ''
            });
        });

        // form reset operation
        $('#formTt').on('click', '.btnReset', function (e) {
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
            $("#formTt").trigger('reset'); // clear form fields

            // clear manually
            // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
        })

        // form add operation
        $('#formTt').on('click', '.btnAdd', function (e) {
            // console.log('btnCreate is clicked');

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            FormSubmitButton = document.querySelector('#btnAddNewTtFormSubmitButton');

            // Validation
            fv = FormValidation.formValidation(TtForm, formOptions);

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
                    url: `${HOST_URL}/api/v1/project/task-timers`,
                    data: {
                        _taskId: document.querySelector('#ttTaskId').value,
                        startTime: document.querySelector('#ttStartTime').value,
                        endTime: document.querySelector('#ttEndTime').value,
                        timeSpend: document.querySelector('#ttTimeSpend').value,
                        note: document.querySelector('#ttNote').value,
                        _userId: document.querySelector('#ttUserId').value,
                    },
                }).then(function (res) {

                    // Return valid JSON
                    // console.log(res);

                    // Release button
                    KTUtil.btnRelease(FormSubmitButton);

                    if (res.data.status == 'success') {
                        // reseting & clearing
                        $('#modalTt').modal('hide')  // hiding modal form
                        toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                        $('#tableTt').KTDatatable().reload(); // reload table
                    }
                    else if (res.data.status == 'error') {
                        $('#modalTt').modal('hide')  // hiding modal form
                        toastr.error(`${res.data.message}`, `${res.data.status}`)
                    }
                    else {
                        $('#modalTt').modal('hide')
                    };
                });
            });
        });

        // form save operation
        $('#formTt').on('click', '.btnSave', function (e) {
            console.log('btnSave is clicked');

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            FormSubmitButton = document.querySelector('#btnSaveTtFormSubmitButton');

            // Validation
            fv = FormValidation.formValidation(TtForm, formOptions);

            // validation failed
            fv.on('core.form.invalid', async function () {
                // console.log('Something went wrong!!');    
            });

            // validation successful
            fv.on('core.form.valid', async function () {

                const id = document.querySelector('#ttId').value;

                // Show loading state on button
                KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

                ttDeadlineNotified.value = (ttDeadlineNotified.value == 'on') ? true : false
                ttIsRepeat.value = (ttIsRepeat.value == 'on') ? true : false
                console.log(ttDeadlineNotified.value)
                console.log(ttIsRepeat.value)

                // Accessing Restful API
                await axios({
                    method: 'patch',
                    url: `${HOST_URL}/api/v1/project/task-timers/${id}`,
                    data: {

                        _taskId: document.querySelector('#ttTaskId').value,
                        startTime: document.querySelector('#ttStartTime').value,
                        endTime: document.querySelector('#ttEndTime').value,
                        timeSpend: document.querySelector('#ttTimeSpend').value,
                        note: document.querySelector('#ttNote').value,
                        _userId: document.querySelector('#ttUserId').value,
                    },
                }).then(function (res) {
                    // Return valid JSON
                    // console.log(res);

                    // Release button
                    KTUtil.btnRelease(FormSubmitButton);

                    if (res.data.status == 'success') {
                        // reseting & clearing
                        $('#modalTt').modal('hide')  // hiding modal form
                        toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                        $('#tableTt').KTDatatable().reload(); // reload table

                    }
                    else if (res.data.status == 'error') {
                        $('#modalTt').modal('hide')  // hiding modal form
                        toastr.error(`${res.data.message}`, `${res.data.status}`)
                    }
                    else {
                        $('#modalTt').modal('hide') // hiding modal form
                    };
                });
            });
        });

        // Edit Modal Window - opens modal with appropriate properties
        $('#tableTt').on('click', '.btnEdit', async function (e) {
            // console.log('btnEdit is clicked');

            var id = $(this).attr("aria-label");
            // console.log(id);

            FormSubmitButton = document.querySelector('#btnSaveTtFormSubmitButton');

            // enabling disabling buttons
            $('#btnAddNewTtFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
            $('#btnSaveTtFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

            $('#modalTt').modal('show');   // open modal

            $('#modalTt').find('.modal-title').text('Edit Entry'); // Setting title for modal

            // retrieving data
            await axios({
                method: 'GET',
                url: `${HOST_URL}/api/v1/project/task-timers/${id}`,
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
                    document.querySelector('#ttId').value = res.data.tasktimers._id;
                    document.querySelector('#ttTaskId').value = res.data.tasktimers._taskId;
                    document.querySelector('#ttStartTime').value = res.data.startTime.name;
                    document.querySelector('#ttEndTime').value = res.data.endTime.taskType;
                    document.querySelector('#ttTimeSpend').value = res.data.tasktimers.timeSpend;
                    document.querySelector('#ttNote').value = res.data.tasktimers.note;
                    document.querySelector('#ttUserId').value = res.data.tasktimers._userId;

                }

            });
        });

        // deleteOne operation
        $('#tableTt').on('click', '.btnDelete', function (e) {
            console.log('btnDelete Clicked');
            let ids = $(this).attr("aria-label");

            ids = ids.toString();

            const requests = {
                params: {
                    _id: ids,
                }
            }

            axios.delete(`${HOST_URL}/api/v1/project/task-timers`, requests);

            // reload table
            $('#tableTt').KTDatatable().reload();

        });

        // deleteAll mass operation
        datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
            // datatable.checkbox() access to extension methods
            const ids = datatable.checkbox().getSelectedId();
            const count = ids.length;

            $('#tableTt_selected_records_2').html(count);

            console.log(count)

            if (count > 0) {
                $('#tableTt_group_action_form_2').collapse('show');
            } else {
                $('#tableTt_group_action_form_2').collapse('hide');
            }
        });

    };

    return {
        // public functions
        init: function () {
            _TaskTimers();

        },
    };
})();

jQuery(document).ready(function () {
    TaskTimersCRUD.init();
});  