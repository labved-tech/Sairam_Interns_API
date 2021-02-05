/* eslint-disable */
'use strict';

/* Class definition */
const DirectoryCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';
    /*   Private functions */
    function _DirectoryCategories() {
        var dataSet;

        /* Table Options */
        const options = {
          // datasource definition
          data: {
            type: 'remote',
            source: {
              read: {
                method: 'get',
                url: `${HOST_URL}/api/v1/directory/categories/table`,
                params: {
                  fields: '_id,name, slug, _attributeGroupsId, _ratingAttributeGroupId, createdBy,createdAt,updatedAt,updatedBy',
                },
                map: function (raw) {
                  // sample data mapping
                  // console.log('raw', raw);
                  dataSet = raw;
    
                  if (typeof raw.directoryCategories !== 'undefined') {
                    dataSet = raw.directoryCategories;
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
                field: 'slug',
                title: 'Slug',
              },
              {
                field: '_attributeGroupsId',
                title: 'AttributeGroupsId',
              },
            {
                field: '_ratingAttributeGroupId',
                title: 'RatingAttributeGroupId',
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
        const datatable = $('#tableDc').KTDatatable(options);

        /* Form Initialize */
        const DcForm = document.querySelector('#formDc');
        let FormSubmitButton = document.querySelector('#btnAddNewDcFormSubmitButton');
        let formOptions =    {
            fields: {
                dcName: {
                    validators: {
                        notEmpty: {
                            message: 'Name is required',
                        },
                    },
                },
                dcSlug: {
                    validators: {
                        notEmpty: {
                            message: 'Slug is required',
                        },
                    },
                },
                dcAttributeGroupsId: {
                    validators: {
                        notEmpty: {
                            message: '_attributeGroupsId is required',
                        },
                    },
                },
                dcRatingAttributeGroupId: {
                    validators: {
                        notEmpty: {
                            message: '_ratingattributegroupId is required',
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
        $('#tableDc_search_status_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Status');
        });
  
        // search based on type
        $('#tableDc_search_type_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });
  
        $('#tableDc_search_status_2, #tableDc_search_type_2').selectpicker();
          
        /* Modal Operations */
        // to open modal 
        $('#btnOpenDcModal').on('click', async function (e) {
        console.log('btnNewItem is clicked');
  
        FormSubmitButton = document.querySelector('#btnAddNewDcFormSubmitButton');
  
        // enabling disabling buttons
        $('#btnAddNewDcFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
        $('#btnSaveDCFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button
  
        $('#modalDc').modal('show');   // open modal  
  
        $('#modalDc').find('.modal-title').text('Add New Directory Categories'); // Setting title for modal
  
        });
          
        // modal post closed
        $('#modalDc').on('hidden.bs.modal', function (e) {
            // console.log('Modal closed');
  
            if (fv) {
              // clearing forms
              fv.resetForm();
              fv.destroy();
            }
   
            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message
   
            // clearing fields
            $("#formDc").trigger('reset'); // clear form fields
   
            // manually resetting other fields
            $('#dcExpires').empty().trigger('change');  // clearing select2  */
   
        });
          
        // modal post opened
        $('#modalDc').on('shown.bs.modal', function (e) {
          // console.log('Modal opened');
  
          // Initializing 

  
        });
      // Edit Modal Window - opens modal with appropriate properties
      $('#tableDc').on('click', '.btnEdit', async function (e) {
        // console.log('btnEdit is clicked');

        var id = $(this).attr("aria-label");
        // console.log(id);

        FormSubmitButton = document.querySelector('#btnSaveDcFormSubmitButton');

        // enabling disabling buttons
        $('#btnAddNewDcFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
        $('#btnSaveDcFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

        $('#modalDc').modal('show');   // open modal

        $('#modalDc').find('.modal-title').text('Edit Entry'); // Setting title for modal
          // retrieving data
          await axios({
            method: 'GET',
            url: `${HOST_URL}/api/v1/directory/categories/${id}`,
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
                document.querySelector('#dcId').value = res.data.directoryCategories._id;
                document.querySelector('#dcName').value = res.data.directoryCategories.name;
                document.querySelector('#dcSlug').value = res.data.directoryCategories.slug;
                document.querySelector('#dcAttributeGroupsId').value = res.data.directoryCategories.attributeGroupsId;
                document.querySelector('#dcRatingAttributeGroupId').value = res.data.directoryCategories.ratingAttributeGroupId;
               
            }
        });
      });
    // deleteOne operation
    $('#tableDc').on('click', '.btnDelete', function (e) {
        console.log('btnDelete Clicked');
        let ids = $(this).attr("aria-label");
  
        ids = ids.toString();
  
        const requests = {
            params: {
                _id: ids,
            }
        }
  
        axios.delete(`${HOST_URL}/api/v1/directory/categories`, requests);
  
        // reload table
        $('#tableDc').KTDatatable().reload();
    
        });
  
        // deleteAll mass operation
        datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
          // datatable.checkbox() access to extension methods
          const ids = datatable.checkbox().getSelectedId();
          const count = ids.length;
      
          $('#tableDc_selected_records_2').html(count);
  
          console.log(count)
      
          if (count > 0) {
              $('#tableDc_group_action_form_2').collapse('show');
          } else {
              $('#tableDc_group_action_form_2').collapse('hide');
          }
        });
        
        // form reset operation
        $('#formDc').on('click', '.btnReset', function (e) {
          // console.log('btnReset is clicked');
  
          if (fv) {
            // clearing forms
            fv.resetForm();
            fv.destroy();
          }
          else {
            // initiate validation
            fv = FormValidation.formValidation(DcForm, formOptions);
          }
  
          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message
  
          // clearing fields
          $("#formDc").trigger('reset'); // clear form fields
  
          // clear manually
          $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
        });
  
        // form add operation
        $('#formDc').on('click', '.btnAdd', function (e) {
          // console.log('addMenuSectionFormSubmitButton is clicked');
  
          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message
          
          FormSubmitButton = document.querySelector('#btnAddNewDcFormSubmitButton');
  
          // Validation
          fv = FormValidation.formValidation(DcForm, formOptions);
  
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
                      name: document.querySelector('#dcName').value,
                      slug: document.querySelector('#dcSlug').value,
                      attributeGroupsId: document.querySelector('#dcAttributeGroupsId').value,  
                      ratingAttributeGroupId: (document.querySelector('#dcRatingAttributeGroupId').value,
                  },
              }).then(function (res) {
                  // Release button
                  KTUtil.btnRelease(FormSubmitButton);
  
                  if (res.data.status == 'success') {
                      // reseting & clearing
                      $('#modalDc').modal('hide')  // hiding modal form
                      toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                      $('#tableDc').KTDatatable().reload(); // reload table
                  }
                  else if (res.data.status == 'error') {
                      $('#modalDc').modal('hide')  // hiding modal form
                      toastr.error(`${res.data.message}`, `${res.data.status}`)
                  }
                  else {
                      $('#modalDc').modal('hide')
                  };
              });
          });
        });
        /* Modal Operations */
        // to open modal 
        $('#btnOpenDcModal').on('click', async function (e) {
          // console.log('btnNewItem is clicked');
      
          FormSubmitButton = document.querySelector('#btnAddNewDcFormSubmitButton');
      
          // enabling disabling buttons
          $('#btnAddNewDcFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
          $('#btnSaveDcFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button
      
          $('#modalDc').modal('show');   // open modal  
      
          $('#modalDc').find('.modal-title').text('Add New Directory Categories'); // Setting title for modal
      
          });
            
          // modal post closed
          $('#modalDc').on('hidden.bs.modal', function (e) {
              //  console.log('Modal is closed');
      
              if (fv) {
                  // clearing forms
                  fv.resetForm();
                  fv.destroy();
               }
      
               // clearing validator messages
               $('.fv-plugins-message-container').text(''); // remove message
      
               // clearing fields
               $("#formDc").trigger('reset'); // clear form fields
               
      
          });
            
          // modal post opened
          $('#modalDc').on('shown.bs.modal', function (e) {
      
          // Initializing 
      
      
          });
            
          
      };
      return {
          // public functions
            init: function () {
            _DirectoryCategories();
            
          },
        };
    })();
    
  jQuery(document).ready(function () {
        DirectoryCRUD.init();
  });    
    