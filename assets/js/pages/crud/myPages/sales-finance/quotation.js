/* eslint-disable */
'use strict';

/* Class definition */
const QuotationCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    /*   Private functions */
    function _Quotation() {
      var dataSet;

      /* Table Options */
      const options = {
          // datasource definition
          data: {
          type: 'remote',
          source: {
              read: {
              method: 'get',
              url: `${HOST_URL}/api/v1/sales-finance/quotation/table`,
              params: {
                fields: '_id, moduleReference, header, date, _buyerId,buyerName,buyerAddress,buyerEmail,buyerContactNumber,buyerContactNumbertype,billingContactNumber,_sellerId,sellerName,sellerAttentionName,sellerAddress,sellerContactNumber,sellerContactNumbertype,subject,body,termsAndConditions,footer,QuotationNumber,createdBy,createdAt,updatedAt',
              },
              map: function(raw) {
                  // sample data mapping
                  // console.log('raw', raw);
                  dataSet = raw;

                  if (typeof raw.quotation !== 'undefined') {
                  dataSet = raw.quotation;
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
          input: $('#tableQu_search_query_2'),
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
            field: 'moduleReference',
            title: 'Module Reference',
          },

          {
            field: 'header',
            title: 'Header',
          },
          {
            field: 'date',
            title: 'Date',
          },
          {
            field: '_buyerId',
            title: 'Buyer Id',
          },
          {
            field: 'buyerName',
            title: 'Buyer Name',
          },
          {
            field: 'buyerAddress',
            title: 'Buyer Address',
          },
          {
            field: 'buyerEmail',
            title: 'Buyer Email ',
          },
          {
            field: 'buyerContactNumber',
            title: 'Buyer Contact No',
          },
          {
            field: 'buyerContactNumbertype',
            title: 'Buyer Contact No Type',
          },
          {
            field: '_sellerId',
            title: 'SellerId',
          },
          {
            field: 'sellerName',
            title: 'SellerName',
          },
          {
            field: 'sellerAttentionName',
            title: 'Seller Attention Name',
          },
          {
            field: 'sellerAddress',
            title: 'Seller Address',
          },
          {
            field: 'sellerEmail',
            title: 'SellerEmail',
          },
          {
            field: 'sellerContactNumber',
            title: 'Seller Contact No',
          },
          {
            field: 'sellerContactNumbertype',
            title: 'Seller Contact No Type',
          },
          {
            field: 'subject',
            title: 'Subject',
          },

          {
            field: 'body',
            title: 'Body',
          },
          {
            field: 'termsAndConditions',
            title: 'Terms And Conditions',
          },
          {
            field: 'footer',
            title: 'Footer',
          },
          {
            field: 'quotationNumber',
            title: 'Quotation No',
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
      const datatable = $('#tableQu').KTDatatable(options);

      /* Form */
      const QuForm = document.querySelector('#formQu');
      let FormSubmitButton = document.querySelector('#btnAddNewQuFormSubmitButton');
      // Options
      let formOptions = {
          fields: {
            quModuleRef: {
                validators: {
                    notEmpty: {
                        message: 'Module Reference is required',
                    },
                },
            },
            quHeader: {
                validators: {
                    notEmpty: {
                        message: 'Header is required',
                    },
                },
            },
            quDate: {
                validators: {
                    notEmpty: {
                        message: 'Date is required',
                    },
                },
            },
            quBuyerID: {
                validators: {
                    notEmpty: {
                        message: 'Buyer ID is required',
                    },
                },
            },
            quBuyerName: {
                validators: {
                    notEmpty: {
                        message: 'Buyer Name is required',
                    },
                },
            },
            quBuyerAddress: {
                validators: {
                    notEmpty: {
                        message: 'Buyer Address is required',
                    },
                },
            },
            quBuyerEmail: {
                validators: {
                    notEmpty: {
                        message: 'Buyer Email is required',
                    },
                },
            },
            quBuyerContact: {
                validators: {
                    notEmpty: {
                        message: 'Buyer Contact is required',
                    },
                },
            },
            quContactTypeB: {
                validators: {
                    notEmpty: {
                        message: 'Contact Tyoe is required',
                    },
                },
            },
            quSellerID: {
                validators: {
                    notEmpty: {
                        message: 'Seller Id is required',
                    },
                },
            },
            quSellerName: {
                validators: {
                    notEmpty: {
                        message: 'Seller Name is required',
                    },
                },
            },
            quSellerAName: {
                validators: {
                    notEmpty: {
                        message: 'Seller Attention Name is required',
                    },
                },
            },
            quSellerAddress: {
                validators: {
                    notEmpty: {
                        message: 'Seller Address is required',
                    },
                }, 
            },
            quSellerEmail: {
                validators: {
                    notEmpty: {
                        message: 'Seller Email is required',
                    },
                },
            },
            quSellerContact: {
                validators: {
                    notEmpty: {
                        message: 'Seller Contact is required',
                    },
                },
            },
            quContactTypeS: {
                validators: {
                    notEmpty: {
                        message: 'Contact Type is required',
                    },
                },
            },
            quSubject: {
                validators: {
                    notEmpty: {
                        message: 'Subject is required',
                    },
                },
            },
            quBody: {
                validators: {
                    notEmpty: {
                        message: 'Body is required',
                    },
                },
            },
            quItemTable: {
                validators: {
                    notEmpty: {
                        message: 'This Field is required',
                    },
                },
            },

            quTermsCondition: {
                validators: {
                    notEmpty: {
                        message: 'This Field is required',
                    },
                },
            },
            quFooter: {
                validators: {
                    notEmpty: {
                        message: 'Footer is required',
                    },
                },
            },
            quType: {
                validators: {
                    notEmpty: {
                        message: 'Type is required',
                    },
                },
            },
            quMeta: {
                validators: {
                    notEmpty: {
                        message: 'Meta is required',
                    },
                },
            },

            quNumber: {
                validators: {
                    notEmpty: {
                        message: 'Quotation No is required',
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
      $('#tableQu_search_status_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Status');
      });

      // search based on type
      $('#tableQu_search_type_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Type');
      });

      $('#tableQu_search_status_2, #tableQu_search_type_2').selectpicker();

      // modal open
      $('#btnOpenQuModal').on('click', async function (e) {
          console.log('openButton is clicked');

          // enabling disabling buttons
          $('#btnAddNewQuFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
          $('#btnSaveQuFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

          FormSubmitButton = document.querySelector('#btnAddNewQuFormSubmitButton');

          $('#modalQu').modal('show');   // open modal

          $('#modalQu').find('.modal-title').text('Add New Entries'); // Setting title for modal

      });

      // modal post closed
      $('#modalQu').on('hidden.bs.modal', function (e) {
          console.log('Modal closed');

          if (fv) {
              // clearing forms
              fv.resetForm();
              fv.destroy();
          }

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message

          // clearing fields
          $("#formQu").trigger('reset'); // clear form fields

          // manually resetting other fields
          $('#quContactTypeB').empty().trigger('change'); 
          $('#quContactTypeS').empty().trigger('change'); 
          $('#quType').empty().trigger('change'); 
        });

      // modal post opened
      $('#modalQu').on('shown.bs.modal', function (e) {
          console.log('Modal open');

          // Initializing
            //Date Picker
            $(quDate).datepicker({
                placeholder: "Select Date"
            });
            // Dropdown List : Single Select1 With Search
            $('quContactTypeB').selectpicker({
            });
            // Dropdown List : Single Select1 With Search
            $('quContactTypeS').selectpicker({
            });
            // Dropdown List : Single Select1 With Search
            $('quType').selectpicker({
            });
            
      });

      // form reset operation
      $('#formQu').on('click', '.btnReset', function (e) {
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
          $("#formQu").trigger('reset'); // clear form fields

          // clear manually
          // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
      })

      // form add operation
      $('#formQu').on('click', '.btnAdd', function (e) {
          // console.log('btnCreate is clicked');

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message
          
          FormSubmitButton = document.querySelector('#btnAddNewQuFormSubmitButton');

          // Validation
          fv = FormValidation.formValidation(QuForm, formOptions);

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
                  url: `${HOST_URL}/api/v1/sales-finance/quotation`,
                  data: { 
                      moduleReference: document.querySelector('#quModuleRef').value ,
                      header: document.querySelector('#quHeader').value ,
                      date: document.querySelector('#quDate').value,
                      _buyerId: document.querySelector('#quBuyerID').value,
                      buyerName: document.querySelector('#quBuyerName').value,
                      buyerAddress: document.querySelector('#quBuyerAddress').value,
                      buyerEmail:document.querySelector('#quBuyerEmail').value,
                      buyerContactNumber: document.querySelector('#quBuyerContact').value,
                      buyerContactNumbertype: document.querySelector('#quContactTypeB').value,
                      _sellerId: document.querySelector('#quSellerID').value,
                      sellerName: document.querySelector('#quSellerName').value,
                      sellerAttentionName: document.querySelector('#quSellerAName').value,
                      sellerAddress: document.querySelector('#quSellerAddress').value,
                      sellerEmail: document.querySelector('#quSellerEmail').value,
                      sellerContactNumber: document.querySelector('#quSellerContact').value,
                      sellerContactNumbertype: document.querySelector('#quContactTypeS').value,
                      subject: document.querySelector('#quSubject').value,
                      body: document.querySelector('#quBody').value,
                      itemTable: document.querySelector('#quItemTable').value,
                      termsAndConditions: document.querySelector('#quTermsCondition').value,
                      footer: document.querySelector('#quFooter').value,
                      paymentMethods:{
                       type: document.querySelector('#quType').value,
                       meta: document.querySelector('#quMeta').value,
                      },
                      quotationNumber: document.querySelector('#quNumber').value,
                  },
              }).then(function (res) {
              
                  // Return valid JSON
                  // console.log(res);

                  // Release button
                  KTUtil.btnRelease(FormSubmitButton);

                  if (res.data.status == 'success') {
                      // reseting & clearing
                      $('#modalQu').modal('hide')  // hiding modal form
                      toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                      $('#tableQu').KTDatatable().reload(); // reload table
                  }
                  else if (res.data.status == 'error') {
                      $('#modalQu').modal('hide')  // hiding modal form
                      toastr.error(`${res.data.message}`, `${res.data.status}`)
                  }
                  else {
                      $('#modalQu').modal('hide')
                  };
              });
          });
      });

      // form save operation
      $('#formQu').on('click', '.btnSave', function (e) {
          console.log('btnSave is clicked');

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message
          
          FormSubmitButton = document.querySelector('#btnSaveQuFormSubmitButton');

          // Validation
          fv = FormValidation.formValidation(QuForm, formOptions);

          // validation failed
          fv.on('core.form.invalid', async function () {
              // console.log('Something went wrong!!');    
          });

          // validation successful
          fv.on('core.form.valid', async function () {

              const id = document.querySelector('#quId').value;

              // Show loading state on button
              KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

              // Accessing Restful API
              await axios({
                  method: 'patch',
                  url: `${HOST_URL}/api/v1/sales-finance/quotation/${id}`,
                  data: {
                    moduleReference: document.querySelector('#quModuleRef').value ,
                    header: document.querySelector('#quHeader').value ,
                    date: document.querySelector('#quDate').value,
                    _buyerId: document.querySelector('#quBuyerID').value,
                    buyerName: document.querySelector('#quBuyerName').value,
                    buyerAddress:document.querySelector('#quBuyerAddress').value,
                    buyerEmail:document.querySelector('#quBuyerEmail').value,
                    buyerContactNumber: document.querySelector('#quBuyerContact').value,
                    buyerContactNumbertype: document.querySelector('#quContactTypeB').value,
                    _sellerId: document.querySelector('#quSellerID').value,
                    sellerName: document.querySelector('#quSellerName').value,
                    sellerAttentionName: document.querySelector('#quSellerAName').value,
                    sellerAddress: document.querySelector('#quSellerAddress').value,
                    sellerEmail: document.querySelector('#quSellerEmail').value,
                    sellerContactNumber: document.querySelector('#quSellerContact').value ,
                    sellerContactNumbertype: document.querySelector('#quContactTypeS').value,
                    subject: document.querySelector('#quSubject').value,
                    body: document.querySelector('#quBody').value,
                    itemTable: document.querySelector('#quItemTable').value,
                    termsAndConditions: document.querySelector('#quTermsCondition').value,
                    footer: document.querySelector('#quFooter').value,
                    paymentMethods:{
                     type: document.querySelector('#quType').value,
                     meta: document.querySelector('#quMeta').value,
                    },
                    quotationNumber: document.querySelector('#quNumber').value,
                  },
              }).then(function (res) {
                  // Return valid JSON
                  // console.log(res);

                  // Release button
                  KTUtil.btnRelease(FormSubmitButton);

                  if (res.data.status == 'success') {
                      // reseting & clearing
                      $('#modalQu').modal('hide')  // hiding modal form
                      toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                      $('#tableQu').KTDatatable().reload(); // reload table

                  }
                  else if (res.data.status == 'error') {
                      $('#modalQu').modal('hide')  // hiding modal form
                      toastr.error(`${res.data.message}`, `${res.data.status}`)
                  }
                  else {
                      $('#modalQu').modal('hide') // hiding modal form
                  };
              });
          });
      });

      // Edit Modal Window - opens modal with appropriate properties
      $('#tableQu').on('click', '.btnEdit', async function (e) {
          // console.log('btnEdit is clicked');

          var id = $(this).attr("aria-label");
          // console.log(id);

          FormSubmitButton = document.querySelector('#btnSaveQuFormSubmitButton');

          // enabling disabling buttons
          $('#btnAddNewQuFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
          $('#btnSaveQuFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

          $('#modalQu').modal('show');   // open modal

          $('#modalQu').find('.modal-title').text('Edit Entry'); // Setting title for modal

          // retrieving data
          await axios({
              method: 'GET',
              url: `${HOST_URL}/api/v1/sales-finance/quotation/${id}`,
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
                  document.querySelector('#quId').value = res.data.quotation._id;
                  document.querySelector('#quModuleRef').value  = res.data.quotation.moduleReference;
                  document.querySelector('#quHeader').value  = res.data.quotation.header;
                  document.querySelector('#quDate').value = res.data.quotation.date;
                  document.querySelector('#quBuyerID').value = res.data.quotation._buyerId;
                  document.querySelector('#quBuyerName').value = res.data.quotation.buyerName;
                  document.querySelector('#quBuyerAddress').value = res.data.quotation.buyerAddress;
                  document.querySelector('#quBuyerEmail').value = res.data.quotation.buyerEmail;
                  document.querySelector('#quBuyerContact').value = res.data.quotation.buyerContactNumber;
                  document.querySelector('#quContactTypeB').value = res.data.quotation.CosigneeEmail;
                  document.querySelector('#quSellerID').value = res.data.quotation.cosigneeContact;
                  document.querySelector('#quSellerName').value = res.data.quotation.sellerName;
                  document.querySelector('#quSellerAName').value = res.data.quotation.sellerAttentionName;
                  document.querySelector('#quSellerAddress').value = res.data.quotation.sellerAddress;
                  document.querySelector('#quSellerEmail').value = res.data.quotation.sellerEmail;
                  document.querySelector('#quSellerContact').value  = res.data.quotation.sellerContactNumber;
                  document.querySelector('#quContactTypeS').value = res.data.quotation.sellerContactNumbertype;
                  document.querySelector('#quSubject').value = res.data.quotation.subject;
                  document.querySelector('#quBody').value = res.data.quotation.body;
                  document.querySelector('#quItemTable').value = res.data.quotation.itemTable;
                  document.querySelector('#quTermsCondition').value = res.data.quotation.termsAndConditions;
                  document.querySelector('#quFooter').value = res.data.quotation.footer;
                  document.querySelector('#quNumber').value = res.data.quotation.quotationNumber;
                  document.querySelector('#quType').value = res.data.quotation.type;
                  document.querySelector('#quMeta').value = res.data.quotation.meta;
              }
              
          });
      });

      // deleteOne operation
      $('#tableQu').on('click', '.btnDelete', function (e) {
          console.log('btnDelete Clicked');
          let ids = $(this).attr("aria-label");

          ids = ids.toString();

          const requests = {
              params: {
                  _id: ids,
              }
          }

          axios.delete(`${HOST_URL}/api/v1/sales-finance/quotation`, requests);

          // reload table
          $('#tableQu').KTDatatable().reload();
          
      });

      // deleteAll mass operation
      datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
          // datatable.checkbox() access to extension methods
          const ids = datatable.checkbox().getSelectedId();
          const count = ids.length;
      
          $('#tableQu_selected_records_2').html(count);

          console.log(count)
      
          if (count > 0) {
              $('#tableQu_group_action_form_2').collapse('show');
          } else {
              $('#tableQu_group_action_form_2').collapse('hide');
          }
      });

      };


    return {
        // public functions
          init: function () {
          _Quotation();
          
        },
      };
  })();
  
  jQuery(document).ready(function () {
      QuotationCRUD.init();
  });    