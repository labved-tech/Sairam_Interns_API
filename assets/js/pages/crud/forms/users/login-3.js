/* eslint-disable */
'use strict';

// Class Definition
const KTLogin = (function () {
  const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';
  
  // DEPENDECIES
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

  const _handleFormSignin = function () {
    const form = KTUtil.getById('kt_login_singin_form');
    const formSubmitUrl = KTUtil.attr(form, 'action');
    const formSubmitButton = KTUtil.getById(
      'kt_login_singin_form_submit_button'
    );

    if (!form) {
      return;
    }

    FormValidation.formValidation(form, {
      fields: {
        username: {
          validators: {
            notEmpty: {
              message: 'Username is required',
            },
          },
        },
        password: {
          validators: {
            notEmpty: {
              message: 'Password is required',
            },
          },
        },
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        submitButton: new FormValidation.plugins.SubmitButton(),
        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
        bootstrap: new FormValidation.plugins.Bootstrap({
          //	eleInvalidClass: '', // Repace with uncomment to hide bootstrap validation icons
          //	eleValidClass: '',   // Repace with uncomment to hide bootstrap validation icons
        }),
      },
    })
      .on('core.form.valid', function () {
        // Show loading state on button
        KTUtil.btnWait(formSubmitButton, _buttonSpinnerClasses, 'Please wait');
        console.log(form.querySelector('[name="email"]').value, form.querySelector('[name="password"]').value,)
        
        axios({
          method: 'post',
          url: 'http://localhost:3000/api/v1/users/login',
          data: {
            email: form.querySelector('[name="email"]').value,
            password: form.querySelector('[name="password"]').value,
          },
        }).then(function (response) {
          // Return valid JSON
          // Release button
          KTUtil.btnRelease(formSubmitButton);
          console.log(response);

          if (response.data.status == 'success') {
            Swal.fire({
              text: response.data.message,
              icon: 'success',
              buttonsStyling: false,
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: 'btn font-weight-bold btn-light-primary',
              },
            }).then(function () {
              KTUtil.scrollTop();
            });
          } else {
            Swal.fire({
              text: response.data.message,
              icon: 'error',
              buttonsStyling: false,
              confirmButtonText: 'Retry',
              customClass: {
                confirmButton: 'btn font-weight-bold btn-light-primary',
              },
            }).then(function () {
              KTUtil.scrollTop();
            });
          }
        })
      })
      .on('core.form.invalid', function () {
        Swal.fire({
          text:
            'Sorry, looks like there are some errors detected, please try again.',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Ok, got it!',
          customClass: {
            confirmButton: 'btn font-weight-bold btn-light-primary',
          },
        }).then(function () {
          KTUtil.scrollTop();
        });
      });
  };

  const _handleFormForgot = function () {
    const form = KTUtil.getById('kt_login_forgot_form');
    const formSubmitUrl = KTUtil.attr(form, 'action');
    const formSubmitButton = KTUtil.getById(
      'kt_login_forgot_form_submit_button'
    );

    if (!form) {
      return;
    }

    FormValidation.formValidation(form, {
      fields: {
        email: {
          validators: {
            notEmpty: {
              message: 'Email is required',
            },
            emailAddress: {
              message: 'The value is not a valid email address',
            },
          },
        },
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        submitButton: new FormValidation.plugins.SubmitButton(),
        //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation
        bootstrap: new FormValidation.plugins.Bootstrap({
          //	eleInvalidClass: '', // Repace with uncomment to hide bootstrap validation icons
          //	eleValidClass: '',   // Repace with uncomment to hide bootstrap validation icons
        }),
      },
    })
      .on('core.form.valid', function () {
        // Show loading state on button
        KTUtil.btnWait(formSubmitButton, _buttonSpinnerClasses, 'Please wait');

        // Simulate Ajax request
        setTimeout(function () {
          KTUtil.btnRelease(formSubmitButton);
        }, 2000);
      })
      .on('core.form.invalid', function () {
        Swal.fire({
          text:
            'Sorry, looks like there are some errors detected, please try again.',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Ok, got it!',
          customClass: {
            confirmButton: 'btn font-weight-bold btn-light-primary',
          },
        }).then(function () {
          KTUtil.scrollTop();
        });
      });
  };

  const _handleFormSignup = function () {
   
    // Date picker
    $('#kt_datepicker_2, #kt_datepicker_2_validate').datepicker({
      rtl: KTUtil.isRTL(),
      todayHighlight: true,
      orientation: 'bottom left',
      templates: arrows,
      });

      var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });

            cb(matches);
        };
    };

    // constructs the suggestion engine
    var countries = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      // url points to a json file that contains an array of country names, see
      // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
      prefetch: HOST_URL + '/data/countries.json'
  });

  // passing in `null` for the `options` arguments will result in the default
  // options being used
  $('#kt_typeahead_3').typeahead(null, {
      name: 'countries',
      source: countries
  });

   // Base elements
   const wizardEl = KTUtil.getById('kt_login');
   const form = KTUtil.getById('kt_login_signup_form');
   let wizardObj;
   const validations = [];

   if (!form) {
     return;
   }

   // Initialize form wizard
   wizardObj = new KTWizard(wizardEl, {
     startStep: 1, // initial active step number
     clickableSteps: false, // to make steps clickable this set value true and add data-wizard-clickable="true" in HTML for class="wizard" element
   });

   // Validation before going to next page
   wizardObj.on('beforeNext', function (wizard) {
     validations[wizard.getStep() - 1].validate().then(function (status) {
       if (status == 'Valid') {
         wizardObj.goNext();
         KTUtil.scrollTop();
       } else {
         Swal.fire({
           text:
             'Sorry, looks like there are some errors detected, please try again.',
           icon: 'error',
           buttonsStyling: false,
           confirmButtonText: 'Ok, got it!',
           customClass: {
             confirmButton: 'btn font-weight-bold btn-light-primary',
           },
         }).then(function () {
           KTUtil.scrollTop();
         });
       }
     });

     wizardObj.stop(); // Don't go to the next step
   });

      

    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    // Step 1
    validations.push(
      FormValidation.formValidation(form, {
        fields: {
          fname: {
            validators: {
              notEmpty: {
                message: 'First name is required',
              },
            },
          },
          lname: {
            validators: {
              notEmpty: {
                message: 'Last Name is required',
              },
            },
          },
          phone: {
            validators: {
              notEmpty: {
                message: 'Phone is required',
              },
            },
          },
          email: {
            validators: {
              notEmpty: {
                message: 'Email is required',
              },
              emailAddress: {
                message: 'The value is not a valid email address',
              },
            },
          },
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
        },
      })
    );

    // Step 2
    validations.push(
      FormValidation.formValidation(form, {
        fields: {
          address1: {
            validators: {
              notEmpty: {
                message: 'Address is required',
              },
            },
          },
          postcode: {
            validators: {
              notEmpty: {
                message: 'Postcode is required',
              },
            },
          },
          city: {
            validators: {
              notEmpty: {
                message: 'City is required',
              },
            },
          },
          state: {
            validators: {
              notEmpty: {
                message: 'State is required',
              },
            },
          },
          country: {
            validators: {
              notEmpty: {
                message: 'Country is required',
              },
            },
          },
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
        },
      })
    );

    // Step 3
    validations.push(
      FormValidation.formValidation(form, {
        fields: {
          delivery: {
            validators: {
              notEmpty: {
                message: 'Delivery type is required',
              },
            },
          },
          packaging: {
            validators: {
              notEmpty: {
                message: 'Packaging type is required',
              },
            },
          },
          preferreddelivery: {
            validators: {
              notEmpty: {
                message: 'Preferred delivery window is required',
              },
            },
          },
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
        },
      })
    );

    // Step 4
    validations.push(
      FormValidation.formValidation(form, {
        fields: {
          ccname: {
            validators: {
              notEmpty: {
                message: 'Credit card name is required',
              },
            },
          },
          ccnumber: {
            validators: {
              notEmpty: {
                message: 'Credit card number is required',
              },
              creditCard: {
                message: 'The credit card number is not valid',
              },
            },
          },
          ccmonth: {
            validators: {
              notEmpty: {
                message: 'Credit card month is required',
              },
            },
          },
          ccyear: {
            validators: {
              notEmpty: {
                message: 'Credit card year is required',
              },
            },
          },
          cccvv: {
            validators: {
              notEmpty: {
                message: 'Credit card CVV is required',
              },
              digits: {
                message: 'The CVV value is not valid. Only numbers is allowed',
              },
            },
          },
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
        },
      })
    );



    // Change event
    wizardObj.on('change', function (wizard) {
      KTUtil.scrollTop();
    });
  };

  // Public Functions
  return {
    init: function () {
      _handleFormSignin();
      _handleFormForgot();
      _handleFormSignup();
    },
  };
})();

// Class Initialization
 jQuery(document).ready(function () {
  console.log('All assets are loaded');

  KTLogin.init();
 });


