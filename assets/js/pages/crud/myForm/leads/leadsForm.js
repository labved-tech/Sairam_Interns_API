/* eslint-disable */
'use strict';

// Class definition
const LeadsCRUD = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';
  
    // Date Picker
  let arrows;
  if (KTUtil.isRTL()) {
    arrows = {
      leftArrow: '<i class="la la-angle-right"></i>',
      rightArrow: '<i class="la la-angle-left"></i>',
    };
  } else {
    arrows = {
      leftArrow: '<i class="la la-angle-left"></i>',
      rightArrow: '<i class="la la-angle-right"></i>',
    };
  }
  // Private functions
  const _createLeadCategories = function () {
    // Getting Document related information
    const createLeadCategoriesForm = KTUtil.getById('createLeadCategoriesForm');           
    const createLeadCategoriesFormSubmitButton = KTUtil.getById('createLeadCategoriesFormSubmitButton');
    const lcName = KTUtil.getById('lcName');
    const lcDescription = KTUtil.getById('lcDescription');
    const lcNotes = KTUtil.getById('lcNotes');
    const lcStatus = KTUtil.getById('lcStatus');

    

    if(!createLeadCategoriesForm) {
      return;   
    }

    FormValidation.formValidation(createLeadCategoriesForm, {
      fields: {
        lcName: {
          validators: {
            notEmpty: {
              message: 'Name is required',
            },
          },
        },
        lcDescription: {
          validators: {
            notEmpty: {
              message: 'Description is required',
            },
          },
        },
        lcNotes: {
          validators: {
            notEmpty: {
              message: 'Notes is required',
            },
          },
        },
        lcStatus: {
          validators: {
            notEmpty: {
              message: 'Status is required',
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
        createLeadCategoriesFormSubmitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      },
    }).on('core.form.valid', function () {
        KTUtil.btnWait(createLeadCategoriesFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
        
      // Accessing Restful API
      axios({
        method: 'Post',
        url: `${HOST_URL}/api/v1/lead/categories/`,
          data: {
            name: lcName.value,
            description: lcDescription.value,
            notes: lcNotes.value,
            status:lcStatus.value,
              
        },
      }).then(function (res) {
        KTUtil.btnRelease(createLeadCategoriesFormSubmitButton);
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


  const _createLeadResponse = function () {
      // Getting Document related information
      const createLeadResponseForm = KTUtil.getById('createLeadResponseForm');           
      const createLeadResponseFormSubmitButton = KTUtil.getById('createLeadResponseFormSubmitButton');
      const lrLeadId = KTUtil.getById('lrLeadId');
      const lrResponderId = KTUtil.getById('lrResponderId');
      const lrEmailSent = KTUtil.getById('lrEmailSent');
      const lrIsStatusChange = KTUtil.getById('lrIsStatusChange');
      const lrMessage = KTUtil.getById('lrMessage');
      const lrStatus = KTUtil.getById('lrStatus');



      

      if(!createLeadResponseForm) {
        return;   
      }

      FormValidation.formValidation(createLeadResponseForm, {
        fields: {
          lrLeadId: {
            validators: {
              notEmpty: {
                message: 'Lead ID is required',
              },
            },
          },
          lrResponderId: {
            validators: {
              notEmpty: {
                message: 'Responder ID is required',
              },
            },
          },
          // lrEmailSent: {         
          //   validators: {
          //     notEmpty: {
          //       message: 'Is Email Sent is required',
          //     },
          //   },
          // },
          // lrIsStatusChange: {
          //   validators: {
          //     notEmpty: {
          //       message: 'Status Change is required',
          //     },
          //   },
          // },
          lrMessage: {
            validators: {
              notEmpty: {
                message: 'Message is required',
              },
            },
          },
          lrStatus: {
            validators: {
              notEmpty: {
                message: 'Status is required',
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
          createLeadResponseFormSubmitButton: new FormValidation.plugins.SubmitButton(),
          // Submit the form when all fields are valid
          //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
      }).on('core.form.valid', function () {
          KTUtil.btnWait(createLeadResponseFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
          
          lrIsStatusChange.value = (lrIsStatusChange.value == 'on') ? true:false
          lrEmailSent.value = (lrEmailSent.value == 'on') ? true:false
          console.log(lrIsStatusChange.value)
          console.log(lrEmailSent.value)

          // Accessing Restful API
    
        axios({
          method: 'Post',
          url: `${HOST_URL}/api/v1/lead/response/`,
            data: {
              _leadId: lrLeadId.value,
              _responderId: lrResponderId.value,
              emailSent: lrEmailSent.value,
              isStatusChange:lrIsStatusChange.value,
              message:lrMessage.value,
              status:lrStatus.value,
                
          },
        }).then(function (res) {
          KTUtil.btnRelease(createLeadResponseFormSubmitButton);
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

  const _createLeadEntries = function () {
    // Getting Document related information
    const createLeadEntriesForm = KTUtil.getById('createLeadEntriesForm');           
    const createLeadEntriesFormSubmitButton = KTUtil.getById('createLeadEntriesFormSubmitButton');
    const leName = KTUtil.getById('leName');
    const leTitle = KTUtil.getById('leTitle');
    const leCategoryId = KTUtil.getById('leCategoryId');
    const leCompany = KTUtil.getById('leCompany');
    const leDescription = KTUtil.getById('leDescription');
    const leEmail = KTUtil.getById('leEmail');
    const leWebsite = KTUtil.getById('leWebsite');
    const leAssignedTo = KTUtil.getById('leAssignedTo');
    const leSourceId = KTUtil.getById('leSourceId');
    const leLastContact = KTUtil.getById('leLastContact');
    const lePriority = KTUtil.getById('lePriority');
    const leDateConverted = KTUtil.getById('leDateConverted');
    const leLost = KTUtil.getById('leLost');
    const leLastLeadStatus = KTUtil.getById('leLastLeadStatus');
    const leLastStatusChange = KTUtil.getById('leLastStatusChange');

    const leAdAddress1 = KTUtil.getById('leAdAddress1');
    const leAdStreet = KTUtil.getById('leAdStreet');
    const leAdCity = KTUtil.getById('leAdCity');
    const leAdState = KTUtil.getById('leAdState');
    const leAdCountry = KTUtil.getById('leAdCountry');
    const leAdPostalCode = KTUtil.getById('leAdPostalCode');

    const leCiType = KTUtil.getById('leCiType');
    const leCiIsPublic = KTUtil.getById('leCiIsPublic');

    const leSName = KTUtil.getById('leSName');

    const leLsName = KTUtil.getById('leLsName');
    const leLsColour = KTUtil.getById('leLsColour');
    const leLsIsDefault = KTUtil.getById('leLsIsDefault');
    const leLsNotes = KTUtil.getById('leLsNotes');
    
    
    //Repeat Multiple

    const leContactEntries = KTUtil.getById('leContactEntries'); // Form Repeat #2 : Multiple 
    
    $('#leContactEntries').repeater({
      initEmpty: false,

      defaultValues: {
        'text-input': 'foo'
      },

      show: function () {
        $(this).slideDown();
      },

      hide: function (deleteElement) {
        $(this).slideUp(deleteElement);
      }
    });

    // Date & Time : Date
    $('#leLastStatusChange').datepicker({
      rtl: KTUtil.isRTL(),
      todayBtn: 'linked',
      clearBtn: true,
      todayHighlight: true,
      orientation: 'bottom left',
      templates: arrows,
    });  
    $('#leDateConverted').datepicker({
      rtl: KTUtil.isRTL(),
      todayBtn: 'linked',
      clearBtn: true,
      todayHighlight: true,
      orientation: 'bottom left',
      templates: arrows,
    });      

    if(!createLeadEntriesForm) {
      return;   
    }

    FormValidation.formValidation(createLeadEntriesForm, {
      fields: {
        leName: {
          validators: {
            notEmpty: {
              message: 'Lead Name is required',
            },
          },
        },
        leTitle: {
          validators: {
            notEmpty: {
              message: 'Title required',
            },
          },
        },
        
        leCategoryId: {
          validators: {
            notEmpty: {
              message: 'Category ID is required',
            },
          },
        },
        leCompany: {
          validators: {
            notEmpty: {
              message: 'Company is required',
            },
          },
        },
        leDescription: {         
          validators: {
            notEmpty: {
              message: 'This Field is required',
            },
          },
        },
        leEmail: {
          validators: {
            notEmpty: {
              message: 'Email is required',
            },
          },
        },
        leWebsite: {
          validators: {
            notEmpty: {
              message: 'This Field is required',
            },
          },
        }, 
        leAssignedTo: {
          validators: {
            notEmpty: {
              message: 'This Field is required',
            },
          },
        }, 
        leSourceId: {
          validators: {
            notEmpty: {
              message: 'This Field is required',
            },
          },
        }, 
        leLastContact: {
          validators: {
            notEmpty: {
              message: 'This Field is required',
            },
          },
        }, 
        lePriority: {
          validators: {
            notEmpty: {
              message: 'This Field is required',
            },
          },
        }, 
        leDateConverted: {
          validators: {
            notEmpty: {
              message: 'This Field is required',
            },
          },
        }, 
        // leLost: {
        //   validators: {
        //     notEmpty: {
        //       message: 'This Field is required',
        //     },
        //   },
        // }, 
        leLastLeadStatus: {
          validators: {
            notEmpty: {
              message: 'This Field is required',
            },
          },
        }, 
        leLastStatusChange: {
          validators: {
            notEmpty: {
              message: 'This Field is required',
            },
          },
        }, 
        leAdAddress1: {
          validators: {
            notEmpty: {
              message: 'This Field is required',
            },
          },
        }, 
        leAdCity: {
          validators: {
            notEmpty: {
              message: 'This Field is required',
            },
          },
        }, 
        leAdState: {
          validators: {
            notEmpty: {
              message: 'This Field is required',
            },
          },
        }, 
        leAdCountry: {
          validators: {
            notEmpty: {
              message: 'This Field is required',
            },
          },
        }, 
        leAdPostalCode: {
          validators: {
            notEmpty: {
              message: 'This Field is required',
            },
          },
        }, 
        leCiType: {
          validators: {
            notEmpty: {
              message: 'This Field is required',
            },
          },
        }, 
        // leCiIsPublic: {
        //   validators: {
        //     notEmpty: {
        //       message: 'This Field is required',
        //     },
        //   },
        // }, 
        leSName: {
          validators: {
            notEmpty: {
              message: 'This Field is required',
            },
          },
        }, 
        leLsName: {
          validators: {
            notEmpty: {
              message: 'This Field is required',
            },
          },
        }, 
        leLsColour: {
          validators: {
            notEmpty: {
              message: 'This Field is required',
            },
          },
        }, 
        // leLsIsDefault: {
        //   validators: {
        //     notEmpty: {
        //       message: 'This Field is required',
        //     },
        //   },
        // }, 
        leLsNotes: {
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
        createLeadEntriesFormSubmitButton: new FormValidation.plugins.SubmitButton(),
        // Submit the form when all fields are valid
        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      },
    }).on('core.form.valid', function () {
        KTUtil.btnWait(createLeadEntriesFormSubmitButton, _buttonSpinnerClasses, 'Please wait');
        
        leLost.value = (leLost.value == 'on') ? true:false
        leLsIsDefault.value = (leLsIsDefault.value == 'on') ? true:false
        leCiIsPublic.value = (leCiIsPublic.value == 'on') ? true:false

        // Accessing Restful API
  
      axios({
        method: 'Post',
        url: `${HOST_URL}/api/v1/lead/Entries/`,
          data: {
            name: leName.value,
            title: leTitle.value,
            _categoryId:leCategoryId.value,
            company:leCompany.value,
            description:leDescription.value,
            email:leEmail.value,
            website:leWebsite.value,
            assignedTo:leAssignedTo.value,
            _sourceId:leSourceId.value,
            lastContact:leLastContact.value,
            priority:lePriority.value,
            dateConverted:leDateConverted.value,
            lost:leLost.value,
            lastLeadStatus:leLastLeadStatus.value,
            lastStatusChange:leLastStatusChange.value,

            address:{
              address1:leAdAddress1.value,
              street:leAdStreet.value,
              city:leAdCity.value,
              state:leAdState.value,
              country:leAdCountry.value,
              postalCode:leAdPostalCode.value,
            },
            
            contactInformation:{
              type:leCiType.value,
              isPublic:leCiIsPublic.value,
            },

            source:{
              name:leSName.value,
              
            },

            leadStatus:{
              name:leLsName.value,
              colour:leLsColour.value,
              isDefault:leLsIsDefault.value,
              notes:leLsNotes.value,}
        },
      }).then(function (res) {
        KTUtil.btnRelease(createLeadEntriesFormSubmitButton);
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

         
  return {
    // public functions
    init: function () {
        _createLeadResponse();
        _createLeadCategories();
        _createLeadEntries();
    }
  }
})();


jQuery(document).ready(function () {
    LeadsCRUD.init();
});
