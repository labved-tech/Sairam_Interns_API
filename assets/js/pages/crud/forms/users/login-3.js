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
    $('#dob, #dob_validate').datepicker({
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
    const form = KTUtil.getById('kt_login_signup_form');
    const formSubmitButton = KTUtil.getById('kt_login_signup_form_submit_button');  
    const name = KTUtil.getById('name');
    const email = KTUtil.getById('email');
    const username = KTUtil.getById('username');
    const password = KTUtil.getById('password');
    const passwordConfirm = KTUtil.getById('passwordConfirm');   
    const mobileNo = KTUtil.getById('mobileNo');   
    const dob = KTUtil.getById('dob');   

   if (!form) {
     return;
    }
    
    
    FormValidation.formValidation(form, {
      fields: {
        name: {
          validators: {
            notEmpty: {
              message: 'Name is required',
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
        passwordConfirm: {
          validators: {
            notEmpty: {
              message: 'Confirm password is required',
            },
          },
        },
        mobileNo: {
          validators: {
            notEmpty: {
              message: 'Mobile Number is required',
            },
          },
        },
        dob: {
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
          name : name.value,
          email : email.value,
          username : username.value,
          password : password.value,
          passwordConfirm: passwordConfirm.value,
          mobileNo: mobileNo.value,
          dob: dob.value
        },
      }).then(function (res) {
        KTUtil.btnRelease(formSubmitButton);
        console.log(res);
        if (res.data.status == 'success') {
          Swal.fire({
            title: 'Success',
            text: res.data.message,
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'btn font-weight-bold btn-light-primary',
            },
            window.location.replace(`${HOST_URL}/overview`);

          })
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


