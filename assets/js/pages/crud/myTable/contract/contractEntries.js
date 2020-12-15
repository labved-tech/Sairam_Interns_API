/* eslint-disable */
//'use strict';

// Class definition

const LeadEntries = (function () {
    var dataSet;
    // Private functions
  
    const leadEntriesTable = async () =>  {
  
        const options = {
          // datasource definition
          data: {
            type: 'remote',
            source: {
              read: {
                method: 'get',
                url: `${HOST_URL}/api/v1/contract/entries/table`,
                params: {
                  fields: '_id,_contractOwnerId,_clientId,clientAccepted,acceptedDate,contractNumber,_contractTemplateId,rel,_relId,validFrom,validTill,validity,billingType,rate,contractFileURL,additionalAttributes,signedContractUploaded,termsAndConditions,status,tax.HSNCode,tax.CGSTRate,tax.SGSTRate,tax.IGSTRate,createdAt,updatedAt',
                },
                map: function(raw) {
                  // sample data mapping
                  console.log('raw', raw);
                  dataSet = raw;
              
                  if (typeof raw.leadEntries !== 'undefined') {
                    dataSet = raw.leadEntries;
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
            input: $('#createLeadEntriesTable'),
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
              field: '_contractOwnerId',
              title: 'Contract Owner ID ',
              template: function (row) {
                return '\
                  <div>\
                  <a href="#">' + row._contractOwnerId + '</a></div>\
                ';
              }
            },
            {
              field: '_clientId',
              title: 'Client ID',
            },
            {
              field: 'clientAccepted',
              title: 'Client Accepted',
            },
            {
              field: 'acceptedDate',
              title: 'Accepted Date',
            },
            {
              field: 'contractNumber',
              title: 'Contract Number',
            },
            {
              field: '_contractTemplateId',
              title: 'Contract Template ID',
            },
            {
              field: 'rel',
              title: 'Rel',
            },
            {
              field: '_relId',
              title: 'Rel ID',
            },
            {
              field: 'validFrom',
              title: 'Valid From',
            },
            {
              field: 'validTill',
              title: 'Valid Till',
            },
            {
              field: 'validity',
              title: 'Validity ',
            },
            {
              field: 'billingType',
              title: 'Billing Type',
            },
            {
              field: 'rate',
              title: 'Rate',
            },
            {
              field: 'contractFileURL',
              title: 'Contract File URL',
            },
            {
              field: 'additionalAttributes',
              title: 'Additional Attributes',
            },
            {
              field: 'signedContractUploaded',
              title: 'Signed Contract Uploaded',
            },
            {
              field: 'termsAndConditions',
              title: 'Terms And Conditions',
            },
            {
              field: 'status',
              title: 'Status',
            },
            {
              field: 'tax._contractOwnerId',
              title: 'Tax: Contract Owner ID',
            },
            {
              field: 'tax.HSNCode',
              title: 'Tax: HSN Code',
            },
            {
              field: 'tax.CGSTRate',
              title: 'Tax: CGST Rate',
            },
            {
              field: 'tax.SGSTRate',
              title: 'Tax: SGST Rate',
            },
            {
              field: 'tax.IGSTRate',
              title: 'Tax: IGST Rate',
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
        leadEntriesTable();
      },
    };
  })();
  
  jQuery(document).ready(function () {
    LeadEntries.init();
  });
  