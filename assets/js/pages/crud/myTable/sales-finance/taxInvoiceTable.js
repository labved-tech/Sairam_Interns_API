/* eslint-disable */
//'use strict';

// Class definition

const TaxInvoiceTable = (function () {
    var dataSet;
    // Private functions
  
    const taxInvoiceTable = async () =>  {
  
      const options = {
        // datasource definition
        data: {
          type: 'remote',
          source: {
            read: {
              method: 'get',
              url: `${HOST_URL}/api/v1/sales-finance/taxInvoice/table`,
              params: {
                fields: '_id, taxInvoiceNo, header, date, _orderId,orderDate,_buyerId,billingName,billingAddress,billingEmail,billingContactNumber,billingGSTIN,consigneeName,consigneeAddress,consigneeContactNumber,_sellerId,sellerName,sellerAddress,sellerContactNumber,carrierTrackingNo,carrierCharges,totalBeforeTax,CGSTTotal,SGSTTotal,IGSTTotal,grandTotal,termsAndConditions,footer,meta,source, createdBy,createdAt,updatedAt',
              },
              map: function(raw) {
                // sample data mapping
                console.log('raw', raw);
                dataSet = raw;
            
                if (typeof raw.taxInvoice !== 'undefined') {
                  dataSet = raw.taxInvoice;
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
            field: 'taxInvoiceNo',
            title: 'Tax Invoice No',
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
            field: '_orderId',
            title: 'Order Id',
          },
          {
            field: 'orderDate',
            title: 'Order Date',
          },
          {
            field: '_buyerId',
            title: 'Buyer Id ',
          },
          {
            field: 'billingName',
            title: 'Billing Name',
          },
          {
            field: 'billingAddress',
            title: 'Billing Address',
          },
          {
            field: 'billingEmail',
            title: 'Billing Email',
          },
          {
            field: 'contactNumber',
            title: 'Billing Contact No',
          },

          {
            field: 'consigneeName',
            title: 'Consignee Name',
          },
          {
            field: 'consigneeAddress',
            title: 'Consignee Address',
          },
          {
            field: 'consigneeContactNumber',
            title: 'Consignee Contact No',
          },
          {
            field: '_sellerId',
            title: 'Seller Id',
          },
          {
            field: 'sellerName',
            title: 'Seller Name',
          },
          {
            field: 'sellerAddress',
            title: 'Seller Address',
          },
          {
            field: 'sellerContactNumber',
            title: 'Seller Contact No',
          },
          {
            field: 'carrierTrackingNo',
            title: 'Carrier Tracking No',
          },
          {
            field: 'carrierCharges',
            title: 'Carrier Charges',
          },

          {
            field: 'totalBeforeTax',
            title: 'Total Before Tax',
          },
          {
            field: 'CGSTTotal',
            title: 'CGST Total',
          },
          {
            field: 'SGSTTotal',
            title: 'SGST Total',
          },
          {
            field: 'IGSTTotal',
            title: 'IGST Total',
          },
          {
            field: 'grandTotal',
            title: 'Grand Total',
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
            field: 'meta',
            title: 'Meta',
          },
          {
            field: 'source',
            title: 'Source',
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
  
    };
  
    return {
      // public functions
      init: function () {
        taxInvoiceTable();
      },
    };
  })();
  
  jQuery(document).ready(function () {
    TaxInvoiceTable.init();
  });
  