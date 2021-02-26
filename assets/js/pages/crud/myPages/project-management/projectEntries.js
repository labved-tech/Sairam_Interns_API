/* eslint-disable */
'use strict';

/* Class definition */
const ProjectEntriesCRUD = (function () {
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
    function _ProjectEntries() {
        var dataSet;

        /* Table Options */
        const options = {
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: 'get',
                        url: `${HOST_URL}/api/v1/project/entries/table`,
                        params: {
                            fields: '_id,name,description,startDate,status,deadline,finished,progress,estimatedHours,type,_farmId,_farmRegionId,createdAt,updatedAt',
                        },
                        map: function (raw) {
                            // sample data mapping
                            // console.log('raw', raw);
                            dataSet = raw;

                            if (typeof raw.projectEntries !== 'undefined') {
                                dataSet = raw.projectEntries;
                                // console.log('dataSet', dataSet);
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
                input: $('#tablePe_search_query_2'),
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
                    template: function (row) {
                        return '\
                <div>\
                <a href="#">' + row.name + '</a></div>\
              ';
                    }
                },
                {
                    field: 'description',
                    title: 'Description',
                },
                {
                    field: 'status',
                    title: 'Status',
                },
                {
                    field: 'deadline',
                    title: 'Deadline',
                },
                {
                    field: 'finished',
                    title: 'Finished',
                },
                {
                    field: 'progress',
                    title: 'Progress',
                },
                {
                    field: 'estimatedHours',
                    title: 'Estimated Hours',
                },
                {
                    field: 'type',
                    title: 'Type',
                },
                {
                    field: '_farmId',
                    title: 'Farm ID',
                },
                {
                    field: '_farmRegionId',
                    title: 'Farm Region ID',
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
        options.extensions = {
            // boolean or object (extension options)
            checkbox: true,
        };

        /* Table Initialize */
        const datatable = $('#tablePe').KTDatatable(options);

        /* Form */
        const PeForm = document.querySelector('#formPe');
        let FormSubmitButton = document.querySelector('#btnAddNewPeFormSubmitButton');
        // Options
        let formOptions = {
            fields: {
                peName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                        },
                    },
                },
                peDescription: {
                    validators: {
                        notEmpty: {
                            message: 'Description is required',
                        },
                    },
                },
                peStatus: {
                    validators: {
                        notEmpty: {
                            message: 'Status is required',
                        },
                    },
                },
                peStartDate: {
                    validators: {
                        notEmpty: {
                            message: 'Date is required',
                        },
                    },
                },
                peDeadline: {
                    validators: {
                        notEmpty: {
                            message: 'Date is required',
                        },
                    },
                },
                peFinished: {
                    validators: {
                        notEmpty: {
                            message: 'Date is required',
                        },
                    },
                },
                peProgress: {
                    validators: {
                        notEmpty: {
                            message: 'Progress is required',
                        },
                    },
                },
                peEstimatedHours: {
                    validators: {
                        notEmpty: {
                            message: 'Estimated Hours is required',
                        },
                    },
                },
                peType: {
                    validators: {
                        notEmpty: {
                            message: 'Type is required',
                        },
                    },
                },
                peFarmId: {
                    validators: {
                        notEmpty: {
                            message: 'Farm ID is required',
                        },
                    },
                },
                peFarmRegionId: {
                    validators: {
                        notEmpty: {
                            message: 'Farm Region ID is required',
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
        $('#tablePe_search_status_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });

        // search based on type
        $('#tablePe_search_type_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#tablePe_search_status_2, #tablePe_search_type_2').selectpicker();

        // modal open
        $('#btnOpenPeModal').on('click', async function (e) {
            console.log('openButton is clicked');

            // enabling disabling buttons
            $('#btnAddNewPeFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
            $('#btnSavePeFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

            FormSubmitButton = document.querySelector('#btnAddNewPeFormSubmitButton');

            $('#modalPe').modal('show');   // open modal

            $('#modalPe').find('.modal-title').text('Add New Entries'); // Setting title for modal

        });

        // modal post closed
        $('#modalPe').on('hidden.bs.modal', function (e) {
            console.log('Modal closed');

            if (fv) {
                // clearing forms
                fv.resetForm();
                fv.destroy();
            }

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            // clearing fields
            $("#formPe").trigger('reset'); // clear form fields

            // manually resetting other fields
        });

        // modal post opened
        $('#modalPe').on('shown.bs.modal', function (e) {
            console.log('Modal open');

            // Initializing

            // Date & Time : Date
            $('#peStartDate').datepicker({
                rtl: KTUtil.isRTL(),
                todayBtn: 'linked',
                clearBtn: true,
                todayHighlight: true,
                orientation: 'bottom left',
                templates: arrows,
            });
            $('#peDeadline').datepicker({
                rtl: KTUtil.isRTL(),
                todayBtn: 'linked',
                clearBtn: true,
                todayHighlight: true,
                orientation: 'bottom left',
                templates: arrows,
            });
            $('#peFinished').datepicker({
                rtl: KTUtil.isRTL(),
                todayBtn: 'linked',
                clearBtn: true,
                todayHighlight: true,
                orientation: 'bottom left',
                templates: arrows,
            });

            // Progress
            $('#peProgress').TouchSpin({
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
            // Estimated Hours
            $('#peEstimatedHours').TouchSpin({
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
        $('#formPe').on('click', '.btnReset', function (e) {
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
            $("#formPe").trigger('reset'); // clear form fields

            // clear manually
            // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
        })

        // form add operation
        $('#formPe').on('click', '.btnAdd', function (e) {
            // console.log('btnCreate is clicked');

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            FormSubmitButton = document.querySelector('#btnAddNewPeFormSubmitButton');

            // Validation
            fv = FormValidation.formValidation(PeForm, formOptions);

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
                    url: `${HOST_URL}/api/v1/project/entries`,
                    data: {
                        name: document.querySelector('#peName').value,
                        description: document.querySelector('#peDescription').value,
                        status: document.querySelector('#peStatus').value,
                        startDate: document.querySelector('#peStartDate').value,
                        deadline: document.querySelector('#peDeadline').value,
                        finished: document.querySelector('#peFinished').value,
                        progress: document.querySelector('#peProgress').value,
                        estimatedHours: document.querySelector('#peEstimatedHours').value,
                        type: document.querySelector('#peType').value,
                        _farmId: document.querySelector('#peFarmId').value,
                        _farmRegionId: document.querySelector('#peFarmRegionId').value,
                    },
                }).then(function (res) {

                    // Return valid JSON
                    // console.log(res);

                    // Release button
                    KTUtil.btnRelease(FormSubmitButton);

                    if (res.data.status == 'success') {
                        // reseting & clearing
                        $('#modalPe').modal('hide')  // hiding modal form
                        toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                        $('#tablePe').KTDatatable().reload(); // reload table
                    }
                    else if (res.data.status == 'error') {
                        $('#modalPe').modal('hide')  // hiding modal form
                        toastr.error(`${res.data.message}`, `${res.data.status}`)
                    }
                    else {
                        $('#modalPe').modal('hide')
                    };
                });
            });
        });

        // form save operation
        $('#formPe').on('click', '.btnSave', function (e) {
            console.log('btnSave is clicked');

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            FormSubmitButton = document.querySelector('#btnSavePeFormSubmitButton');

            // Validation
            fv = FormValidation.formValidation(PeForm, formOptions);

            // validation failed
            fv.on('core.form.invalid', async function () {
                // console.log('Something went wrong!!');    
            });

            // validation successful
            fv.on('core.form.valid', async function () {

                const id = document.querySelector('#peId').value;

                // Show loading state on button
                KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

                // Accessing Restful API
                await axios({
                    method: 'patch',
                    url: `${HOST_URL}/api/v1/project/entries/${id}`,
                    data: {
                        name: document.querySelector('#peName').value,
                        description: document.querySelector('#peDescription').value,
                        status: document.querySelector('#peStatus').value,
                        startDate: document.querySelector('#peStartDate').value,
                        deadline: document.querySelector('#peDeadline').value,
                        finished: document.querySelector('#peFinished').value,
                        progress: document.querySelector('#peProgress').value,
                        estimatedHours: document.querySelector('#peEstimatedHours').value,
                        type: document.querySelector('#peType').value,
                        _farmId: document.querySelector('#peFarmId').value,
                        _farmRegionId: document.querySelector('#peFarmRegionId').value,
                    },
                }).then(function (res) {
                    // Return valid JSON
                    // console.log(res);

                    // Release button
                    KTUtil.btnRelease(FormSubmitButton);

                    if (res.data.status == 'success') {
                        // reseting & clearing
                        $('#modalPe').modal('hide')  // hiding modal form
                        toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                        $('#tablePe').KTDatatable().reload(); // reload table

                    }
                    else if (res.data.status == 'error') {
                        $('#modalPe').modal('hide')  // hiding modal form
                        toastr.error(`${res.data.message}`, `${res.data.status}`)
                    }
                    else {
                        $('#modalPe').modal('hide') // hiding modal form
                    };
                });
            });
        });

        // Edit Modal Window - opens modal with appropriate properties
        $('#tablePe').on('click', '.btnEdit', async function (e) {
            // console.log('btnEdit is clicked');

            var id = $(this).attr("aria-label");
            // console.log(id);

            FormSubmitButton = document.querySelector('#btnSavePeFormSubmitButton');

            // enabling disabling buttons
            $('#btnAddNewPeFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
            $('#btnSavePeFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

            $('#modalPe').modal('show');   // open modal

            $('#modalPe').find('.modal-title').text('Edit Entry'); // Setting title for modal

            // retrieving data
            await axios({
                method: 'GET',
                url: `${HOST_URL}/api/v1/project/entries/${id}`,
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
                    document.querySelector('#peId').value = res.data.projectEntries._id;
                    document.querySelector('#peName').value = res.data.projectEntries.name;
                    document.querySelector('#peDescription').value = res.data.projectEntries.description;
                    document.querySelector('#peStatus').value = res.data.projectEntries.status;
                    document.querySelector('#peStartDate').value = res.data.projectEntries.startDate;
                    document.querySelector('#peDeadline').value = res.data.projectEntries.deadline;
                    document.querySelector('#peFinished').value = res.data.projectEntries.finished;
                    document.querySelector('#peProgress').value = res.data.projectEntries.progress;
                    document.querySelector('#peEstimatedHours').value = res.data.projectEntries.estimatedHours;
                    document.querySelector('#peType').value = res.data.projectEntries.type;
                    document.querySelector('#peFarmId').value = res.data.projectEntries._farmId;
                    document.querySelector('#peFarmRegionId').value = res.data.projectEntries._farmRegionId;
                }

            });
        });

        // deleteOne operation
        $('#tablePe').on('click', '.btnDelete', function (e) {
            console.log('btnDelete Clicked');
            let ids = $(this).attr("aria-label");

            ids = ids.toString();

            const requests = {
                params: {
                    _id: ids,
                }
            }

            axios.delete(`${HOST_URL}/api/v1/project/entries`, requests);

            // reload table
            $('#tablePe').KTDatatable().reload();

        });

        // deleteAll mass operation
        datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
            // datatable.checkbox() access to extension methods
            const ids = datatable.checkbox().getSelectedId();
            const count = ids.length;

            $('#tablePe_selected_records_2').html(count);

            console.log(count)

            if (count > 0) {
                $('#tablePe_group_action_form_2').collapse('show');
            } else {
                $('#tablePe_group_action_form_2').collapse('hide');
            }
        });

    };


    return {
        // public functions
        init: function () {
            _ProjectEntries();

        },
    };
})();

jQuery(document).ready(function () {
    ProjectEntriesCRUD.init();
});    