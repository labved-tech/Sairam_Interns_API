/* eslint-disable */
'use strict';

/* Class definition */
const Announcement = (function () {
    const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';

     /*   Private functions */
     const _createAnnouncementEntriesForm = function () {

        // Getting Document related information
        const form = KTUtil.getById('createAnnouncementEntriesForm');
        const formSubmitButton = KTUtil.getById('announcementEntriesFormSubmit');
        const demoText = KTUtil.getById('aeTitle');
        const demoEditor = KTUtil.getById('demoEditor');
        const aeFrom = KTUtil.getById('aeFrom');
        const aeIsEmailReq = KTUtil.getById('aeIsEmailReq');
        const aePriority = KTUtil.getById('aePriority');
         const aeExpires = KTUtil.getById('aeExpires');

         // Initializing 
         $('#demoEditor').summernote({
            height: 400,
            tabsize: 2
         });
         
         $('#aeExpires').select2({
          placeholder: "Select"
          });

         if (!form) {
            return;
          }
      
          FormValidation.formValidation(form, {
             fields: {
              demoText: {
                validators: {
                  notEmpty: {
                    message: 'This is field is mandatory',
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
              submitButton: new FormValidation.plugins.SubmitButton(),
              // Submit the form when all fields are valid
              //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            },
          })
            .on('core.form.valid', function () {
            // Show loading state on button
              KTUtil.btnWait(formSubmitButton, _buttonSpinnerClasses, 'Please wait');
              console.log(`Value:${demoText.value}`);
      
      
            // Accessing Restful API
            axios({
              method: 'post',
              url: `${HOST_URL}/api/v1/example`,
              data: {
                text: demoText.value,
              },
      
            }).then(function (res) {
              // Return valid JSON
              // Release button
              KTUtil.btnRelease(formSubmitButton);
              console.log(res);
              
              // SWAL EXAMPLE
              /*         if (res.data.status == 'success') {
                  Swal.fire({
                    title: 'Success',
                    text: res.data.message,
                    icon: 'success',
                    buttonsStyling: false,
                    showCancelButton: true,
                    confirmButtonText: 'OK',
                    cancelButtonText : 'Cancel',
                    customClass: {
                      confirmButton: 'btn font-weight-bold btn-light-primary',
                      cancelButton : 'btn font-weight-bold btn-light-primary',
                    },
                  }).then(function (result) {
                    console.log(result);
                    if (result.value) {
                      Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: `Your file has been deleted`,
                        confirmButtonText: 'OK',
                      })
                    } else if (result.isDismissed === true) {
        
                      Swal.fire({
                        title: 'Cancelled',
                        icon: 'error',
                        text: `Your imaginary file is safe :)`,
                        confirmButtonText: 'OK',
                      })
                    }
        
                  })
                } */
      
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
                "timeOut": "3000",
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
                _createAnnouncementEntriesForm();
            },
          };
})();
        
jQuery(document).ready(function () {
    Announcement.init();
  });