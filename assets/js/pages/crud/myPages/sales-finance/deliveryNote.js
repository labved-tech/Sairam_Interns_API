/* eslint-disable */
'use strict';

/* Class definition */
const DeliveryNoteCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

    /*   Private functions */
    function _DeliveryNote() {
      var dataSet;

      /* Table Options */
      const options = {
          // datasource definition
          data: {
          type: 'remote',
          source: {
              read: {
              method: 'get',
              url: `${HOST_URL}/api/v1/sales-finance/delivery-note/table`,
              params: {
                fields: '_id, packingListnumber, taxInvoiceNumber, source, sourceAddress, sourceContactNumber,sourceGstin,consignee,consigneeAddress,consigneeEmail,consigneeContactNumber,consigneeGstin,shipMethod,carrierName,carrierTrackingNumber, shippingNotes,receivedBy,fileProof,createdBy,createdAt,updatedAt',
            },
              map: function(raw) {
                  // sample data mapping
                  // console.log('raw', raw);
                  dataSet = raw;

                  if (typeof raw.deliveryNote !== 'undefined') {
                  dataSet = raw.deliveryNote;
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
          input: $('#tableDn_search_query_2'),
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
            field: 'packingListnumber',
            title: 'PackingList No',
          },
          {
            field: 'taxInvoiceNumber',
            title: 'Tax Invoice No',
          },
          {
            field: 'source',
            title: 'Source',
          },
          {
            field: 'sourceAddress',
            title: 'Source Address',
          },
          {
            field: 'sourceContactNumber',
            title: 'Source Contact No',
          },
          {
            field: 'sourceGstin',
            title: 'Source Gst',
          },
          {
            field: 'consignee',
            title: 'Consignee',
          },
          {
            field: 'consigneeAddress',
            title: 'Consignee Address',
          },
          {
            field: 'consigneeEmail',
            title: 'Consignee Email',
          },

          {
            field: 'consigneeContactNumber',
            title: 'Consignee Contact No',
          },
          {
            field: 'consigneeGstin',
            title: 'Consignee Gst',
          },
          {
            field: 'shipMethod',
            title: 'Ship Method ',
          },
          {
            field: 'carrierName',
            title: 'Carrier Name',
          },
          {
            field: 'carrierTrackingNumber',
            title: 'Carrier Tracking No',
          },
          {
            field: 'shippingNotes',
            title: 'Shipping Notes',
          },
          {
            field: 'receivedBy',
            title: 'Received By',
          },
          {
            field: 'fileProof',
            title: 'File Proof',
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
      const datatable = $('#tableDn').KTDatatable(options);

      /* Form */
      const DnForm = document.querySelector('#formDn');
      let FormSubmitButton = document.querySelector('#btnAddNewDnFormSubmitButton');
      // Options
      let formOptions = {
          fields: {
          
          dnPackingListNo: {
              validators: {
                  notEmpty: {
                      message: 'Packing List No  is required',
                  },
              },
          },
          dnTaxInvoiceNo: {
              validators: {
                  notEmpty: {
                      message: 'Tax Invoice No is required',
                  },
              },
          },
          dnSource: {
              validators: {
                  notEmpty: {
                      message: 'Source is required',
                  },
              },
          },
          dnSourceAddress: {
              validators: {
                  notEmpty: {
                      message: 'Source Address is required',
                  },
              },
          },
          dnSourceContact: {
              validators: {
                  notEmpty: {
                      message: 'Source Contact is required',
                  },
              },
          },
          dnSourceGST: {
              validators: {
                  notEmpty: {
                      message: 'Source GST is required',
                  },
              },
          },
          dnCosignee: {
              validators: {
                  notEmpty: {
                      message: 'Cosignee is required',
                  },
              },
          },
          dnCosigneeAddress: {
              validators: {
                  notEmpty: {
                      message: 'Address is required',
                  },
              },
          },
          dnCosigneeEmail: {
              validators: {
                  notEmpty: {
                      message: 'Email is required',
                  },
              },
          },
          dnCosigneeContact: {
              validators: {
                  notEmpty: {
                      message: ' Contact is required',
                  },
              },
          },
          dnCosigneeGST: {
              validators: {
                  notEmpty: {
                      message: 'Cosignee GST is required',
                  },
              },
          },
          dnBox: {
              validators: {
                  notEmpty: {
                      message: 'This Field is required',
                  },
              },
          },
          dnShipMethod: {
              validators: {
                  notEmpty: {
                      message: 'Ship Method is required',
                  },
              },
          },
          dnCarrierName: {
              validators: {
                  notEmpty: {
                      message: 'Carrier Name is required',
                  },
              },
          },
          dnTrackingNo: {
              validators: {
                  notEmpty: {
                      message: 'Tracking No is required',
                  },
              },
          },
          dnShippingNotes: {
              validators: {
                  notEmpty: {
                      message: 'Notes is required',
                  },
              },
          },
          dnReceivedBy: {
              validators: {
                  notEmpty: {
                      message: 'This Field is required',
                  },
              },
          },
          dnFileProof: {
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
      };

      let fv;

      /* Search Operations */
      // search based on status
      $('#tableDn_search_status_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Status');
      });

      // search based on type
      $('#tableDn_search_type_2').on('change', function () {
          datatable.search($(this).val().toLowerCase(), 'Type');
      });

      $('#tableDn_search_status_2, #tableDn_search_type_2').selectpicker();

      // modal open
      $('#btnOpenDnModal').on('click', async function (e) {
          console.log('openButton is clicked');

          // enabling disabling buttons
          $('#btnAddNewDnFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled');  // show add button
          $('#btnSaveDnFormSubmitButton').attr('hidden', '').attr('disabled', 'disabled'); // hide update button

          FormSubmitButton = document.querySelector('#btnAddNewDnFormSubmitButton');

          $('#modalDn').modal('show');   // open modal

          $('#modalDn').find('.modal-title').text('Add New Entries'); // Setting title for modal

      });

      // modal post closed
      $('#modalDn').on('hidden.bs.modal', function (e) {
          console.log('Modal closed');

          if (fv) {
              // clearing forms
              fv.resetForm();
              fv.destroy();
          }

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message

          // clearing fields
          $("#formDn").trigger('reset'); // clear form fields

          // manually resetting other fields
      });

      // modal post opened
      $('#modalDn').on('shown.bs.modal', function (e) {
          console.log('Modal open');

          // Initializing

          // Number : Number Controls Same Sides: Box Length
        $('#dnSourceGST').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',
      
            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '$'
          });  
        // Number : Number Controls Same Sides: Box Length
        $('#dnCosigneeGST').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            verticalbuttons: true,
            verticalup: '<i class="ki ki-plus"></i>',
            verticaldown: '<i class="ki ki-minus"></i>',
      
            min: -1000000000,
            max: 1000000000,
            step: 1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            prefix: '$'
          });  

      });

      // form reset operation
      $('#formDn').on('click', '.btnReset', function (e) {
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
          $("#formDn").trigger('reset'); // clear form fields

          // clear manually
          // $('#menuManagerSelect').empty().trigger('change');  // clearing select2  */
      })

      // form add operation
      $('#formDn').on('click', '.btnAdd', function (e) {
          // console.log('btnCreate is clicked');

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message
          
          FormSubmitButton = document.querySelector('#btnAddNewDnFormSubmitButton');

          // Validation
          fv = FormValidation.formValidation(DnForm, formOptions);

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
                  url: `${HOST_URL}/api/v1/sales-finance/delivery-note`,
                  data: { 
                      packingListnumber: document.querySelector('#dnPackingListNo').value * 1,
                      taxInvoiceNumber: document.querySelector('#dnTaxInvoiceNo').value * 1,
                      source: document.querySelector('#dnSource').value,
                      sourceAddress: document.querySelector('#dnSourceAddress').value,
                      sourceContactNumber: document.querySelector('#dnSourceContact').value,
                      sourceGstin:document.querySelector('#dnSourceGST').value,
                      consignee:document.querySelector('#dnCosignee').value,
                      consigneeAddress: document.querySelector('#dnCosigneeAddress').value,
                      consigneeEmail: document.querySelector('#dnCosigneeEmail').value,
                      consigneeContactNumber: document.querySelector('#dnCosigneeContact').value,
                      consigneeGstin: document.querySelector('#dnCosigneeGST').value,
                      box: document.querySelector('#dnBox').value,
                      shipMethod: document.querySelector('#dnShipMethod').value,
                      carrierName: document.querySelector('#dnCarrierName').value,
                      carrierTrackingNumber: document.querySelector('#dnTrackingNo').value * 1,
                      shippingNotes: document.querySelector('#dnShippingNotes').value,
                      receivedBy: document.querySelector('#dnReceivedBy').value,
                      fileProof: document.querySelector('#dnFileProof').value,
                  },
              }).then(function (res) {
              
                  // Return valid JSON
                  // console.log(res);

                  // Release button
                  KTUtil.btnRelease(FormSubmitButton);

                  if (res.data.status == 'success') {
                      // reseting & clearing
                      $('#modalDn').modal('hide')  // hiding modal form
                      toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                      $('#tableDn').KTDatatable().reload(); // reload table
                  }
                  else if (res.data.status == 'error') {
                      $('#modalDn').modal('hide')  // hiding modal form
                      toastr.error(`${res.data.message}`, `${res.data.status}`)
                  }
                  else {
                      $('#modalDn').modal('hide')
                  };
              });
          });
      });

      // form save operation
      $('#formDn').on('click', '.btnSave', function (e) {
          console.log('btnSave is clicked');

          // clearing validator messages
          $('.fv-plugins-message-container').text(''); // remove message
          
          FormSubmitButton = document.querySelector('#btnSaveDnFormSubmitButton');

          // Validation
          fv = FormValidation.formValidation(DnForm, formOptions);

          // validation failed
          fv.on('core.form.invalid', async function () {
              // console.log('Something went wrong!!');    
          });

          // validation successful
          fv.on('core.form.valid', async function () {

              const id = document.querySelector('#dnId').value;

              // Show loading state on button
              KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

              // Accessing Restful API
              await axios({
                  method: 'patch',
                  url: `${HOST_URL}/api/v1/sales-finance/delivery-note/${id}`,
                  data: {
                    packingListnumber: document.querySelector('#dnPackingListNo').value * 1,
                    taxInvoiceNumber: document.querySelector('#dnTaxInvoiceNo').value * 1,
                    source: document.querySelector('#dnSource').value,
                    sourceAddress: document.querySelector('#dnSourceAddress').value,
                    sourceContactNumber: document.querySelector('#dnSourceContact').value,
                    sourceGstin:document.querySelector('#dnSourceGST').value,
                    consignee:document.querySelector('#dnCosignee').value,
                    consigneeAddress: document.querySelector('#dnCosigneeAddress').value,
                    consigneeEmail: document.querySelector('#dnCosigneeEmail').value,
                    consigneeContactNumber: document.querySelector('#dnCosigneeContact').value,
                    consigneeGstin: document.querySelector('#dnCosigneeGST').value,
                    box: document.querySelector('#dnBox').value,
                    shipMethod: document.querySelector('#dnShipMethod').value,
                    carrierName: document.querySelector('#dnCarrierName').value,
                    carrierTrackingNumber: document.querySelector('#dnTrackingNo').value * 1,
                    shippingNotes: document.querySelector('#dnShippingNotes').value,
                    receivedBy: document.querySelector('#dnReceivedBy').value,
                    fileProof: document.querySelector('#dnFileProof').value,
                  },
              }).then(function (res) {
                  // Return valid JSON
                  // console.log(res);

                  // Release button
                  KTUtil.btnRelease(FormSubmitButton);

                  if (res.data.status == 'success') {
                      // reseting & clearing
                      $('#modalDn').modal('hide')  // hiding modal form
                      toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                      $('#tableDn').KTDatatable().reload(); // reload table

                  }
                  else if (res.data.status == 'error') {
                      $('#modalDn').modal('hide')  // hiding modal form
                      toastr.error(`${res.data.message}`, `${res.data.status}`)
                  }
                  else {
                      $('#modalDn').modal('hide') // hiding modal form
                  };
              });
          });
      });

      // Edit Modal Window - opens modal with appropriate properties
      $('#tableDn').on('click', '.btnEdit', async function (e) {
          // console.log('btnEdit is clicked');

          var id = $(this).attr("aria-label");
          // console.log(id);

          FormSubmitButton = document.querySelector('#btnSaveDnFormSubmitButton');

          // enabling disabling buttons
          $('#btnAddNewDnFormSubmitButton').attr('hidden', 'hidden').attr('disabled', 'disabled'); // hide add button
          $('#btnSaveDnFormSubmitButton').removeAttr('hidden', '').removeAttr('disabled', 'disabled'); // show update button

          $('#modalDn').modal('show');   // open modal

          $('#modalDn').find('.modal-title').text('Edit Entry'); // Setting title for modal

          // retrieving data
          await axios({
              method: 'GET',
              url: `${HOST_URL}/api/v1/sales-finance/delivery-note/${id}`,
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
                  //document.querySelector('#dnId').value = res.data.deliveryNote._id;
                  document.querySelector('#dnPackingListNo').value  = res.data.deliveryNote.packingListnumber;
                  document.querySelector('#dnTaxInvoiceNo').value  = res.data.deliveryNote.taxInvoiceNumber;
                  document.querySelector('#dnSource').value = res.data.deliveryNote.source;
                  document.querySelector('#dnSourceAddress').value = res.data.deliveryNote.sourceAddress;
                  document.querySelector('#dnSourceContact').value = res.data.deliveryNote.sourceContactNumber;
                  document.querySelector('#dnSourceGST').value = res.data.deliveryNote.sourceGstin;
                  document.querySelector('#dnCosignee').value = res.data.deliveryNote.consignee;
                  document.querySelector('#dnCosigneeAddress').value = res.data.deliveryNote.consigneeAddress;
                  document.querySelector('#dnCosigneeEmail').value = res.data.deliveryNote.dnCosigneeEmail;
                  document.querySelector('#dnCosigneeContact').value = res.data.deliveryNote.cosigneeContact;
                  document.querySelector('#dnCosigneeGST').value = res.data.deliveryNote.consigneeGstin;
                  document.querySelector('#dnBox').value = res.data.deliveryNote.box;
                  document.querySelector('#dnShipMethod').value = res.data.deliveryNote.shipMethod;
                  document.querySelector('#dnCarrierName').value = res.data.deliveryNote.carrierName;
                  document.querySelector('#dnTrackingNo').value  = res.data.deliveryNote.carrierTrackingNumber;
                  document.querySelector('#dnShippingNotes').value = res.data.deliveryNote.shippingNotes;
                  document.querySelector('#dnReceivedBy').value = res.data.deliveryNote.receivedBy;
                  document.querySelector('#dnFileProof').value = res.data.deliveryNote.fileProof;
              }
              
          });
      });

      // deleteOne operation
      $('#tableDn').on('click', '.btnDelete', function (e) {
          console.log('btnDelete Clicked');
          let ids = $(this).attr("aria-label");

          ids = ids.toString();

          const requests = {
              params: {
                  _id: ids,
              }
          }

          axios.delete(`${HOST_URL}/api/v1/sales-finance/deliveryNote`, requests);

          // reload table
          $('#tableDn').KTDatatable().reload();
          
      });

      // deleteAll mass operation
      datatable.on('datatable-on-check datatable-on-uncheck', function (e) {
          // datatable.checkbox() access to extension methods
          const ids = datatable.checkbox().getSelectedId();
          const count = ids.length;
      
          $('#tableDn_selected_records_2').html(count);

          console.log(count)
      
          if (count > 0) {
              $('#tableDn_group_action_form_2').collapse('show');
          } else {
              $('#tableDn_group_action_form_2').collapse('hide');
          }
      });

      };


    return {
        // public functions
          init: function () {
          _DeliveryNote();
          
        },
      };
  })();
  
  jQuery(document).ready(function () {
      DeliveryNoteCRUD.init();
  });    