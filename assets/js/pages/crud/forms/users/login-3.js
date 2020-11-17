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

    // Dependencies

    // Getting Document related information
    const form = KTUtil.getById('loginForm');
    const formSubmitButton = KTUtil.getById('loginSubmitButton');  
    const loginEmail = KTUtil.getById('loginEmail');
    const loginPassword = KTUtil.getById('loginPassword');

    if (!form) {
      return;
    }

    FormValidation.formValidation(form, {
      fields: {
        loginEmail: {
          validators: {
            notEmpty: {
              message: 'Username is required',
            },
          },
        },
        loginPassword: {
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
        
        axios({
          method: 'post',
          url: 'http://localhost:3000/api/v1/users/login',
          data: {
            email: loginEmail.value,
            password: loginPassword.value,
          },
        }).then(function (res) {
          // Return valid JSON
          // Release button
          KTUtil.btnRelease(formSubmitButton);
          console.log(res);

          if (res.data.status == 'success') {
              window.location.replace(HOST_URL + `/overview`);
          } else if (res.data.status == 'error') {
            Swal.fire({
              text: res.data.message,
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
    
    // Dependencies
   
    // Date picker
    $('#signUpDob, #signUpDob').datepicker({
      rtl: KTUtil.isRTL(),
      todayHighlight: true,
      orientation: 'bottom left',
      templates: arrows,
      });

/*       var substringMatcher = function(strs) {
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
  }); */
    
    // Getting Document related information
    const form = KTUtil.getById('signUpForm');
    const formSubmitButton = KTUtil.getById('signUpSubmitButton');  
    const signUpName = KTUtil.getById('signUpName');
    const signUpEmail = KTUtil.getById('signUpEmail');
    const signUpUsername = KTUtil.getById('signUpUsername');
    const signUpPassword = KTUtil.getById('signUpPassword');
    const signUpPasswordConfirm = KTUtil.getById('signUpPasswordConfirm');   
    const signUpMobileNo = KTUtil.getById('signUpMobileNo');   
    const signUpDob = KTUtil.getById('signUpDob');   

   if (!form) {
     return;
    }
    
    
    FormValidation.formValidation(form, {
      fields: {
        signUpName: {
          validators: {
            notEmpty: {
              message: 'Name is required',
            },
          },
        },
        signUpEmail: {
          validators: {
            notEmpty: {
              message: 'Email is required',
            },
            emailAddress: {
              message: 'The value is not a valid email address',
            },
          },
        },
        signUpUsername: {
          validators: {
            notEmpty: {
              message: 'Username is required',
            },
          },
        },
        signUpPassword: {
          validators: {
            notEmpty: {
              message: 'Password is required',
            },
          },
        },
        signUpPasswordConfirm: {
          validators: {
            notEmpty: {
              message: 'Confirm password is required',
            },
          },
        },
        signUpMobileNo: {
          validators: {
            notEmpty: {
              message: 'Mobile Number is required',
            },
          },
        },
        signUpDob: {
          validators: {
            notEmpty: {
              message: 'Date of birth is required',
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
    }).on('core.form.valid', function () {
      // Show loading state on button
      KTUtil.btnWait(formSubmitButton, _buttonSpinnerClasses, 'Please wait');

      // Accessing Restful API
      axios({
        method: 'post',
        url: `${HOST_URL}/api/v1/users/signup`,
        data: {
          name : signUpName.value,
          email : signUpEmail.value,
          username : signUpUsername.value,
          password : signUpPassword.value,
          passwordConfirm: signUpPasswordConfirm.value,
          mobileNo: signUpMobileNo.value,
          dob: signUpDob.value
        },
      }).then(function (res) {
        KTUtil.btnRelease(formSubmitButton);
        console.log(res);
        if (res.data.status == 'success') {
          window.location.replace(HOST_URL + `/overview`);
        } else if (res.data.status == 'error')
        {
          Swal.fire({
            title: 'error',
            text: res.data.message,
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'btn font-weight-bold btn-light-primary',
            },
          })
        }
      })

     }).on('core.form.invalid', function () { });
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


