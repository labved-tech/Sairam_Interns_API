/* eslint-disable */
//'use strict';

/* Class definition */
const RatingCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    /*   Private functions */
    // function _RatingAttributeGroups() {
    //     var dataSet;

    //     /* Table Options */
    //     const options = {
    //         // datasource definition
    //         data: {
    //             type: 'remote',
    //             source: {
    //                 read: {
    //                     method: 'get',
    //                     url: `${HOST_URL}/api/v1/ratings/attribute/groups/table`,
    //                     params: {
    //                         fields: '_id, title, from, priority, expires, status, createdBy,createdAt,updatedAt',
    //                     },
    //                     map: function (raw) {
    //                         // sample data mapping
    //                         // console.log('raw', raw);
    //                         dataSet = raw;

    //                         if (typeof raw.ratingAttributeGroups !== 'undefined') {
    //                             dataSet = raw.ratingAttributeGroups;
    //                             // console.log('dataSet', dataSet);
    //                         }
    //                         return dataSet;
    //                     }

    //                 },
    //             },
    //             pageSize: 10,
    //             serverPaging: true,
    //             serverFiltering: true,
    //             serverSorting: true,
    //             //autoColumns: true,  // newly added
    //         },

    //         // layout definition
    //         layout: {
    //             scroll: true, // enable/disable datatable scroll both horizontal and
    //             footer: false, // display/hide footer
    //             height: 450,

    //         },

    //         // column sorting
    //         sortable: true,

    //         pagination: true,
    //         search: {
    //             input: $('#tableRag_search_query_2'),
    //             key: 'generalSearch',
    //         },

    //         // columns definition
    //         columns: [
    //             {
    //                 field: '_id',
    //                 title: '#',
    //                 sortable: false,
    //                 width: 20,
    //                 selector: {
    //                     class: '',
    //                 },
    //                 textAlign: 'center',
    //             },
    //             {
    //                 field: 'name',
    //                 title: 'Name',
    //             },
    //             {
    //                 field: 'attributId',
    //                 title: 'AttributId',
    //             },
    //             {
    //                 field: 'status',
    //                 title: 'Status',
    //             },
    //             {
    //                 field: 'description',
    //                 title: 'Description',
    //             },
    //             {
    //                 field: 'createdBy',
    //                 title: 'createdBy',
    //             },
    //             {
    //                 field: 'createdAt',
    //                 title: 'createdAt',
    //             },
    //             {
    //                 field: 'updatedAt',
    //                 title: 'updatedAt',
    //             },
    //             {
    //                 field: 'details',
    //                 title: 'Details',
    //                 textAlign: 'center',
    //                 //width: 100,
    //                 sortable: false,
    //                 template: function () {
    //                     return '\
    //             <a href="#" class="btn btn-sm btn-light" role="button">\
    //               view details\
    //             </a >\
    //             '
    //                         ;
    //                 },
    //             },
    //             {
    //                 field: 'Actions',
    //                 title: 'Actions',
    //                 sortable: false,
    //                 width: 125,
    //                 overflow: 'visible',
    //                 autoHide: false,
    //                 template: function (row) {
    //                     return '\
    //                                 <div class="dropdown dropdown-inline">\
    //                                     <a href="javascript:;" class="btn btn-sm btn-clean btn-icon mr-2" data-toggle="dropdown">\
    //                                     <i class="fas fa-cog">\
    //                                     </i>\
    //                                     </a>\
    //                                     <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
    //                                         <ul class="navi flex-column navi-hover py-2">\
    //                                             <li class="navi-header font-weight-bolder text-uppercase font-size-xs text-primary pb-2">\
    //                                                 Choose an action:\
    //                                             </li>\
    //                                             <li class="navi-item">\
    //                                                 <a href="#" class="navi-link">\
    //                                                     <span class="navi-icon"><i class="fas fa-print"></i></span>\
    //                                                     <span class="navi-text">Print</span>\
    //                                                 </a>\
    //                                             </li>\
    //                                             <li class="navi-item">\
    //                                                 <a href="#" class="navi-link">\
    //                                                     <span class="navi-icon"><i class="fas fa-copy"></i></span>\
    //                                                     <span class="navi-text">Copy</span>\
    //                                                 </a>\
    //                                             </li>\
    //                                             <li class="navi-item">\
    //                                                 <a href="#" class="navi-link">\
    //                                                     <span class="navi-icon"><i class="fas fa-file-excel"></i></span>\
    //                                                     <span class="navi-text">Excel</span>\
    //                                                 </a>\
    //                                             </li>\
    //                                             <li class="navi-item">\
    //                                                 <a href="#" class="navi-link">\
    //                                                     <span class="navi-icon"><i class="fas fa-file-csv"></i></span>\
    //                                                     <span class="navi-text">CSV</span>\
    //                                                 </a>\
    //                                             </li>\
    //                                             <li class="navi-item">\
    //                                                 <a href="#" class="navi-link">\
    //                                                     <span class="navi-icon"><i class="fas fa-file-pdf"></i></span>\
    //                                                     <span class="navi-text">PDF</span>\
    //                                                 </a>\
    //                                             </li>\
    //                                         </ul>\
    //                                     </div>\
    //                                 </div>\
    //                                 <a href="javascript:;" id="btnEdit" class="btn btn-sm btn-clean btn-icon btnEdit" title="Edit details" data-filed="_id" aria-label="'+ row._id + '">\
    //                                 <i class="far fa-edit">\
    //                                 </i>\
    //                                 </a>\
    //                                 <a href="javascript:;" id="btnDelete" class="btn btn-sm btn-clean btn-icon btnDelete" title="Delete" data-filed="_id" aria-label="'+ row._id + '">\
    //                                 <i class="far fa-trash-alt">\
    //                                 </i>\
    //                                 </a>\
    //                             ';
    //                 },
    //             },
    //         ],
    //     }
    //     options.extensions = {
    //         // boolean or object (extension options)
    //         checkbox: true,
    //     };

    //     /* Table Initialize */
    //     const datatable = $('#tableRag').KTDatatable(options);
    //     /* Form */
    //     const RagForm = document.querySelector('#formRag');
    //     let FormSubmitButton = document.querySelector('#btnAddNewRagFormSubmitButton');
    //     // Options
    //     let formOptions = {
    //         fields: {
    //             ragName: {
    //                 validators: {
    //                     notEmpty: {
    //                         message: 'Name is required',
    //                     },
    //                 },
    //             },
    //             ragAttributeId: {
    //                 validators: {
    //                     notEmpty: {
    //                         message: '_attributeId is required',
    //                     },
    //                 },
    //             },
    //             ragStatus: {
    //                 validators: {
    //                     notEmpty: {
    //                         message: 'Status is required',
    //                     },
    //                 },
    //             },
    //             ragDescription: {
    //                 validators: {
    //                     callback: {
    //                         message: 'The content is required and cannot be empty',
    //                         callback: function (input) {
    //                             const code = $('[name="ragDescription"]').summernote('code');
    //                             // <p><br></p> is code generated by Summernote for empty content
    //                             return (code !== '' && code !== '<p><br></p>');
    //                         }
    //                     },
    //                 },
    //             },
    //         },
    //         plugins: {
    //             //Learn more: https://formvalidation.io/guide/plugins
    //             trigger: new FormValidation.plugins.Trigger(),
    //             // Bootstrap Framework Integration
    //             bootstrap: new FormValidation.plugins.Bootstrap(),
    //             // Validate fields when clicking the Submit button
    //             RagFormSubmitButton: new FormValidation.plugins.SubmitButton(),
    //             // Submit the form when all fields are valid
    //             //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
    //         },
    //     };

    //     let fv;

    //     /* Search Operations */
    //     // search based on status
    //     $('#tableRag_search_status_2').on('change', function () {
    //         datatable.search($(this).val().toLowerCase(), 'Status');
    //     });

    //     // search based on type
    //     $('#tableRag_search_type_2').on('change', function () {
    //         datatable.search($(this).val().toLowerCase(), 'Type');
    //     });

    //     $('#tableRag_search_status_2, #tableRag_search_type_2').selectpicker();

    //     // modal open
    //     $('#btnOpenRagModal').on('click', async function (e) {
    //         console.log('openButton is clicked');

    //         // enabling disabling buttons
    //         $('#btnAddNewRagFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
    //         $('#btnSaveRagFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

    //         FormSubmitButton = document.querySelector('#btnAddNewRagFormSubmitButton');

    //         $('#modalRag').modal('show');   // open modal

    //         $('#modalRag').find('.modal-title').text('Add New Entries'); // Setting title for modal

    //     });
    //     // modal post closed
    //     $('#modalRag').on('hidden.bs.modal', function (e) {
    //         console.log('Modal closed');

    //         if (fv) {
    //             // clearing forms
    //             fv.resetForm();
    //             fv.destroy();
    //         }

    //         // clearing validator messages
    //         $('.fv-plugins-message-container').text(''); // remove message

    //         // clearing fields
    //         $("#formRag").trigger('reset'); // clear form fields

    //         // manually resetting other fields
    //         $('#ragExpires').empty().trigger('change');  // clearing select2  */

    //     });

    //     // modal post opened
    //     $('#modalRag').on('shown.bs.modal', function (e) {
    //         console.log('Modal open');

    //         // Initialise
    //         $(ragDescription).summernote({
    //             height: 400,
    //             tabsize: 2,
    //         });
    //     });

    //     // form reset operation
    //     $('#formRag').on('click', '.btnReset', function (e) {
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
    //         $("#formRag").trigger('reset'); // clear form fields

    //         // clear manually
    //         // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
    //     })

    //     // form add operation
    //     $('#formRag').on('click', '.btnAdd', function (e) {
    //         // console.log('btnCreate is clicked');

    //         // clearing validator messages
    //         $('.fv-plugins-message-container').text(''); // remove message

    //         FormSubmitButton = document.querySelector('#btnAddNewRagFormSubmitButton');

    //         // Validation
    //         fv = FormValidation.formValidation(RagForm, formOptions);

    //         // validation failed
    //         fv.on('core.form.invalid', async function () {
    //             // console.log('Something went wrong!!');    
    //         });

    //         // validation successful
    //         fv.on('core.form.valid', async function () {

    //             // Show loading state on button
    //             KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

    //             // Accessing Restful API
    //             await axios({
    //                 method: 'post',
    //                 url: `${HOST_URL}/api/v1/ratings/attribute/groups`,
    //                 data: {
    //                     name: document.querySelector('#ragName').value,
    //                     description: $('#ragDescription').summernote('code'),   // not working - Summernote WYSIWYG
    //                     _attributeId: document.querySelector('#ragAttributeId').value,
    //                     status: document.querySelector('#ragStatus').value,
    //                 },
    //             }).then(function (res) {

    //                 // Return valid JSON
    //                 // console.log(res);

    //                 // Release button
    //                 KTUtil.btnRelease(FormSubmitButton);

    //                 if (res.data.status == 'success') {
    //                     // reseting & clearing
    //                     $('#modalRag').modal('hide')  // hiding modal form
    //                     toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
    //                     $('#tableRag').KTDatatable().reload(); // reload table
    //                 }
    //                 else if (res.data.status == 'error') {
    //                     $('#modalRag').modal('hide')  // hiding modal form
    //                     toastr.error(`${res.data.message}`, `${res.data.status}`)
    //                 }
    //                 else {
    //                     $('#modalRag').modal('hide')
    //                 };
    //             });
    //         });
    //     });

    //     // form save operation
    //     $('#formRag').on('click', '.btnSave', function (e) {
    //         console.log('btnSave is clicked');

    //         // clearing validator messages
    //         $('.fv-plugins-message-container').text(''); // remove message

    //         FormSubmitButton = document.querySelector('#btnSaveRagFormSubmitButton');

    //         // Validation
    //         fv = FormValidation.formValidation(RagForm, formOptions);

    //         // validation failed
    //         fv.on('core.form.invalid', async function () {
    //             // console.log('Something went wrong!!');    
    //         });

    //         // validation successful
    //         fv.on('core.form.valid', async function () {

    //             const id = document.querySelector('#ragId').value;

    //             // Show loading state on button
    //             KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

    //             // Accessing Restful API
    //             await axios({
    //                 method: 'patch',
    //                 url: `${HOST_URL}/api/v1/ratings/attribute/groups/${id}`,
    //                 data: {
    //                     name: document.querySelector('#ragName').value,
    //                     description: $('#ragDescription').summernote('code'),   // not working - Summernote WYSIWYG
    //                     _attributeId: document.querySelector('#ragAttributeId').value,
    //                     status: document.querySelector('#ragStatus').value,
    //                 },
    //             }).then(function (res) {
    //                 // Return valid JSON
    //                 // console.log(res);

    //                 // Release button
    //                 KTUtil.btnRelease(FormSubmitButton);

    //                 if (res.data.status == 'success') {
    //                     // reseting & clearing
    //                     $('#modalRag').modal('hide')  // hiding modal form
    //                     toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
    //                     $('#tableRag').KTDatatable().reload(); // reload table

    //                 }
    //                 else if (res.data.status == 'error') {
    //                     $('#modalRag').modal('hide')  // hiding modal form
    //                     toastr.error(`${res.data.message}`, `${res.data.status}`)
    //                 }
    //                 else {
    //                     $('#modalRag').modal('hide') // hiding modal form
    //                 };
    //             });
    //         });
    //     });

    //     // Edit Modal Window - opens modal with appropriate properties
    //     $('#tableRag').on('click', '.btnEdit', async function (e) {
    //         // console.log('btnEdit is clicked');

    //         var id = $(this).attr("aria-label");
    //         // console.log(id);

    //         FormSubmitButton = document.querySelector('#btnSaveRagFormSubmitButton');

    //         // enabling disabling buttons
    //         $('#btnAddNewRagFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
    //         $('#btnSaveRagFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

    //         $('#modalRag').modal('show');   // open modal

    //         $('#modalRag').find('.modal-title').text('Edit Entry'); // Setting title for modal

    //         // retrieving data
    //         await axios({
    //             method: 'GET',
    //             url: `${HOST_URL}/api/v1/ratings/attribute/groups/${id}`,
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
    //                 document.querySelector('#ragName').value = res.data.announcementEntries._id;
    //                 document.querySelector('#ragAttributeId').value = res.data.announcementEntries.title;
    //                 document.querySelector('#ragStatus').value = res.data.announcementEntries.from;
    //                 document.querySelector('#ragDescription').value = res.data.announcementEntries.isEmailReq;
    //             }
    //         });
    //     });

    //     // deleteOne operation
    //     $('#tableRag').on('click', '.btnDelete', function (e) {
    //         console.log('btnDelete Clicked');
    //         let ids = $(this).attr("aria-label");

    //         ids = ids.toString();

    //         const requests = {
    //             params: {
    //                 _id: ids,
    //             }
    //         }

    //         axios.delete(`${HOST_URL}/api/v1/ratings/attribute/groups`, requests);

    //         // reload table
    //         $('#tableRag').KTDatatable().reload();

    //     });

    //     // deleteAll mass operation
    //     datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
    //         // datatable.checkbox() access to extension methods
    //         const ids = datatable.checkbox().getSelectedId();
    //         const count = ids.length;

    //         $('#tableRag_selected_records_2').html(count);

    //         console.log(count)

    //         if (count > 0) {
    //             $('#tableRag_group_action_form_2').collapse('show');
    //         } else {
    //             $('#tableRag_group_action_form_2').collapse('hide');
    //         }
    //     });

    // };

    /*   Private functions */
    function _RatingAttribute() {
        var dataSet;

        /* Table Options */
        const options = {
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: 'get',
                        url: `${HOST_URL}/api/v1/ratings/Attribute/table`,
                        params: {
                            fields: ' name, type, description, notes, status, createdBy,createdAt,updatedAt',
                        },
                        map: function (raw) {
                            // sample data mapping
                            console.log('raw', raw);
                            dataSet = raw;

                            if (typeof raw.ratingAttribute !== 'undefined') {
                                dataSet = raw.ratingAttribute;
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
                input: $('#tableRa_search_query_2'),
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
                    field: 'type',
                    title: 'Type',
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
                    width: 100,
                    sortable: false,
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
        const datatable = $('#tableRa').KTDatatable(options);

        /* Form */
        const RaForm = document.querySelector('#formRa');
        let FormSubmitButton = document.querySelector('#btnAddNewRaFormSubmitButton');
        // Options
        let formOptions = {
            fields: {
                raName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                        },
                    },
                },
                raType: {
                    validators: {
                        notEmpty: {
                            message: 'Type is required',
                        },
                    },
                },
                raDescription: {
                    validators: {
                        callback: {
                            message: 'The content is required and cannot be empty',
                            callback: function (input) {
                                const code = $('[name="raDescription"]').summernote('code');
                                // <p><br></p> is code generated by Summernote for empty content
                                return (code !== '' && code !== '<p><br></p>');
                            }
                        },
                    },
                },
                raNotes: {
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
                raFormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
        };

        let fv;

        /* Search Operations */
        // search based on status
        $('#tableRa_search_status_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });

        // search based on type
        $('#tableRa_search_type_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#tableRa_search_status_2, #tableRa_search_type_2').selectpicker();

        // modal open
        $('#btnOpenRaModal').on('click', async function (e) {
            console.log('openButton is clicked');

            // enabling disabling buttons
            $('#btnAddNewRaFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
            $('#btnSaveRaFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

            FormSubmitButton = document.querySelector('#btnAddNewRaFormSubmitButton');

            $('#modalRa').modal('show');   // open modal

            $('#modalRa').find('.modal-title').text('Add New Entries'); // Setting title for modal

        });

        // modal post closed
        $('#modalRa').on('hidden.bs.modal', function (e) {
            console.log('Modal closed');

            if (fv) {
                // clearing forms
                fv.resetForm();
                fv.destroy();
            }

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            // clearing fields
            $("#formRa").trigger('reset'); // clear form fields

            // manually resetting other fields
            $('#raExpires').empty().trigger('change');  // clearing select2  */

        });

        // modal post opened
        $('#modalRa').on('shown.bs.modal', function (e) {
            console.log('Modal open');

            // Initialise
            $(raType).select2({
                placeholder: "Select a Type"
            });

            $(raDescription).summernote({
                height: 400,
                tabsize: 2,
            });
        });

        // form reset operation
        $('#formRa').on('click', '.btnReset', function (e) {
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
            $("#formRa").trigger('reset'); // clear form fields

            // clear manually
            // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
        })

        // form add operation
        $('#formRa').on('click', '.btnAdd', function (e) {
            // console.log('btnCreate is clicked');

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            FormSubmitButton = document.querySelector('#btnAddNewRaFormSubmitButton');

            // Validation
            fv = FormValidation.formValidation(RaForm, formOptions);

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
                    url: `${HOST_URL}/api/v1/ratings/attribute`,
                    data: {
                        name: document.querySelector('#raName').value,
                        description: $('#raDescription').summernote('code'),   // not working - Summernote WYSIWYG
                        type: document.querySelector('#raType').value,
                        notes: document.querySelector('#raNotes').value,
                    },
                }).then(function (res) {

                    // Return valid JSON
                    // console.log(res);

                    // Release button
                    KTUtil.btnRelease(FormSubmitButton);

                    if (res.data.status == 'success') {
                        // reseting & clearing
                        $('#modalRa').modal('hide')  // hiding modal form
                        toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                        $('#tableRa').KTDatatable().reload(); // reload table
                    }
                    else if (res.data.status == 'error') {
                        $('#modalRa').modal('hide')  // hiding modal form
                        toastr.error(`${res.data.message}`, `${res.data.status}`)
                    }
                    else {
                        $('#modalRa').modal('hide')
                    };
                });
            });
        });

        // form save operation
        $('#formRa').on('click', '.btnSave', function (e) {
            console.log('btnSave is clicked');

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            FormSubmitButton = document.querySelector('#btnSaveRaFormSubmitButton');

            // Validation
            fv = FormValidation.formValidation(RaForm, formOptions);

            // validation failed
            fv.on('core.form.invalid', async function () {
                // console.log('Something went wrong!!');    
            });

            // validation successful
            fv.on('core.form.valid', async function () {

                const id = document.querySelector('#raId').value;

                // Show loading state on button
                KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

                // Accessing Restful API
                await axios({
                    method: 'patch',
                    url: `${HOST_URL}/api/v1/ratings/attribute/${id}`,
                    data: {
                        name: document.querySelector('#raName').value,
                        description: $('#raDescription').summernote('code'),   // not working - Summernote WYSIWYG
                        type: document.querySelector('#raType').value,
                        notes: document.querySelector('#raNotes').value,
                    },
                }).then(function (res) {
                    // Return valid JSON
                    // console.log(res);

                    // Release button
                    KTUtil.btnRelease(FormSubmitButton);

                    if (res.data.status == 'success') {
                        // reseting & clearing
                        $('#modalRa').modal('hide')  // hiding modal form
                        toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                        $('#tableRa').KTDatatable().reload(); // reload table

                    }
                    else if (res.data.status == 'error') {
                        $('#modalRa').modal('hide')  // hiding modal form
                        toastr.error(`${res.data.message}`, `${res.data.status}`)
                    }
                    else {
                        $('#modalRa').modal('hide') // hiding modal form
                    };
                });
            });
        });

        // Edit Modal Window - opens modal with appropriate properties
        $('#tableRa').on('click', '.btnEdit', async function (e) {
            // console.log('btnEdit is clicked');

            var id = $(this).attr("aria-label");
            // console.log(id);

            FormSubmitButton = document.querySelector('#btnSaveRaFormSubmitButton');

            // enabling disabling buttons
            $('#btnAddNewRaFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
            $('#btnSaveRaFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

            $('#modalRa').modal('show');   // open modal

            $('#modalRa').find('.modal-title').text('Edit Entry'); // Setting title for modal

            // retrieving data
            await axios({
                method: 'GET',
                url: `${HOST_URL}/api/v1/ratings/attribute/${id}`,
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
                    document.querySelector('#raId').value = res.data.ratingAttribute._id;
                    document.querySelector('#raName').value = res.data.ratingAttribute.name;
                    document.querySelector('#raType').value = res.data.ratingAttribute.type;
                    document.querySelector('#raDescription').value = res.data.ratingAttribute.description;
                    document.querySelector('#raNotes').value = res.data.ratingAttribute.notes;
                }
            });
        });

        // deleteOne operation
        $('#tableRa').on('click', '.btnDelete', function (e) {
            console.log('btnDelete Clicked');
            let ids = $(this).attr("aria-label");

            ids = ids.toString();

            const requests = {
                params: {
                    _id: ids,
                }
            }

            axios.delete(`${HOST_URL}/api/v1/ratings/attribute`, requests);

            // reload table
            $('#tableRa').KTDatatable().reload();

        });

        // deleteAll mass operation
        datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
            // datatable.checkbox() access to extension methods
            const ids = datatable.checkbox().getSelectedId();
            const count = ids.length;

            $('#tableRa_selected_records_2').html(count);

            console.log(count)

            if (count > 0) {
                $('#tableRa_group_action_form_2').collapse('show');
            } else {
                $('#tableRa_group_action_form_2').collapse('hide');
            }
        });

    };

    return {
        // public functions
        init: function () {
            // _RatingAttributeGroups();
            _RatingAttribute();

        },
    };
})();

jQuery(document).ready(function () {
    RatingCRUD.init();
});