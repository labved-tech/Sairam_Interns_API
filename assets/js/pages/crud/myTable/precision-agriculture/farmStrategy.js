/* eslint-disable */
//'use strict';

// Class definition

const FarmStrategy = (function () {
    var dataSet;
    // Private functions
  
    const farmStrategyTable = async () =>  {
  
        const options = {
          // datasource definition
          data: {
            type: 'remote',
            source: {
              read: {
                method: 'get',
                url: `${HOST_URL}/api/v1/farm/strategy/table`,
                params: {
                  fields: '_id,name,description,_zoneId,_cropId,_regionId,expectedYield,expectedYieldUnit,actualYield,actualYieldUnit,start,expectedEnd,_contractId,_exportedStrategyId,rate,totalExpense,authorsNote,_parentId,createdAt,updatedAt',
                },
                map: function(raw) {
                  // sample data mapping
                  console.log('raw', raw);
                  dataSet = raw;
              
                  if (typeof raw.farmStrategy !== 'undefined') {
                    dataSet = raw.farmStrategy;
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
            input: $('#createFarmStrategyTable'),
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
              template: function (row) {
                return '\
                  <div>\
                  <a href="#">' + row.name + '</a></div>\
                ';
              }
            },
            {
              field: 'description',
              title: 'Description',
            },
            {
              field: '_zoneId',
              title: 'ZOne ID',
            },
            {
              field: '_cropId',
              title: 'Crop ID',
            },
            {
              field: '_regionId',
              title: 'Region ID',
            },
            {
              field: 'expectedYield',
              title: 'Expected Yield',
            },
            {
              field: 'expectedYieldUnit',
              title: 'Expected Yield Unit',
            },
            {
              field: 'actualYield',
              title: 'Actual Yield',
            },
            {
              field: 'actualYieldUnit',
              title: 'ActualYieldUnit',
            },
            {
              field: 'start',
              title: 'Start',
            },
            {
              field: 'expectedEnd',
              title: 'Expected End',
            },
            {
              field: '_contractId',
              title: 'Contract ID',
            },
            {
              field: '_exportedStrategyId',
              title: 'Exported Strategy ID',
            },
            {
              field: 'rate',
              title: 'Rate',
            },
            {
              field: 'totalExpense',
              title: 'Total Expense',
            },
            {
              field: 'authorNote',
              title: 'Author Note',
            },
            {
              field: '_parentId',
              title: 'Parent ID',
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
        farmStrategyTable();
      },
    };
  })();
  
  jQuery(document).ready(function () {
    FarmStrategy.init();
  });
  