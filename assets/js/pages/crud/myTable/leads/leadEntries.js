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
                url: `${HOST_URL}/api/v1/lead/entries/table`,
                params: {
                  fields: '_id,name,title,_categoryId,company,description,email,website,assignedTo,_sourceId,lastContact,priority,dateConverted,lost,lastLeadStatus,lastStatusChange,address.address1,address.street,address.city,address.state,address.country,address.postalCode,leadStatus.name,leadStatus.statusOrder,leadStatus.colour,leadStatus.isDefault,leadStatus.notes,status,source.namecreatedAt,updatedAt',
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
              field: 'name',
              title: 'Name ',
              template: function (row) {
                return '\
                  <div>\
                  <a href="#">' + row.name + '</a></div>\
                ';
              }
            },
            {
              field: 'title',
              title: 'Title',
            },
            {
              field: '_categoryId',
              title: 'Category ID',
            },
            {
              field: 'company',
              title: 'Company',
            },
            {
              field: 'description',
              title: 'Description',
            },
            {
              field: 'email',
              title: 'Email',
            },
            {
              field: 'website',
              title: 'website',
            },
            {
              field: 'assignedTo',
              title: 'Assigned TO',
            },
            {
              field: '_sourceId',
              title: 'Source ID',
            },
            {
              field: 'lastContact',
              title: 'Last Contact',
            },
            {
              field: 'priority',
              title: 'Priority',
            },
            {
              field: 'dateConverted',
              title: 'Date Converted',
            },
            {
              field: 'lost',
              title: 'Lost',
            },
            {
              field: 'lastLeadStatus',
              title: 'Last Lead Status',
            },
            {
              field: 'lastStatusChange',
              title: 'Last Status Change',
            },
            {
              field: 'status',
              title: 'Status',
            },
            {
              field: 'address.address1',
              title: 'Address',
            },
            {
              field: 'address.street',
              title: 'Street',
            },
            {
              field: 'address.city',
              title: 'City',
            },
            {
              field: 'address.state',
              title: 'State',
            },
            {
              field: 'address.country',
              title: 'Country',
            },
            {
              field: 'address.postalCode',
              title: 'Postal Code',
            },
            {
              field: 'source.name',
              title: 'Source Name',
            },
            {
              field: 'leadStatus.name',
              title: 'Last Status Name',
            },
            {
              field: 'leadStatus.statusOrder',
              title: 'Lead Status Order',
            },
            {
              field: 'leadStatus.colour',
              title: 'Lead Status Colour',
            },
            {
              field: 'leadStatus.isDefault',
              title: 'Lead Status Default',
            },
            {
              field: 'leadStatus.notes',
              title: 'Lead Status Notes',
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
  