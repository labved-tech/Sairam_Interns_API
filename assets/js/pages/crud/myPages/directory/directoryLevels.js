/* eslint-disable */
'use strict';

/* Class definition */
const DirectoryLevelsCRUD = (function () {
  const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';
  /*   Private functions */
  function _DirectoryLevels() {
    var dataSet;

    /* Table Options */
    const options = {
      // datasource definition
      data: {
        type: 'remote',
        source: {
          read: {
            method: 'get',
            url: `${HOST_URL}/api/v1/directory/levels/table`,
            params: {
              fields: '_id, name, description, activePeriod, changeLevelId, listingsInPackage, riseUpEnabled, sticky, featured, ownPage, unlimitedCategories, map, mapMakers, logoEnabled, imageLimit, videoLimit, contentFields, createdBy,createdAt,updatedAt',
            },
            map: function (raw) {
              // sample data mapping
              // console.log('raw', raw);
              dataSet = raw;

              if (typeof raw.directoryLevels !== 'undefined') {
                dataSet = raw.directoryLevels;
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
          field: 'description',
          title: 'Description',
        },
        {
          field: 'activePeriod',
          title: 'ActivePeriod',
        },
        {
          field: 'changeLevelId',
          title: 'changeLevelId ',
        },
        {
            field: 'listingsInPackage',
            title: 'listingsInPackage',
          },
          {
            field: 'riseUpEnabled',
            title: 'RiseUpEnabled',
          },
          {
            field: 'recipientEmail',
            title: 'Recipient Email',
          },
          {
            field: 'sticky',
            title: 'Sticky',
          },
        
        {
          field: 'featured',
          title: 'Featured',
        },
        {
          field: 'ownPage',
          title: 'OwnPage',
        },
        {
            field: 'unlimitedCategories',
            title: 'UnlimitedCategories',
          },
          {
            field: 'map',
            title: 'Map',
          },
          {
            field: 'mapMakers',
            title: 'MapMakers',
          },
          {
            field: 'logoEnabled',
            title: 'LogoEnabled',
          },
          {
            field: 'imageLimit',
            title: 'ImageLimit',
          },
          {
            field: 'videoLimit',
            title: 'VideoLimit',
          },
          {
            field: 'contentFields',
            title: 'ContentFields',
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
    const datatable = $('#tableDl').KTDatatable(options);

    /* Form Initialize */
    const DlForm = document.querySelector('#formDl');
    let FormSubmitButton = document.querySelector('#btnAddNewDlFormSubmitButton');
    let formOptions = {
      fields: {
        dlName: {
          validators: {
            notEmpty: {
              message: 'Name ID is required',
            },
          },
        },
        dlActivePeriod: {
          validators: {
            notEmpty: {
              message: 'ActivePeriod is required',
            },
          },
        },
        dlChangeLevelId: {
          validators: {
            notEmpty: {
              message: 'ChangeLevelId  is required',
            },
          },
        },
        dlListingsInPackage: {
            validators: {
              notEmpty: {
                message: 'ListingsInPackage  is required',
              },
            },
          },
          dlImageLimit: {
            validators: {
              notEmpty: {
                message: 'ImageLimit  is required',
              },
            },
          },
          dlUpdatedAt: {
            validators: {
              notEmpty: {
                message: 'UpdatedAt  is required',
              },
            },
          },
          dlVideoLimit: {
            validators: {
              notEmpty: {
                message: 'VideoLimit  is required',
              },
            },
          },
          dlContentFields: {
            validators: {
              notEmpty: {
                message: 'ContentFields  is required',
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
    $('#tableDl_search_status_2').on('change', function () {
      datatable.search($(this).val().toLowerCase(), 'Status');
    });

    // search based on type
    $('#tableDl_search_type_2').on('change', function () {
      datatable.search($(this).val().toLowerCase(), 'Type');
    });

    $('#tableDl_search_status_2, #tableDl_search_type_2').selectpicker();

    /* Modal Operations */
    // to open modal 
    $('#btnOpenDlModal').on('click', async function (e) {
      console.log('btnNewItem is clicked');

      FormSubmitButton = document.querySelector('#btnAddNewDlFormSubmitButton');

      // enabling disabling buttons
      $('#btnAddNewDlFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
      $('#btnSaveDlFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

      $('#modalDl').modal('show');   // open modal  

      $('#modalDl').find('.modal-title').text('Add New Newsletter Messages'); // Setting title for modal

    });

    // modal post closed
    $('#modalDl').on('hidden.bs.modal', function (e) {
      console.log('Modal closed');

      if (fv) {
        // clearing forms
        fv.resetForm();
        fv.destroy();
      }

      // clearing validator messages
      $('.fv-plugins-message-container').text(''); // remove message

      // clearing fields
      $("#formDl").trigger('reset'); // clear form fields

      // manually resetting other fields

    });

    // modal post opened
    $('#modalDl').on('shown.bs.modal', function (e) {
      // console.log('Modal opened');

      // Initializing 
      $('#dlDescription').summernote({
        height: 400,
        tabsize: 2,
      });

    });

    // Edit Modal Window - opens modal with appropriate properties
    $('#tableDl').on('click', '.btnEdit', async function (e) {
      // console.log('btnEdit is clicked');

      var id = $(this).attr("aria-label");
      // console.log(id);

      FormSubmitButton = document.querySelector('#btnSaveDlFormSubmitButton');

      // enabling disabling buttons
      $('#btnAddNewDlFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
      $('#btnSaveDlFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

      $('#modalDl').modal('show');   // open modal

      $('#modalDl').find('.modal-title').text('Edit Entry'); // Setting title for modal
      // retrieving data
      await axios({
        method: 'GET',
        url: `${HOST_URL}/api/v1/newsletter/messages/${id}`,
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
          document.querySelector('#dlId').value = res.data.newsletterMessages._id;
          document.querySelector('#dlName').value = res.data.newsletterMessages.name;
          document.querySelector('#dlDescription').value = res.data.newsletterMessages.description;
          document.querySelector('#dlChangeLevelId').value = res.data.newsletterMessages.changeLevelId;
          document.querySelector('#dlListingsInPackage').value = res.data.newsletterMessages.listingsInPackage;
          document.querySelector('#dlRiseUpEnabled').value = res.data.newsletterMessages.riseUpEnabled;
          document.querySelector('#dlSticky').value = res.data.newsletterMessages.sticky;
          document.querySelector('#dlFeatured').value = res.data.newsletterMessages.featured;
          document.querySelector('#dlOwnPage').value = res.data.newsletterMessages.ownPage;
          document.querySelector('#dlUnlimitedCategories').value = res.data.newsletterMessages.unlimitedCategories;
          document.querySelector('#dlMap').value = res.data.newsletterMessages.map;
          document.querySelector('#dlMapMakers').value = res.data.newsletterMessages.mapMakers;
          document.querySelector('#dlLogoEnabled').value = res.data.newsletterMessages.logoEnabled;

        }
      });
    });
    // deleteOne operation
    $('#tableDl').on('click', '.btnDelete', function (e) {
      console.log('btnDelete Clicked');
      let ids = $(this).attr("aria-label");

      ids = ids.toString();

      const requests = {
        params: {
          _id: ids,
        }
      }

      axios.delete(`${HOST_URL}/api/v1/directory/levels`, requests);

      // reload table
      $('#tableDl').KTDatatable().reload();

    });

    // deleteAll mass operation
    datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
      // datatable.checkbox() access to extension methods
      const ids = datatable.checkbox().getSelectedId();
      const count = ids.length;

      $('#tableDl_selected_records_2').html(count);

      console.log(count)

      if (count > 0) {
        $('#tableDl_group_action_form_2').collapse('show');
      } else {
        $('#tableDl_group_action_form_2').collapse('hide');
      }
    });

    // form reset operation
    $('#formDl').on('click', '.btnReset', function (e) {
      // console.log('btnReset is clicked');

      if (fv) {
        // clearing forms
        fv.resetForm();
        fv.destroy();
      }
      else {
        // initiate validation
        fv = FormValidation.formValidation(DlForm, formOptions);
      }

      // clearing validator messages
      $('.fv-plugins-message-container').text(''); // remove message

      // clearing fields
      $("#formDl").trigger('reset'); // clear form fields

      // clear manually
      $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
    });

    // form add operation
    $('#formDl').on('click', '.btnAdd', function (e) {
      // console.log('addMenuSectionFormSubmitButton is clicked');

      // clearing validator messages
      $('.fv-plugins-message-container').text(''); // remove message

      FormSubmitButton = document.querySelector('#btnAddNewDlFormSubmitButton');

      // Validation
      fv = FormValidation.formValidation(DlForm, formOptions);

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
          url: `${HOST_URL}/api/v1/directory/levels`,
          data: {
            description: $('#dlDescription').summernote('code'),
            changeLevelId: document.querySelector('#dlChangeLevelId').value,
            listingsInPackage: document.querySelector('#dlListingsInPackage').value,
            riseUpEnabled: (document.querySelector('#dlRiseUpEnabled').value == 'on') ? true : false,
            sticky: (document.querySelector('#dlSticky').value == 'on') ? true : false,
            featured: (document.querySelector('#dlFeatured').value == 'on') ? true : false,
            ownPage: (document.querySelector('#dlOwnPage').value == 'on') ? true : false,
            unlimitedCategories: (document.querySelector('#dlUnlimitedCategories').value == 'on') ? true : false,
            map: (document.querySelector('#dlMap').value == 'on') ? true : false,
            mapMakers: (document.querySelector('#dlMapMakers').value == 'on') ? true : false,
            logoEnabled: (document.querySelector('#dlLogoEnabled').value == 'on') ? true : false,
            ImageLimit: (document.querySelector('#dlImageLimit').value == 'on') ? true : false,
            updatedAt: (document.querySelector('#dlUpdatedAt').value == 'on') ? true : false

          },
        }).then(function (res) {
          // Release button
          KTUtil.btnRelease(FormSubmitButton);

          if (res.data.status == 'success') {
            // reseting & clearing
            $('#modalDl').modal('hide')  // hiding modal form
            toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
            $('#tableDl').KTDatatable().reload(); // reload table
          }
          else if (res.data.status == 'error') {
            $('#modalDl').modal('hide')  // hiding modal form
            toastr.error(`${res.data.message}`, `${res.data.status}`)
          }
          else {
            $('#modalDl').modal('hide')
          };
        });
      });
    });
    /* Modal Operations */
    // to open modal 
    $('#btnOpenDlModal').on('click', async function (e) {
      // console.log('btnNewItem is clicked');

      FormSubmitButton = document.querySelector('#btnAddNewDlFormSubmitButton');

      // enabling disabling buttons
      $('#btnAddNewDlFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
      $('#btnSaveDlFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

      $('#modalDl').modal('show');   // open modal  

      $('#modalDl').find('.modal-title').text('Add New Newsletter Messages'); // Setting title for modal

    });

    // modal post closed
    $('#modalDl').on('hidden.bs.modal', function (e) {
      //  console.log('Modal is closed');

      if (fv) {
        // clearing forms
        fv.resetForm();
        fv.destroy();
      }

      // clearing validator messages
      $('.fv-plugins-message-container').text(''); // remove message

      // clearing fields
      $("#formDl").trigger('reset'); // clear form fields


    });

    // modal post opened
    $('#modalDl').on('shown.bs.modal', function (e) {

      // Initializing 


    });


  };
  return {
    // public functions
    init: function () {
        _DirectoryLevels();

    },
  };
})();

jQuery(document).ready(function () {
    DirectoryLevelsCRUD.init();
});

