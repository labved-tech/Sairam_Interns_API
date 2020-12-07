/* eslint-disable */
'use strict';

// Class definition
const FarmCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

  // Private functions
  const _createFarmRegions = function () {
    // Getting Document related information
    const createFarmRegionsForm = KTUtil.getById('createFarmRegionsForm');           
    const createFarmRegionsFormSubmitButton = KTUtil.getById('createFarmRegionsFormSubmitButton');
    const frFarmId = KTUtil.getById('frFarmId');
    const frZoneId = KTUtil.getById('frZoneId');
    const frConsultant = KTUtil.getById('frConsultant');
    

    if(!createFarmRegionsForm) {
      return;
    }

    FormValidation.formValidation(createFarmRegionsForm, {
      fields: {
        frFarmId: {
          validators: {
            notEmpty: {
              message: 'Farm ID is required',
            },
          },
        },  
          frZoneId: {
            validators: {
              notEmpty: {
                message: 'Zone ID is required',
              },
            },
          },
          frConsultant: {
            validators: {
              notEmpty: {
                message: 'Consultant is required',
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
        createFarmRegionsFormSubmitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      },
    }).on('core.form.valid', function () {
        KTUtil.btnWait(createFarmRegionsFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
        
      // Accessing Restful API
      axios({
        method: 'Post',
        url: `${HOST_URL}/api/v1/farm/regions/`,
          data: {
            _farmId: frFarmId.value,
            _zoneId: frZoneId.value,
            consultant:frConsultant.value,
              
        },
      }).then(function (res) {
        KTUtil.btnRelease(createFarmRegionsFormSubmitButton);
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

      const _createFarmExportedStrategy = function () {
        // Getting Document related information
        const createFarmExportedStrategyForm = KTUtil.getById('createFarmExportedStrategyForm');           
        const createFarmExportedStrategyFormSubmitButton = KTUtil.getById('createFarmExportedStrategyFormSubmitButton');
        const fesName = KTUtil.getById('fesName');
        const fesDescription = KTUtil.getById('fesDescription');
        const fesZoneId = KTUtil.getById('fesZoneId');
        const fesCropId = KTUtil.getById('fesCropId');
        const fesFarmId = KTUtil.getById('fesFarmId');
        const fesExpectedYield = KTUtil.getById('fesExpectedYield');
        const fesExpectedYieldUnit = KTUtil.getById('fesExpectedYieldUnit');
        const fesActualYield = KTUtil.getById('fesActualYield');
        const fesActualYieldUnit = KTUtil.getById('fesFarmId');
        const fesStart = KTUtil.getById('fesStart');
        const fesExpectedEnd = KTUtil.getById('fesFarmId');
        const fesShareable = KTUtil.getById('fesShareable');
        const fesShareableType = KTUtil.getById('fesShareableType');
        const fesContractTemplateId = KTUtil.getById('fesContractTemplateId');
        const fesRate = KTUtil.getById('fesRate');
        const fesTotalExpense = KTUtil.getById('fesTotalExpense');
        const fesAuthorNotes = KTUtil.getById('fesAuthorNotes');
        const fesParentId = KTUtil.getById('fesParentId');
        
    
        if(!createFarmExportedStrategyForm) {
          return;
        }
    
        FormValidation.formValidation(createFarmExportedStrategyForm, {
          fields: {
            fesName: {
                validators: {
                  notEmpty: {
                    message: 'Name is required',
                  },
                },
              },  
              fesDescription : {
                  validators: {
                    notEmpty: {
                      message: 'Description is required',
                    },
                  },
                },       
              fesZoneId: {
                validators: {
                  notEmpty: {
                    message: 'Zone ID is required',
                  },
                },
              },
              fesCropId: {
                validators: {
                  notEmpty: {
                    message: 'Crop ID is required',
                  },
                },
              },  
              fesFarmId: {
                validators: {
                  notEmpty: {
                    message: 'Farm ID is required',
                  },
                },
              },        
              fesExpectedYield: {
                validators: {
                  notEmpty: {
                    message: 'Expected Yield is required',
                  },
                },
              },
              fesExpectedYieldUnit: {
                validators: {
                  notEmpty: {
                    message: 'Expected Yield Unit is required',
                  },
                },
              },                         
              fesActualYield: {
                validators: {
                  notEmpty: {
                    message: 'Actual Yield is required',
                  },
                },
              },
              fesActualYieldUnit: {
                validators: {
                  notEmpty: {
                    message: 'Actual Yield Unit is required',
                  },
                },
              },  
              fesStart: {
                validators: {
                  notEmpty: {
                    message: 'Date is required',
                  },
                },
              },        
              fesExpectedEnd: {
                validators: {
                  notEmpty: {
                    message: 'Date is required',
                  },
                },
              },
              fesStages: {
                validators: {
                  notEmpty: {
                    message: 'Stage is required',
                  },
                },
              },                         
              fesShareable: {
                validators: {
                  notEmpty: {
                    message: 'This is required',
                  },
                },
              },
              fesRate: {
                validators: {
                  notEmpty: {
                    message: 'Rate is required',
                  },
                },
              },                
              fesShareableType: {
                validators: {
                  notEmpty: {
                    message: 'Type is required',
                  },
                },
              },  
              fesContractTemplateId: {
                validators: {
                  notEmpty: {
                    message: 'Contract ID is required',
                  },
                },
              },        
              fesAuthorNotes: {
                validators: {
                  notEmpty: {
                    message: 'Notes are required',
                  },
                },
              },
              fesTotalExpense: {
                validators: {
                  notEmpty: {
                    message: 'Expenses are required',
                  },
                },
              },
              fesParentId: {
                validators: {
                  notEmpty: {
                    message: 'Parent ID required',
                  },
                },
              },                                     
          },
          plugins: {
            //Learn more: https://formvalidation.io/guide/plugins
            trigger: new FormValidation.plugins.Trigger(),
            // Bootstrap framework Integration
            bootstrap: new FormValidation.plugins.Bootstrap(),
            // Validate fields when clicking the Submit button
            createFarmExportedStrategyFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
          },
        }).on('core.form.valid', function () {
            KTUtil.btnWait(createFarmExportedStrategyFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
            
          // Accessing Restful API
          fesShareable.value = (fesShareable.value == 'on') ? true:false

          axios({
            method: 'Post',
            url: `${HOST_URL}api/v1/farm/exported-strateg`,
              data: {
                name: fesName.value,
                description: fesDescription.value,
                _zoneId:fesZoneId.value,
                _cropId: fesCropId.value,
                _farmId: fesFarmId.value,
                expectedYield:fesExpectedYield.value,
                expectedYieldUnit: fesExpectedYieldUnit.value,
                actualYield: fesActualYield.value,
                actualYieldUnit:fesActualYieldUnit.value,
                start: fesStart.value,
                expectedEnd:fesExpectedEnd.value,
                stages: fesStages.value,
                shareable: fesShareable.value,
                shareableType:fesShareableType.value,
                _contractTemplateId: fesContractTemplateId.value,
                rate: fesRate.value,
                totalExpense:fesTotalExpense.value,
                authorNotes: fesAuthorNotes.value,
                _parentId: fesParentId.value,
            },
          }).then(function (res) {
            KTUtil.btnRelease(createFarmExportedStrategyFormSubmitButton);
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
      
    const _Lists = function () {
        const frConsultant = KTUtil.getById('frConsultant');          // Dropdown List : Multiple Select1
        const fesStages = KTUtil.getById('fesStages');          // Dropdown List : Multiple Select1
        
        // Dropdown List : Single Select
        
        $('#frConsultant').select2({
            allowClear: true
              });
        
        $('#fesStages').select2({
            allowClear: true
                });   
                
    };            
    const _Numbers = function () {
        /* Initializing */
        const fesExpectedYield = KTUtil.getById('fesExpectedYield');  // Number : Horizontal Slide                           
        const fesActualYield = KTUtil.getById('fesActualYield');  // Number : Horizontal Slide                           

        // Number : Horizontal Slide
        // init slider
        // init slider
        var HsliderExpected = document.getElementById('fesExpectedYield');
        var HsliderActual = document.getElementById('fesActualYield');
		var HsliderExpenses = document.getElementById('fesTotalExpense');


		noUiSliderExpected.create(HsliderExpected, {
			start: [ 0 ],
			step: 2,
			range: {
				'min': [ 0 ],
				'max': [ 100 ]
			},
			format: wNumb({
				decimals: 0
			})
        });
		noUiSliderActual.create(HsliderActual, {
			start: [ 0 ],
			step: 2,
			range: {
				'min': [ 0 ],
				'max': [ 100 ]
			},
			format: wNumb({
				decimals: 0
			})
        });
		noUiSliderExpenses.create(HsliderExpenses, {
			start: [ 0 ],
			step: 2,
			range: {
				'min': [ 0 ],
				'max': [ 100 ]
			},
			format: wNumb({
				decimals: 0
			})
		});                

		// init slider input
		var HsliderInputExpectedYield = document.getElementById('fesExpectedYield');
        var HsliderInputActualYield = document.getElementById('fesActualYield');
        var HsliderInputfesTotalExpense = document.getElementById('fesTotalExpense');

        //Expected Yeild
		HsliderExpected.noUiSliderExpected.on('update', function( values, handle ) {
            HsliderInputExpectedYield.value = values[handle];
		});

		HsliderInputExpectedYield.addEventListener('change', function(){
            HsliderExpected.noUiSliderExpected.set(this.value);          
        });
/*         //Actual Yield
		HsliderActual.noUiSliderActual.on('update', function( values, handle ) {
            HsliderInputActualYield.value = values[handle];
        });
        
        HsliderInputActualYield.addEventListener('change', function(){
			HsliderActual.noUiSliderActual.set(this.value);
        });
        //Total Expenses
        HsliderExpenses.noUiSliderExpenses.on('update', function( values, handle ) {
            HsliderInputfesTotalExpense.value = values[handle];
        });
        
        HsliderInputfesTotalExpense.addEventListener('change', function(){
			HsliderExpenses.noUiSliderExpenses.set(this.value);
        });
    };   */

  return {
    // public functions
    init: function () {
        _createFarmRegions();
        _Lists();
        _createFarmExportedStrategy();
        _Numbers();
    },
  };
})();

jQuery(document).ready(function () {
    FarmCRUD.init();
});
