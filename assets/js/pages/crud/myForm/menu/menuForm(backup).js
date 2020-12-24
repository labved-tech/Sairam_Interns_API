var isLoading = false;
var fv;

var apiURL = apiOptions.url;
var apiMethod = apiOptions.method;
var apiButton = apiOptions.button;

if (!isLoading) {
    console.log('Inside Loading')
    isLoading = true;

    // Getting Document related information
    const menuSectionForm = document.querySelector('#menuSectionForm');
    const FormSubmitButton = document.querySelector('#'+apiButton);
    const menuManagerSelect = document.querySelector('#menuManagerSelect');
    const menuSectionName = document.querySelector('#menuSectionName');
    const menuSectionDescription = document.querySelector('#menuSectionDescription');
    const menuSectionPriority = document.querySelector('#menuSectionPriority');

    // initialize
    // menuManagerSelect - Dropdown List : Single Select2
    $('#menuManagerSelect').select2({
        ajax: {
            url: `${HOST_URL}/api/v1/menu/manager/popSel2`,
            dataType: 'json',
            processResults: function (data) {
                return {
                results: data.manager
                };
            }
        },
    });

    // menuSectionPriority - Number : Number Controls Same Sides
    $('#menuSectionPriority').TouchSpin({
        buttondown_class: 'btn btn-secondary',
        buttonup_class: 'btn btn-secondary',
        verticalbuttons: true,
        verticalup: '<i class="ki ki-plus"></i>',
        verticaldown: '<i class="ki ki-minus"></i>',

        min: 1,
        max: 1000,
        step: 1,
    });

    // Return Form
    if (!menuSectionForm) {
    return;
    }

    // Validation
    fv = FormValidation.formValidation(menuSectionForm, {
        fields: {
            menuManagerSelect: {
                validators: {
                    notEmpty: {
                        message: 'Manager is required',
                    },
                },
            },
            menuSectionName: {
                validators: {
                    notEmpty: {
                        message: 'Name cannot be empty',
                    },
                },
            },
            menuSectionDescription: {
                validators: {
                    notEmpty: {
                        message: 'Description cannot be empty',
                    },
                },
            },
            menuSectionPriority: {
                validators: {
                    notEmpty: {
                        message: 'This field is required',
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
            FormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
    });
            
    // validation successful
    fv.on('core.form.valid', async function () {
        // console.log(isLoading);
        // console.log(apiMethod);
        // console.log(apiURL);

                
            // Show loading state on button
            KTUtil.btnWait(FormSubmitButton, _buttonSpinnerClasses, 'Please wait');

            // Accessing Restful API
            await axios({
                method: apiMethod,
                url: apiURL,
                data: {
                    manager: document.querySelector('#menuManagerSelect').value,
                    name: document.querySelector('#menuSectionName').value,
                    description: document.querySelector('#menuSectionDescription').value,
                    priority: document.querySelector('#menuSectionPriority').value,
                },
            }).then(function (res) {
            
                // Return valid JSON
                // console.log(res);

                // Release button
                KTUtil.btnRelease(FormSubmitButton);

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
                    // reseting & clearing
                    $('#exampleModal').modal('hide')  // hiding modal form
                    toastr.success(`${res.data.message}`, `${res.data.status}`); // show sucess toastr
                    $('#kt_datatable_2').KTDatatable().reload(); // reload table
                    isLoading = false;

                }
                else if (res.data.status == 'error') {
                    $('#exampleModal').modal('hide')  // hiding modal form
                    toastr.error(`${res.data.message}`, `${res.data.status}`)
                    isLoading = false;

                }
                else {
                    $('#exampleModal').modal('hide')
                    isLoading = false;
                };
                
            });
    
        // return isLoading;
    });

    // validation failed
    fv.on('core.form.invalid', function () {
                console.log('Something went wrong!!');
    });

}