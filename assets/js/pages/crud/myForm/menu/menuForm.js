/* eslint-disable */
'use strict';

/* Class definition */
const menuCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    // sourcing data
    const fetchMenuTreeData = async (queryStr) =>   {
    try {
        const { data } = await axios.get(`${HOST_URL}/api/v1/menu/genMenuTree`)
            return data;
        } catch (err) {
            console.log(err.message);
        }
    }
    
    const fetchMenuManager = async (queryStr) =>   {
        try {
            const { data } = await axios.get(`${HOST_URL}/api/v1/menu/manager`)
              return data;
          } catch (err) {
              console.log(err.message);
          }
     }
    
    const _initializeMenuForm = async () => {


        // Initializing 
        const managerData = await fetchMenuTreeData();
        console.log(managerData.manager)

        $("#treeMenuPreview").jstree({
            "core": {
                "themes": {
                    "responsive": false
                },
                "data": managerData.manager,
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder"
                },
                "file": {
                    "icon": "fa fa-file"
                }
            },
            "plugins": ["types"]
        });
    }

/*   Private functions */
    const _createMenuForm = function () {

        let selectedItem;

            $('#treeMenuPreview').on("changed.jstree", function (e, data) {
                console.log("The selected nodes are:");
                console.log(data.selected);
                selectedItem = data.selected;
            });
        
            // demoSelect2Single - Dropdown List : Single Select2
            let managerSelect = $('#demoSelect2Single');
                
            // Fetch the preselected item, and add to the control
            $.ajax({
                type: 'GET',
                url: `${HOST_URL}/api/v1/menu/manager`,
            }).then(function (data) {
                // Set up options
                for (let i = 0; i < data.manager.length; i++)   {
                    var newOption = new Option(data.manager[i].name, data.manager[i]._id, false, false);
                    managerSelect.append(newOption).trigger('change');
                }
            });

        // demoSelect2Single - Dropdown List : Single Select2
        $('#demoSelect2Single').select2({

        });
    };

    const _createMenuItemForm = function () {

        // Getting Document related information
        const menuItemForm = KTUtil.getById('menuItemForm');
        const menuItemFormSubmitButton = KTUtil.getById('menuItemFormSubmitButton');
        const menuSection = KTUtil.getById('menuSection');
        const menuItemName = KTUtil.getById('menuItemName');
        const menuItemRoute = KTUtil.getById('menuItemRoute');
        const menuItemPriority = KTUtil.getById('menuItemPriority');
        
        // menuSection - Dropdown List : Single Select2
        $('#menuSection').select2({
        });
        
        // menuItemPriority - Number : Number Controls Same Sides
        $('#menuItemPriority').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',

            min: 1,
            max: 1000,
            step: 1,

        });
        

        // Return Form
        if (!menuItemForm) {
        return;
        }

        // Validation
        const fv = FormValidation.formValidation(menuItemForm, {
        fields: {
            menuSection: {
                validators: {
                    notEmpty: {
                    message: 'This field is required',
                    },
                },
            },
            menuItemName: {
                validators: {
                    notEmpty: {
                    message: 'Name cannot be empty',
                    },
                },
            },
            menuItemRoute: {
                validators: {
                    notEmpty: {
                    message: 'Description cannot be empty',
                    },
                },
            },
            menuItemPriority: {
                validators: {
                    notEmpty: {
                    message: 'This field is required',
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
            menuItemFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
        })
        .on('core.form.valid', function () {
            // Show loading state on button
            KTUtil.btnWait( menuItemFormSubmitButton, _buttonSpinnerClasses, 'Please wait');

            // Accessing Restful API
            axios({
            method: 'post',
            url: `${HOST_URL}/api/v1/menu/items`,
                data: {
                    section: menuSection.value,
                    name: menuItemName.value,
                    route: menuItemRoute.value,
                    priority: menuItemPriority.value,
            },

            }).then(function (res) {
            // Return valid JSON
            // Release button
            KTUtil.btnRelease( menuItemFormSubmitButton);
            console.log(res);

            // TOASTR EXAMPLE

            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": true,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };

            if (res.data.status == 'success') {
                toastr.success(`${res.data.message}`, `${res.data.status}`)
            } else if (res.data.status == 'error') {
                toastr.error(`${res.data.message}`, `${res.data.status}`)
            }
            });

        })
        .on('core.form.invalid', function () {
            console.log('Something went wrong!!');

        });

    };
    const _createMenuSubItem1Form = function () {

        // Getting Document related information
        const menuSubItem1Form = KTUtil.getById('menuSubItem1Form');
        const menuSubItem1FormSubmitButton = KTUtil.getById('menuSubItem1FormSubmitButton');
        const menuItem = KTUtil.getById('menuItem');
        const menuSubItem1Name = KTUtil.getById('menuSubItem1Name');
        const menuSubItem1Route = KTUtil.getById('menuItemRoute');
        const menuSubItem1Priority = KTUtil.getById('menuItemPriority');
        
        // menuItem - Dropdown List : Single Select2
        $('#menuItem').select2({
        });
        
        // menuSubItem1Priority - Number : Number Controls Same Sides
        $('#menuSubItem1Priority').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',

            min: 1,
            max: 1000,
            step: 1,

        });
        

        // Return Form
        if (!menuSubItem1Form) {
        return;
        }

        // Validation
        const fv = FormValidation.formValidation(menuSubItem1Form, {
        fields: {
            menuItem: {
                validators: {
                    notEmpty: {
                    message: 'This field is required',
                    },
                },
            },
            menuSubItem1Name: {
                validators: {
                    notEmpty: {
                    message: 'Name cannot be empty',
                    },
                },
            },
            menuSubItem1Route: {
                validators: {
                    notEmpty: {
                    message: 'Description cannot be empty',
                    },
                },
            },
            menuSubItem1Priority: {
                validators: {
                    notEmpty: {
                    message: 'This field is required',
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
            menuSubItem1FormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
        })
        .on('core.form.valid', function () {
            // Show loading state on button
            KTUtil.btnWait( menuSubItem1FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

            // Accessing Restful API
            axios({
            method: 'post',
            url: `${HOST_URL}/api/v1/menu/subItems1`,
                data: {
                    item: menuItem.value,
                    name: menuSubItem1Name.value,
                    route: menuSubItem1Route.value,
                    priority: menuSubItem1Priority.value,
            },

            }).then(function (res) {
            // Return valid JSON
            // Release button
            KTUtil.btnRelease( menuSubItem1FormSubmitButton);
            console.log(res);

            // TOASTR EXAMPLE

            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": true,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };

            if (res.data.status == 'success') {
                toastr.success(`${res.data.message}`, `${res.data.status}`)
            } else if (res.data.status == 'error') {
                toastr.error(`${res.data.message}`, `${res.data.status}`)
            }
            });

        })
        .on('core.form.invalid', function () {
            console.log('Something went wrong!!');

        });

    };
    
    let btnAddNewCount = 0;
    const formOptions =    {
        fields: {
            menuManagerSelect: {
                validators: {
                    notEmpty: {
                        message: 'Manager is required',
                    },
                },
            },
            menuSectionName: {
                validators: {
                    notEmpty: {
                        message: 'Name cannot be empty',
                    },
                },
            },
            menuSectionDescription: {
                validators: {
                    notEmpty: {
                        message: 'Description cannot be empty',
                    },
                },
            },
            menuSectionPriority: {
                validators: {
                    notEmpty: {
                        message: 'This field is required',
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

    function _MenuSectionFormPush() {

        // Getting Document related information
        const menuSectionForm = document.querySelector('#menuSectionForm');
        const FormSubmitButton = document.querySelector('#addMenuSectionFormSubmitButton');
        const menuManagerSelect = document.querySelector('#menuManagerSelect');
        const menuSectionName = document.querySelector('#menuSectionName');
        const menuSectionDescription = document.querySelector('#menuSectionDescription');
        const menuSectionPriority = document.querySelector('#menuSectionPriority');

        // initialize
        // menuManagerSelect - Dropdown List : Single Select2
        $('#menuManagerSelect').select2({
            ajax: {
                url: `${HOST_URL}/api/v1/menu/manager/popSel2`,
                dataType: 'json',
                processResults: function (data) {
                    return {
                    results: data.manager
                    };
                }
            },
        });

        // menuSectionPriority - Number : Number Controls Same Sides
        $('#menuSectionPriority').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',

            min: 1,
            max: 1000,
            step: 1,
        });

        // Return Form
        if (!menuSectionForm) {
            return;
        }

        // Validation
        // const fv = FormValidation.formValidation(menuSectionForm, formOptions);
    };
  
    function _viewMenuSectionTable() {
        
        var dataSet;

        /* Table Initialize */
        const options = {
            // datasource definition
            data: {
              type: 'remote',
              source: {
                read: {
                  method: 'get',
                  url: `${HOST_URL}/api/v1/menu/section/table`,
                  params: {
                    fields: '_id, name, description, priority, createdBy, createdAt, updatedAt',
                  },
                  map: function(raw) {
                    // sample data mapping
                    //console.log('raw', raw);
                    dataSet = raw;
                
                    if (typeof raw.menuSection !== 'undefined') {
                      dataSet = raw.menuSection;
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
                // template: function (row) {
                //   return '\
                //     <div>\
                //     <a href="#">' + row.name + '</a></div>\
                //   ';
                // }
              },
              {
                field: 'description',
                title: 'Description',
              },
              {
                field: 'priority',
                  title: 'Priority',
                //   template: function (row) {
                //       return '\
                //     ';
                // }
              },
/*               {
                field: 'details',
                title: 'Details',
                textAlign: 'center',
                //width: 100,
                sortable: false,
                template: function () {
                  return '\
                    <a href="#" class="btn btn-sm btn-light" role="button">\
                      view details\
                    </a >';
                },
              }, */
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
          
          // enable extension
          options.extensions = {
            // boolean or object (extension options)
            checkbox: true,
          };

          const datatable = $('#kt_datatable_2').KTDatatable(options);
      
          $('#kt_datatable_search_status_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Status');
          });
      
          $('#kt_datatable_search_type_2').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Type');
          });
      
          $(
            '#kt_datatable_search_status_2, #kt_datatable_search_type_2'
        ).selectpicker();

        const menuSectionForm = document.querySelector('#menuSectionForm');
        let menuSectionFormValidator;

         // modal closed
        $('#exampleModal').on('hidden.bs.modal', function (e) {
            e.preventDefault();
            console.log('Modal is closed');

            // clearing forms
            menuSectionFormValidator.resetForm();

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            // clearing fields
            $("#menuSectionForm").trigger('reset'); // clear form fields
            $('#menuManagerSelect').val('');  // clearing select2  */

            menuSectionFormValidator.destroy();

        });

        // modal opened
        $('#exampleModal').on('shown.bs.modal', function (e) {
            e.preventDefault();
            console.log('Modal is open');
            
            // var modal = $(this);
            // console.log(modal);

        });

        // btnReset modal
        $('#btnResetMenuSectionForm').on('click',  function (e) {
            console.log('btnResetMenuSectionForm is clicked');

            // clearing forms
            menuSectionFormValidator.resetForm();

            // clearing validator messages
            $('.fv-plugins-message-container').text(''); // remove message

            // clearing fields
            $('#menuManagerSelect').val('');  // clearing select2  */

            menuSectionFormValidator.destroy();

            // Validation
            menuSectionFormValidator = FormValidation.formValidation(menuSectionForm, formOptions);

        })

        // addMenuSectionFormSubmitButton modal
        $('#addMenuSectionFormSubmitButton').on('click', function (e) {
            console.log('addMenuSectionFormSubmitButton is clicked');

            const FormSubmitButton = document.querySelector('#addMenuSectionFormSubmitButton');
            
            // Validation
            menuSectionFormValidator = FormValidation.formValidation(menuSectionForm, formOptions);

            // validation failed
            menuSectionFormValidator.on('core.form.invalid', async function () {
                console.log('Something went wrong!!');    
             });

            // validation successful
            menuSectionFormValidator.on('core.form.valid', async function () {

                // Show loading state on button
                KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');
    
                // Accessing Restful API
                await axios({
                    method: 'post',
                    url: `${HOST_URL}/api/v1/menu/section`,
                    data: {
                        manager: document.querySelector('#menuManagerSelect').value,
                        name: document.querySelector('#menuSectionName').value,
                        description: document.querySelector('#menuSectionDescription').value,
                        priority: document.querySelector('#menuSectionPriority').value,
                    },
                }).then(function (res) {
                
                    // Return valid JSON
                    // console.log(res);
    
                    // Release button
                    KTUtil.btnRelease(FormSubmitButton);
    
                    // TOASTR EXAMPLE
                    toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": true,
                        "progressBar": false,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    };
    
                    if (res.data.status == 'success') {
                        // reseting & clearing
                        $('#exampleModal').modal('hide')  // hiding modal form
                        toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                        $('#kt_datatable_2').KTDatatable().reload(); // reload table
                    }
                    else if (res.data.status == 'error') {
                        $('#exampleModal').modal('hide')  // hiding modal form
                        toastr.error(`${res.data.message}`, `${res.data.status}`)
                    }
                    else {
                        $('#exampleModal').modal('hide')
                    };
                });
            });
        });

        // Add New operation
        $('#btnAdd').on('click', async function (e) {
            // e.preventDefault();
            console.log('btnAddNew is clicked');

            // enabling disabling buttons
            $('#addMenuSectionFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
            $('#updateMenuSectionFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

            // show modal
            const formModal = $('#exampleModal').modal('show');   // open modal  

            $('#exampleModal').find('.modal-title').text('Create Section Entry'); // Setting title for modal
    
        });
        
        // edit operation
        $('#kt_datatable_2').on('click', '.btnEdit', async function (e) {
            //e.preventDefault();
            console.log('btnEdit is clicked');

            var id = $(this).attr("aria-label");
            // console.log(id);

            // enabling disabling buttons
            $('#addMenuSectionFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
            $('#updateMenuSectionFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

            // show modal
            const formModal = $('#exampleModal').modal('show');   // open modal

            // retrieving data
            $.ajax({
                method: 'GET',
                url: `${HOST_URL}/api/v1/menu/section/${id}`,
                success: async function (raw) {
                    console.log(raw);

                    if (raw.status == 'success') {
                        // fetching menu manager select2
                        $.ajax({
                            method: 'GET',
                            url: `${HOST_URL}/api/v1/menu/manager/popSel2/`+ raw.menuManager._id,
                            dataType: 'json',
                        }).then(function (data) {
                           
                            // updating menuManagerSelect values
                            var option = new Option(data.manager.text, data.manager.id, true, true);
                            $('#menuManagerSelect').append(option).trigger('change');
                        });

                        // updating fields with data
                        document.querySelector('#menuSectionId').value = raw.menuSection._id;
                        document.querySelector('#menuSectionName').value = raw.menuSection.name;
                        document.querySelector('#menuSectionDescription').value = raw.menuSection.description;
                        document.querySelector('#menuSectionPriority').value = raw.menuSection.priority;

                        // calling API Endpoint with validations feature
                        const apiOptions = {
                            method: 'patch',
                            url: `${HOST_URL}/api/v1/menu/section/${id}`,
                            button: 'updateMenuSectionFormSubmitButton'
                        };

                        let existingData = new _MenuSectionFormPush(apiOptions);
                        console.log(existingData);
                    
                        // validation failed
                        existingData.fv.on('core.form.invalid', function () {
                            console.log('Something went wrong!!');
                        });

                        // validation successfull
                        existingData.fv.on('core.form.valid', async function () {
                            console.log('Form Submit');

                            // Show loading state on button
                            KTUtil.btnWait(existingData.FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

                            // Accessing Restful API
                            await axios({
                                method: existingData.apiMethod,
                                url: existingData.apiURL,
                                data: {
                                    manager: existingData.menuManagerSelect.value,
                                    name: existingData.menuSectionName.value,
                                    description: existingData.menuSectionDescription.value,
                                    priority: existingData.menuSectionPriority.value,
                                },
                            }).then(function (res) {
                                // Return valid JSON
                                console.log(res);

                                // Release button
                                KTUtil.btnRelease(existingData.FormSubmitButton);

                                // TOASTR EXAMPLE
                                toastr.options = {
                                    "closeButton": false,
                                    "debug": false,
                                    "newestOnTop": true,
                                    "progressBar": false,
                                    "positionClass": "toast-top-right",
                                    "preventDuplicates": false,
                                    "onclick": null,
                                    "showDuration": "300",
                                    "hideDuration": "1000",
                                    "timeOut": "5000",
                                    "extendedTimeOut": "1000",
                                    "showEasing": "swing",
                                    "hideEasing": "linear",
                                    "showMethod": "fadeIn",
                                    "hideMethod": "fadeOut"
                                };


                                if (res.data.status == 'success') {
                                    // reseting & clearing
                                    $('#exampleModal').modal('hide')  // hiding modal form
                                    toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                                    $('#kt_datatable_2').KTDatatable().reload(); // reload table
                                    isLoading = false;

                                }
                                else if (res.data.status == 'error') {
                                    $('#exampleModal').modal('hide')  // hiding modal form
                                    toastr.error(`${res.data.message}`, `${res.data.status}`)
                                    isLoading = false;

                                }
                                else {
                                    $('#exampleModal').modal('hide')
                                    isLoading = false;
                                }

                            });
                        });
                    }
                },
            });

        });

        // deleteOne operation
        $('#kt_datatable_2').on('click', '.btnDelete', function () {           
            let ids = $(this).attr("aria-label");

            ids = ids.toString();

            const requests = {
                params: {
                    _id: ids,
                }
            }

            axios.delete(`${HOST_URL}/api/v1/menu/section`, requests);

        // reload table
            $('#kt_datatable_2').KTDatatable().reload();
            
        });

        // mass operation
        datatable.on('datatable-on-click-checkbox', function (e) {
        // datatable.checkbox() access to extension methods
        const ids = datatable.checkbox().getSelectedId();
        const count = ids.length;
    
        $('#kt_datatable_selected_records_2').html(count);
    
        if (count > 0) {
            $('#kt_datatable_group_action_form_2').collapse('show');
        } else {
            $('#kt_datatable_group_action_form_2').collapse('hide');
        }
        });

        // deleteAll operation
        $('#kt_datatable_group_action_form_2').on('click', '.btnDeleteAll', function () {
            console.log('deleteAll is clicked')

            let ids = datatable.checkbox().getSelectedId();
            ids = ids.toString();
            console.log(ids)

            const requests = {
                params: {
                    _id: ids,
                }
            }

            axios.delete(`${HOST_URL}/api/v1/menu/section`, requests);

            $('#kt_datatable_group_action_form_2').collapse('hide');

            // reload table
            $('#kt_datatable_2').KTDatatable().reload();
        });

    }

  return {
    // public functions
      init: function () {
        //_initializeMenuForm();
        //_createMenuForm();
        //_createMenuSectionForm();
        //_createMenuItemForm();
        //   _createMenuSubItem1Form();
        _MenuSectionFormPush();
        _viewMenuSectionTable();
          
    },
  };
})();

jQuery(document).ready(function () {
    menuCRUD.init();



    let isLoading;
    isLoading = false;

});