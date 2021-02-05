/* eslint-disable */
'use strict';

/* Class definition */
const AnnouncementCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    /*   Private functions */
    function _AnnouncementEntries() {
      var dataSet;

      /* Table Options */
      const options = {
        // datasource definition
        data: {
          type: 'remote',
          source: {
            read: {
              method: 'get',
              url: `${HOST_URL}/api/v1/announcement/entries/table`,
              params: {
                fields: '_id, title, from, priority, expires, status, createdBy,createdAt,updatedAt',
              },
              map: function(raw) {
                // sample data mapping
                // console.log('raw', raw);
                dataSet = raw;

                if (typeof raw.announcementEntries !== 'undefined') {
                  dataSet = raw.announcementEntries;
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
          input: $('#tableAe_search_query_2'),
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
            field: 'title',
            title: 'Title',
          },
          {
            field: 'from',
            title: 'From',
          },
          {
            field: 'priority',
            title: 'Priority',
          },
          {
            field: 'expires',
            title: 'Expires In',
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
                              <a href="javascript:;" id="btnEdit" class="btn btn-sm btn-clean btn-icon btnEdit" title="Edit details" data-filed="_id" aria-label="'+ row._id +'">\
                              <i class="far fa-edit">\
                              </i>\
                              </a>\
                              <a href="javascript:;" id="btnDelete" class="btn btn-sm btn-clean btn-icon btnDelete" title="Delete" data-filed="_id" aria-label="'+ row._id +'">\
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
      const datatable = $('#tableAe').KTDatatable(options);

      /* Form */
      const AeForm = document.querySelector('#formAe');
      let FormSubmitButton = document.querySelector('#btnAddNewAeFormSubmitButton');
      // Options
      let formOptions = {
        fields: {
          aeTitle: {
            validators: {
              notEmpty: {
                message: 'Title is required',
              },
            },
          },
          aeFrom: {
            validators: {
              notEmpty: {
                message: 'From email address cannot be empty',
              },
            },
          },
          aeExpires: {
            validators: {
              notEmpty: {
                message: 'Select expiry option',
              },
            },
          },
          aePriority: {
            validators: {
              notEmpty: {
                message: 'This field is required',
              },
            },
          },
          aeMessage: {
            validators: {
              callback: {
                message: 'The content is required and cannot be empty',
                callback: function (input) {
                  const code = $('[name="aeMessage"]').summernote('code');
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
      $('#tableAe_search_status_2').on('change', function () {
        datatable.search($(this).val().toLowerCase(), 'Status');
      });

      // search based on type
      $('#tableAe_search_type_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Type');
      });

      $('#tableAe_search_status_2, #tableAe_search_type_2').selectpicker();

      // modal open
      $('#btnOpenAeModal').on('click', async function (e) {
        console.log('openButton is clicked');

        // enabling disabling buttons
        $('#btnAddNewAeFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
        $('#btnSaveAeFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

        FormSubmitButton = document.querySelector('#btnAddNewAeFormSubmitButton');

        $('#modalAe').modal('show');   // open modal

        $('#modalAe').find('.modal-title').text('Add New Entries'); // Setting title for modal

      });

      // modal post closed
      $('#modalAe').on('hidden.bs.modal', function (e) {
         console.log('Modal closed');

        if (fv) {
            // clearing forms
            fv.resetForm();
            fv.destroy();
          }

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message

          // clearing fields
          $("#formAe").trigger('reset'); // clear form fields

          // manually resetting other fields
          $('#aeExpires').empty().trigger('change');  // clearing select2  */

      });

      // modal post opened
      $('#modalAe').on('shown.bs.modal', function (e) {
         console.log('Modal open');

         // Initializing
        $('#aeMessage').summernote({
          height: 400,
          tabsize: 2,
        });

        $('#aeExpires').select2({
          placeholder: "Select expiry"
        });

      });

      // form reset operation
      $('#formAe').on('click', '.btnReset', function (e) {
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
        $("#formAe").trigger('reset'); // clear form fields

        // clear manually
        // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
      })

      // form add operation
      $('#formAe').on('click', '.btnAdd', function (e) {
        // console.log('btnCreate is clicked');

        // clearing validator messages
        $('.fv-plugins-message-container').text(''); // remove message
        
        FormSubmitButton = document.querySelector('#btnAddNewAeFormSubmitButton');

        // Validation
        fv = FormValidation.formValidation(AeForm, formOptions);

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
                url: `${HOST_URL}/api/v1/announcement/entries`,
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
                    $('#modalAe').modal('hide')  // hiding modal form
                    toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                    $('#tableAe').KTDatatable().reload(); // reload table
                }
                else if (res.data.status == 'error') {
                    $('#modalAe').modal('hide')  // hiding modal form
                    toastr.error(`${res.data.message}`, `${res.data.status}`)
                }
                else {
                    $('#modalAe').modal('hide')
                };
            });
        });
      });

      // form save operation
      $('#formAe').on('click', '.btnSave', function (e) {
        console.log('btnSave is clicked');

        // clearing validator messages
        $('.fv-plugins-message-container').text(''); // remove message
        
        FormSubmitButton = document.querySelector('#btnSaveAeFormSubmitButton');

        // Validation
        fv = FormValidation.formValidation(AeForm, formOptions);

        // validation failed
        fv.on('core.form.invalid', async function () {
            // console.log('Something went wrong!!');    
        });

        // validation successful
        fv.on('core.form.valid', async function () {

            const id = document.querySelector('#aeId').value;

            // Show loading state on button
            KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

            // Accessing Restful API
            await axios({
                method: 'patch',
                url: `${HOST_URL}/api/v1/announcement/entries/${id}`,
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
                    $('#modalAe').modal('hide')  // hiding modal form
                    toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                    $('#tableAe').KTDatatable().reload(); // reload table

                }
                else if (res.data.status == 'error') {
                    $('#modalAe').modal('hide')  // hiding modal form
                    toastr.error(`${res.data.message}`, `${res.data.status}`)
                }
                else {
                    $('#modalAe').modal('hide') // hiding modal form
                };
            });
        });
      });

      // Edit Modal Window - opens modal with appropriate properties
      $('#tableAe').on('click', '.btnEdit', async function (e) {
        // console.log('btnEdit is clicked');

        var id = $(this).attr("aria-label");
        // console.log(id);

        FormSubmitButton = document.querySelector('#btnSaveAeFormSubmitButton');

        // enabling disabling buttons
        $('#btnAddNewAeFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
        $('#btnSaveAeFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

        $('#modalAe').modal('show');   // open modal

        $('#modalAe').find('.modal-title').text('Edit Entry'); // Setting title for modal

        // retrieving data
        await axios({
            method: 'GET',
            url: `${HOST_URL}/api/v1/announcement/entries/${id}`,
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
      $('#tableAe').on('click', '.btnDelete', function (e) {
        console.log('btnDelete Clicked');
        let ids = $(this).attr("aria-label");

        ids = ids.toString();

        const requests = {
            params: {
                _id: ids,
            }
        }

        axios.delete(`${HOST_URL}/api/v1/announcement/entries`, requests);

        // reload table
        $('#tableAe').KTDatatable().reload();
        
      });

      // deleteAll mass operation
      datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
        // datatable.checkbox() access to extension methods
        const ids = datatable.checkbox().getSelectedId();
        const count = ids.length;
    
        $('#tableAe_selected_records_2').html(count);

        console.log(count)
    
        if (count > 0) {
            $('#tableAe_group_action_form_2').collapse('show');
        } else {
            $('#tableAe_group_action_form_2').collapse('hide');
        }
      });

    };

    /*   Private functions */
    function _AnnouncementNotification() {
        var dataSet;

        /* Table Options */
        const options = {
          // datasource definition
          data: {
            type: 'remote',
            source: {
              read: {
                method: 'get',
                url: `${HOST_URL}/api/v1/announcement/notification/table`,
                params: {
                  fields: '_id, _announcementId, priority, createdBy,createdAt,updatedAt,updatedBy',
                },
                map: function (raw) {
                  // sample data mapping
                  // console.log('raw', raw);
                  dataSet = raw;

                  if (typeof raw.announcementNotification !== 'undefined') {
                    dataSet = raw.announcementNotification;
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
              field: '_announcementId',
              title: 'Announcement Id',
            },

            {
              field: 'priority',
              title: 'Priority',
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
                                <a href="javascript:;" id="btnEdit" class="btn btn-sm btn-clean btn-icon btnEdit" title="Edit details" data-filed="_id" aria-label="'+ row._id +'">\
                                <i class="far fa-edit">\
                                </i>\
                                </a>\
                                <a href="javascript:;" id="btnDelete" class="btn btn-sm btn-clean btn-icon btnDelete" title="Delete" data-filed="_id" aria-label="'+ row._id +'">\
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
        const datatable = $('#tableAn').KTDatatable(options);

        /* Form Initialize */
        const AnForm = document.querySelector('#formAn');
        let FormSubmitButton = document.querySelector('#btnAddNewAnFormSubmitButton');
        let formOptions =    {
            fields: {
              anID: {
                validators: {
                  notEmpty: {
                    message: 'Announcement ID is required',
                  },
                },
              },

              anRecipientID: {
                validators: {
                  notEmpty: {
                    message: 'Recipient ID is required',
                  },
                },
              },

              anPriority: {
                validators: {
                  notEmpty: {
                    message: 'Priority is required',
                  },
                },
              },

              anName: {
                validators: {
                  notEmpty: {
                    message: 'Name is required',
                  },
                },
              },

              anEmail: {
                validators: {
                  notEmpty: {
                    message: 'Email is required',
                  },
                },
              },

              anIsEmailSent: {
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
                FormSubmitButton: new FormValidation.plugins.SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
      }

      let fv;

      /* Search Operations */
      // search based on status
      $('#tableAn_search_status_2').on('change', function () {
        datatable.search($(this).val().toLowerCase(), 'Status');
      });

      // search based on type
      $('#tableAn_search_type_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Type');
      });

        $('#tableAn_search_status_2, #tableAn_search_type_2').selectpicker();

      /* Modal Operations */
      // to open modal
      $('#btnOpenAnModal').on('click', async function (e) {
      // console.log('btnNewItem is clicked');

      FormSubmitButton = document.querySelector('#btnAddNewAnFormSubmitButton');

      // enabling disabling buttons
      $('#btnAddNewAnFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
      $('#btnSaveAnFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

      $('#modalAn').modal('show');   // open modal

      $('#modalAn').find('.modal-title').text('Add New Announcement Notification'); // Setting title for modal

      });

      // modal post closed
      $('#modalAn').on('hidden.bs.modal', function (e) {
          //  console.log('Modal is closed');

          if (fv) {
              // clearing forms
              fv.resetForm();
              fv.destroy();
           }

           // clearing validator messages
           $('.fv-plugins-message-container').text(''); // remove message

           // clearing fields
           $("#formAn").trigger('reset'); // clear form fields

           // manually resetting other fields
           $('#anEmail').empty().trigger('change');  // clearing select2  */

      });

      // modal post opened
      $('#modalAn').on('shown.bs.modal', function (e) {

      // Initializing


      });

    };

    return {
      // public functions
        init: function () {
        _AnnouncementEntries();
        _AnnouncementNotification();
      },
    };
})();

jQuery(document).ready(function () {
    AnnouncementCRUD.init();
});