/* eslint-disable */
'use strict';

/* Class definition */
const DirectoryCRUD = (function () {
  const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';
  /*   Private functions */
  function _Directory() {
    var dataSet;

    /* Table Options */
    const options = {
      // datasource definition
      data: {
        type: 'remote',
        source: {
          read: {
            method: 'get',
            url: `${HOST_URL}/api/v1/directory/table`,
            params: {
              fields: '_id, name, single, plural, slug, categories, createdBy,createdAt,updatedAt,updatedBy',
            },
            map: function (raw) {
              // sample data mapping
              // console.log('raw', raw);
              dataSet = raw;

              if (typeof raw.directory !== 'undefined') {
                dataSet = raw.directory;
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
          field: 'name',
          title: 'Name',
        },

        {
          field: 'single',
          title: 'Single',
        },
        {
          field: 'slug',
          title: 'Slug',
        },
        {
          field: 'categories',
          title: 'Categories',
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
    const datatable = $('#tableDy').KTDatatable(options);

    /* Form Initialize */
    const DyForm = document.querySelector('#formDy');
    let FormSubmitButton = document.querySelector('#btnAddNewDyFormSubmitButton');
    let formOptions = {
      fields: {
        dName: {
          validators: {
            notEmpty: {
              message: 'Name is required',
            },
          },
        },
        dSingular: {
          validators: {
            notEmpty: {
              message: 'Singular is required',
            },
          },
        },
        dPlural: {
          validators: {
            notEmpty: {
              message: 'Plural  is required',
            },
          },
        },
        dSlug: {
          validators: {
            notEmpty: {
              message: 'Slug is required',
            },
          },
        },
        dCategories: {
          validators: {
            notEmpty: {
              message: 'Categories  is required',
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
    $('#tableDy_search_status_2').on('change', function () {
      datatable.search($(this).val().toLowerCase(), 'Status');
    });

    // search based on type
    $('#tableDy_search_type_2').on('change', function () {
      datatable.search($(this).val().toLowerCase(), 'Type');
    });

    $('#tableDy_search_status_2, #tableDy_search_type_2').selectpicker();

    /* Modal Operations */
    // to open modal 
    $('#btnOpenDyModal').on('click', async function (e) {
      console.log('btnNewItem is clicked');

      FormSubmitButton = document.querySelector('#btnAddNewDyFormSubmitButton');

      // enabling disabling buttons
      $('#btnAddNewDyFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
      $('#btnSaveDyFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

      $('#modalDy').modal('show');   // open modal  

      $('#modalDy').find('.modal-title').text('Add New Directory'); // Setting title for modal

    });

    // modal post closed
    $('#modalDy').on('hidden.bs.modal', function (e) {
      // console.log('Modal closed');

      if (fv) {
        // clearing forms
        fv.resetForm();
        fv.destroy();
      }

      // clearing validator messages
      $('.fv-plugins-message-container').text(''); // remove message

      // clearing fields
      $("#formDy").trigger('reset'); // clear form fields

      // manually resetting other fields
      $('#dyExpires').empty().trigger('change');  // clearing select2  */

    });

    // modal post opened
    $('#modalDy').on('shown.bs.modal', function (e) {
      // console.log('Modal opened');

      // Initializing 

      $('#dCategories').select2({
        placeholder: "Select expiry"
      });

    });

    // Edit Modal Window - opens modal with appropriate properties
    $('#tableDy').on('click', '.btnEdit', async function (e) {
      // console.log('btnEdit is clicked');

      var id = $(this).attr("aria-label");
      // console.log(id);

      FormSubmitButton = document.querySelector('#btnSaveDyFormSubmitButton');

      // enabling disabling buttons
      $('#btnAddNewDyFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
      $('#btnSaveDyFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

      $('#modalDy').modal('show');   // open modal

      $('#modalDy').find('.modal-title').text('Edit Entry'); // Setting title for modal
      // retrieving data
      await axios({
        method: 'GET',
        url: `${HOST_URL}/api/v1/directory/${id}`,
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
          document.querySelector('#dyId').value = res.data.newsletterMessages._id;
          document.querySelector('#dName').value = res.data.newsletterMessages.name;
          document.querySelector('#dSingular').value = res.data.newsletterMessages.singular;
          document.querySelector('#dPlural').value = res.data.newsletterMessages.plural;
          document.querySelector('#dSlug').value = res.data.newsletterMessages.slug;
          document.querySelector('#dCategories').value = res.data.newsletterMessages.categories;
        }
      });
    });
    // deleteOne operation
    $('#tableDy').on('click', '.btnDelete', function (e) {
      console.log('btnDelete Clicked');
      let ids = $(this).attr("aria-label");

      ids = ids.toString();

      const requests = {
        params: {
          _id: ids,
        }
      }

      axios.delete(`${HOST_URL}/api/v1/directory/`, requests);

      // reload table
      $('#tableDy').KTDatatable().reload();

    });

    // deleteAll mass operation
    datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
      // datatable.checkbox() access to extension methods
      const ids = datatable.checkbox().getSelectedId();
      const count = ids.length;

      $('#tableDy_selected_records_2').html(count);

      console.log(count)

      if (count > 0) {
        $('#tableDy_group_action_form_2').collapse('show');
      } else {
        $('#tableDy_group_action_form_2').collapse('hide');
      }
    });

    // form reset operation
    $('#formDy').on('click', '.btnReset', function (e) {
      // console.log('btnReset is clicked');

      if (fv) {
        // clearing forms
        fv.resetForm();
        fv.destroy();
      }
      else {
        // initiate validation
        fv = FormValidation.formValidation(DyForm, formOptions);
      }

      // clearing validator messages
      $('.fv-plugins-message-container').text(''); // remove message

      // clearing fields
      $("#formDy").trigger('reset'); // clear form fields

      // clear manually
      $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
    });

    // form add operation
    $('#formDy').on('click', '.btnAdd', function (e) {
      // console.log('addMenuSectionFormSubmitButton is clicked');

      // clearing validator messages
      $('.fv-plugins-message-container').text(''); // remove message

      FormSubmitButton = document.querySelector('#btnAddNewDyFormSubmitButton');

      // Validation
      fv = FormValidation.formValidation(DyForm, formOptions);

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
          url: `${HOST_URL}/api/v1/newsletter/messages`,
          data: {
            name: document.querySelector('#dName').value,
            singular: document.querySelector('#dSingular').value,
            plural: document.querySelector('#dPlural').value,
            slug: document.querySelector('#dSlug').value,
            categories: document.querySelector('#dCategories').value,

          },
        }).then(function (res) {
          // Release button
          KTUtil.btnRelease(FormSubmitButton);

          if (res.data.status == 'success') {
            // reseting & clearing
            $('#modalDy').modal('hide')  // hiding modal form
            toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
            $('#tableDy').KTDatatable().reload(); // reload table
          }
          else if (res.data.status == 'error') {
            $('#modalDy').modal('hide')  // hiding modal form
            toastr.error(`${res.data.message}`, `${res.data.status}`)
          }
          else {
            $('#modalDy').modal('hide')
          };
        });
      });
    });
    /* Modal Operations */
    // to open modal 
    $('#btnOpenDyModal').on('click', async function (e) {
      // console.log('btnNewItem is clicked');

      FormSubmitButton = document.querySelector('#btnAddNewDyFormSubmitButton');

      // enabling disabling buttons
      $('#btnAddNewDyFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
      $('#btnSaveDyFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

      $('#modalDy').modal('show');   // open modal  

      $('#modalDy').find('.modal-title').text('Add New Newsletter Messages'); // Setting title for modal

    });

    // modal post closed
    $('#modalDy').on('hidden.bs.modal', function (e) {
      //  console.log('Modal is closed');

      if (fv) {
        // clearing forms
        fv.resetForm();
        fv.destroy();
      }

      // clearing validator messages
      $('.fv-plugins-message-container').text(''); // remove message

      // clearing fields
      $("#formDy").trigger('reset'); // clear form fields


    });

    // modal post opened
    $('#modalDy').on('shown.bs.modal', function (e) {

      // Initializing 


    });


  };
  return {
    // public functions
    init: function () {
      _Directory();

    },
  };
})();

jQuery(document).ready(function () {
  DirectoryCRUD.init();
});

