/* eslint-disable */
'use strict';

/* Class definition */
const FormControls = (function () {
  const _buttonSpinnerClasses = 'spinner spinner-right spinner-white pr-15';
  const states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  /* Dependencies */

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

  /*   Private functions */
  const _Demo1 = function () {

    // Getting Document related information
    const form = KTUtil.getById('demoForm');
    const formSubmitButton = KTUtil.getById('demoSubmitButton');

    // Textbox
    const demoText = KTUtil.getById('demoText');          // Text 
    const demoPassword = KTUtil.getById('demoPassword');  // Password 
    const demoTextarea = KTUtil.getById('demoTextarea');  // Textarea 

    // TypeAhead
    const demoTypeaheadBasic = KTUtil.getById('demoTypeaheadBasic');  // Typeahead : Basic Demo
    const demoTypeaheadRemote = KTUtil.getById('demoTypeaheadRemote'); // Typeahead : Remote Data (Suggestion Engine)
    const demoTypeaheadPrefetch = KTUtil.getById('demoTypeaheadPrefetch'); // Typeahead : Prefetch Data
    const demoTypeaheadCustomTemplate = KTUtil.getById('demoTypeaheadCustomTemplate'); // Typeahead : Custom Templates 
    const demoTypeaheadMultipleDatasets = KTUtil.getById('demoTypeaheadMultipleDatasets'); // Typeahead : Multiple Datasets 

    // Form Repeat
    // Numbers
    const demoNumberCtrlTwoSides = KTUtil.getById('demoNumberCtrlTwoSides');  // Number : Number Controls Two Sides
    const demoNumberCtrlSameSides = KTUtil.getById('demoNumberCtrlSameSides');  // Number : Number Controls Same Sides
    const demoNumberHSliderText = KTUtil.getById('demoNumberHSliderText');  // Number : Horizontal Slide
    const demoNumberHSlider = KTUtil.getById('demoNumberHSlider');  // Number : Horizontal Slide
    const demoNumberVSliderText = KTUtil.getById('demoNumberVSliderText');  // Number : Vertical Slide
    const demoNumberVSlider = KTUtil.getById('demoNumberVSlider');  // Number : Vertical Slide
    const demoNumberCurrencySliderText = KTUtil.getById('demoNumberCurrencySliderText');  // Number : Currency Slide
    const demoNumberCurrencySlider = KTUtil.getById('demoNumberCurrencySlider');  // Number : Currency Slide
    const demoNumberRangeSelectSliderText1 = KTUtil.getById('demoNumberRangeSelectSliderText1'); // Number : Range Select Slide
    const demoNumberRangeSelectSliderText2 = KTUtil.getById('demoNumberRangeSelectSliderText2'); // Number : Range Select Slide
    const demoNumberRangeSelectSlider = KTUtil.getById('demoNumberRangeSelectSlider'); // Number : Range Select Slide


    
    // Date And Clock
    const demoDateTime = KTUtil.getById('demoDateTime');  // Date & Time : Date and Time
    const demoDateTimeRangePicker1 = KTUtil.getById('demoDateTimeRangePicker1');  // Date & Time : Date and Time Range Picker1

    const demoDateTimeLinkedPicker1 = KTUtil.getById('demoDateTimeLinkedPicker1');  // Date & Time : Date and Time Range Linked Picker
    const demoDateTimeLinkedPicker2 = KTUtil.getById('demoDateTimeLinkedPicker2');  // Date & Time : Date and Time Range Linked Picker
    const demoDate = KTUtil.getById('demoDate');  // Date & Time : Date
    const demoDateRangePicker1 = KTUtil.getById('demoDateRangePicker1');  // Date & Time : Date Range Picker1
    const demoDateRangePicker2 = KTUtil.getById('demoDateRangePicker2');  // Date & Time : Date Range Picker2

    // Lists
    // Others

    if (!form) {
      return;
    }




    /* Dependencies */
    // Typeahead : Basic Demo
    const substringMatcher = function (strs) {
      return function findMatches(q, cb) {
        let matches;
        let substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function (i, str) {
          if (substrRegex.test(str)) {
            matches.push(str);
          }
        });

        cb(matches);
      };
    };

    $('#demoTypeaheadBasic, #demoTypeaheadBasic_modal').typeahead(
      {
        hint: true,
        highlight: true,
        minLength: 1,
      },
      {
        name: 'states',
        source: substringMatcher(states),
      }
    );

    // Typeahead : Remote Data (Suggestion Engine)
    // constructs the suggestion engine
    const bloodhound = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      // `states` is an array of state names defined in \"The Basics\"
      local: states,
    });

    $('#demoTypeaheadRemote, #demoTypeaheadRemote_modal').typeahead(
      {
        hint: true,
        highlight: true,
        minLength: 1,
      },
      {
        name: 'states',
        source: bloodhound,
      }
    );


    // Typeahead : Prefetch Data
    const countries = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.whitespace,
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      // url points to a json file that contains an array of country names, see
      // https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
      prefetch: `${HOST_URL}/api/?file=typeahead/countries.json`,
    });

    // passing in `null` for the `options` arguments will result in the default
    // options being used
    $('#demoTypeaheadPrefetch, #demoTypeaheadPrefetch_modal').typeahead(null, {
      name: 'countries',
      source: countries,
    });

    // Typeahead : Custom Templates 
    const bestPictures = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: `${HOST_URL}/api/?file=typeahead/movies.json`,
    });

    $('#demoTypeaheadCustomTemplate').typeahead(null, {
      name: 'best-pictures',
      display: 'value',
      source: bestPictures,
      templates: {
        empty: [
          '<div class="empty-message" style="padding: 10px 15px; text-align: center;">',
          'unable to find any Best Picture winners that match the current query',
          '</div>',
        ].join('\n'),
        suggestion: Handlebars.compile(
          '<div><strong>{{value}}</strong> – {{year}}</div>'
        ),
      },
    });
    
    // Typeahead : Multiple Datasets 
    const nbaTeams = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('team'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: `${HOST_URL}/api/?file=typeahead/nba.json`,
    });

    const nhlTeams = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('team'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: `${HOST_URL}/api/?file=typeahead/nhl.json`,
    });

    $('#demoTypeaheadMultipleDatasets').typeahead(
      {
        highlight: true,
      },
      {
        name: 'nba-teams',
        display: 'team',
        source: nbaTeams,
        templates: {
          header:
            '<h3 class="league-name" style="padding: 5px 15px; font-size: 1.2rem; margin:0;">NBA Teams</h3>',
        },
      },
      {
        name: 'nhl-teams',
        display: 'team',
        source: nhlTeams,
        templates: {
          header:
            '<h3 class="league-name" style="padding: 5px 15px; font-size: 1.2rem; margin:0;">NHL Teams</h3>',
        },
      }
    );
  
  
    // Date Picker Initialize
    $('#demoDateTime').datetimepicker({
      rtl: KTUtil.isRTL(),
      todayHighlight: true,
      orientation: 'bottom left',
      templates: arrows,
    });

    // Date & Time : Date and Time Range Picker1
    $('#demoDateTimeRangePicker1').daterangepicker(
      {
        buttonClasses: ' btn',
        applyClass: 'btn-primary',
        cancelClass: 'btn-secondary',

        timePicker: true,
        timePickerIncrement: 30,
        locale: {
          format: 'MM/DD/YYYY h:mm A',
        },
      },
      function (start, end, label) {
        $('#demoDateTimeRangePicker1 .form-control').val(
          `${start.format('MM/DD/YYYY h:mm A')} / ${end.format(
            'MM/DD/YYYY h:mm A'
          )}`
        );
      }
    );
    
    // Date & Time : Date and Time Linked
    $('#demoDateTimeLinkedPicker1').datetimepicker();
    $('#demoDateTimeLinkedPicker2').datetimepicker({
      useCurrent: false,
    });

    $('#demoDateTimeLinkedPicker1').on('change.datetimepicker', function (e) {
      $('#demoDateTimeLinkedPicker2').datetimepicker('minDate', e.date);
    });
    $('#demoDateTimeLinkedPicker2').on('change.datetimepicker', function (e) {
      $('#demoDateTimeLinkedPicker1').datetimepicker('maxDate', e.date);
    });

    // Date & Time : Date
    $('#demoDate, #demoDate_validate').datepicker({
      rtl: KTUtil.isRTL(),
      todayBtn: 'linked',
      clearBtn: true,
      todayHighlight: true,
      orientation: 'bottom left',
      templates: arrows,
    });

    // Date & Time : Date Range Picker1
    // input group and left alignment setup
    $('#demoDateRangePicker1').daterangepicker(
      {
        buttonClasses: ' btn',
        applyClass: 'btn-primary',
        cancelClass: 'btn-secondary',
      },
      function (start, end, label) {
        $('#demoDateRangePicker1 .form-control').val(
          `${start.format('MM/DD/YYYY')} - ${end.format('MM/DD/YYYY')}`
        );
      }
    );

    // Date & Time : Date Range Picker2
    $('#demoDateRangePicker2').datepicker({
      rtl: KTUtil.isRTL(),
      todayHighlight: true,
      templates: arrows,
    });

    // Number : Number Controls Two Sides
    $('#demoNumberCtrlTwoSides').TouchSpin({
			buttondown_class: 'btn btn-secondary',
			buttonup_class: 'btn btn-secondary',

			min: -1000000000,
			max: 1000000000,
			step: 1,
			decimals: 2,
			boostat: 5,
      maxboostedstep: 10,
      prefix: '$'
    });
    
    // Number : Number Controls Same Sides
    $('#demoNumberCtrlSameSides').TouchSpin({
			buttondown_class: 'btn btn-secondary',
			buttonup_class: 'btn btn-secondary',
			verticalbuttons: true,
			verticalup: '<i class="ki ki-plus"></i>',
      verticaldown: '<i class="ki ki-minus"></i>',
      
      min: -1000000000,
			max: 1000000000,
			step: 1,
			decimals: 2,
			boostat: 5,
      maxboostedstep: 10,
      prefix: '$'
    });
    
    // Number : Horizontal Slide
    // init slider
    var slider = document.getElementById('demoNumberHSlider');

    noUiSlider.create(slider, {
      start: [ 0 ],
      step: 1,
      range: {
        'min': [ -1000000000 ],
        'max': [ 1000000000 ]
      },
      format: wNumb({
        decimals: 0
      })
    });

    // init slider input
    var sliderInput = document.getElementById('demoNumberHSliderText');

    slider.noUiSlider.on('update', function( values, handle ) {
      sliderInput.value = values[handle];
    });

    sliderInput.addEventListener('change', function(){
      slider.noUiSlider.set(this.value);
    });

    // Number : Vertical Slide
    // init slider
    var verticalSlider = document.getElementById('demoNumberVSlider');

    noUiSlider.create(verticalSlider, {
      start: 40,
      orientation: 'vertical',
      range: {
        'min': 0,
        'max': 100
      }
    });

    // init slider input
    var sliderInput = document.getElementById('demoNumberVSliderText');

    verticalSlider.noUiSlider.on('update', function( values, handle ) {
      sliderInput.value = values[handle];
    });

    sliderInput.addEventListener('change', function(){
      verticalSlider.noUiSlider.set(this.value);
    });

    // Number : Currency Slide
    // init slider
		var slider = document.getElementById('demoNumberCurrencySlider');

		noUiSlider.create(slider, {
			start: [ 20000 ],
			connect: [true, false],
			step: 1000,
			range: {
				'min': [ 20000 ],
				'max': [ 80000 ]
			},
			format: wNumb({
				decimals: 3,
				thousand: '.',
				postfix: ' (US $)',
			})
		});

		// init slider input
		var sliderInput = document.getElementById('demoNumberCurrencySliderText');

		slider.noUiSlider.on('update', function( values, handle ) {
			sliderInput.value = values[handle];
		});

		sliderInput.addEventListener('change', function(){
			slider.noUiSlider.set(this.value);
		});
    
    // Number : Range Select Slide
    // init slider
		var slider = document.getElementById('demoNumberRangeSelectSlider');

		noUiSlider.create(slider, {
			start: [20, 80],
			connect: true,
			direction: 'rtl',
			tooltips: [true, wNumb({ decimals: 1 })],
			range: {
				'min': [0],
				'10%': [10, 10],
				'50%': [80, 50],
				'80%': 150,
				'max': 200
			}
		});


		// init slider input
		var sliderInput0 = document.getElementById('demoNumberRangeSelectSliderText1');
		var sliderInput1 = document.getElementById('demoNumberRangeSelectSliderText2');
		var sliderInputs = [sliderInput1, sliderInput0];

		slider.noUiSlider.on('update', function( values, handle ) {
			sliderInputs[handle].value = values[handle];
		});
    
    
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
      KTUtil.btnWait(formSubmitButton, _buttonSpinnerClasses, 'Please wait');

      // Accessing Restful API
      axios({
        method: 'post',
        url: `${HOST_URL}/api/v1/example`,
        data: {
          
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

    }).on('core.form.invalid', function () { });

  };

  return {
    // public functions
    init: function () {
      _Demo1();
    },
  };
})();

jQuery(document).ready(function () {
  FormControls.init();
});
