/* eslint-disable */
'use strict';

/* Class definition */
const DeviceManagementCRUD = function () {

    const _createDeviceForm = function () {

        if($('#kt_repeater_1').length)
        {
            console.log('Inside if loop')
            var reportRepeater = $('#kt_repeater_1').repeater({
                initEmpty: false,
                isFirstItemUndeletable: true,

                // defaultValues: {
                //     'textarea-input': 'foo',
                //     'text-input': 'bar',
                // },

                ready: function () {
                    $('.select2').select2({
                        placeholder: "Select an option...",
                        allowClear: true,
                    });

                },
                show: function () {
                    $(this).slideDown();
                    $('.select2').select2({
                        placeholder: "Select an option...",
                        allowClear: true,
                    });
                },
                hide: function (deleteElement) {
                    if(confirm('Are you sure you want to delete this?')) {
                        $(this).slideUp(deleteElement);
                    }
                }

            });
        }

        $('#demoForm').on('submit', function (e) {
            e.preventDefault();
            console.log('btnSubmit is clicked');

            console.log($(this).serialize());
            
            $('#kt_repeater_1').repeater();
            const repVal = $('#kt_repeater_1').repeaterVal();
            console.log(repVal)

            // Reset
            $('#demoForm')[0].reset();
            // $('#kt_repeater_1').createRepeater();
        });
    };

    return {
        // public functions
        init: function () {
            _createDeviceForm();
        },
      };
}();
    
jQuery(document).ready(function () {
    DeviceManagementCRUD.init();
});