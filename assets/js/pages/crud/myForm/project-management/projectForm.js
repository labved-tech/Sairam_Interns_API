/* eslint-disable */
'use strict';

// Class definition
const ProjectCRUD = (function () {
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
    const _createProjectDiscussionsForm = function () {
        // Getting Document related information
        const createProjectDiscussionsForm = KTUtil.getById('createProjectDiscussionsForm');
        const DiscussionFormSubmitButton = KTUtil.getById('DiscussionFormSubmitButton');
        const pdID = KTUtil.getById('pdID');
        const pdSubject = KTUtil.getById('pdSubject');
        const pdDescription = KTUtil.getById('pdDescription');
        const pdDateCreated = KTUtil.getById('pdDateCreated');
        const pdLastActivity = KTUtil.getById('pdLastActivity');
        const pdStartedBy = KTUtil.getById('pdStartedBy');

    // Date & Time : Date Created
    $('#pdDateCreated' ).datepicker({
        rtl: KTUtil.isRTL(),
        todayBtn: 'linked',
        clearBtn: true,
        todayHighlight: true,
        orientation: 'bottom left',
        templates: arrows,
      });
    // Date & Time : Last Activity
    $('#pdLastActivity').datepicker({
        rtl: KTUtil.isRTL(),
        todayBtn: 'linked',
        clearBtn: true,
        todayHighlight: true,
        orientation: 'bottom left',
        templates: arrows,
      });
      if (!createProjectDiscussionsForm) {
        return;
    }

    FormValidation.formValidation(createProjectDiscussionsForm, {
        fields: {
            pdID: {
                validators: {
                    notEmpty: {
                        message: 'Project ID is required',
                    },
                },
            },
            pdSubject: {
                validators: {
                    notEmpty: {
                        message: 'Subject is required',
                    },
                },
            },
            pdDescription: {
                validators: {
                    notEmpty: {
                        message: 'Description is required',
                    },
                },
            },
            pdDateCreated: {
                validators: {
                    notEmpty: {
                        message: 'Date Created is required',
                    },
                },
            },
            pdLastActivity: {
                validators: {
                    notEmpty: {
                        message: 'Last Activity is required',
                    },
                },
            },
            pdStartedBy: {
                validators: {
                    notEmpty: {
                        message: 'Started By is required',
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
            DiscussionFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
    })
        .on('core.form.valid', function () {
            KTUtil.btnWait(DiscussionFormSubmitButton, _buttonSpinnerClasses, 'Please wait');


            // Accessing Restful API
            axios({
                method: 'post',
                url: `${HOST_URL}/api/v1/project/discussions`,
                data: {
                    // _projectId: pdID.value,
                    subject: pdSubject.value,
                    description: pdDescription.value,
                    datecreated: pdDateCreated.value,
                    lastActivity: pdLastActivity.value,
                    startedBy: pdStartedBy.value,    
                },
            }).then(function (res) {
                KTUtil.btnRelease(DiscussionFormSubmitButton);
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
    const _createProjectMembersForm = function () {
        // Getting Document related information
        const createProjectMembersForm = KTUtil.getById('createProjectMembersForm');
        const MembersFormSubmitButton = KTUtil.getById('MembersFormSubmitButton');
        const pmID = KTUtil.getById('pmID');
        const pmUserID = KTUtil.getById('pmUserID');
        const pmStatus = KTUtil.getById('pmStatus');

    // Dropdown List : Single Select1 With Search
    $('pmStatus').selectpicker({
    });

    if (!createProjectMembersForm) {
        return;
    }

    FormValidation.formValidation(createProjectMembersForm, {
        fields: {
            pmID: {
                validators: {
                    notEmpty: {
                        message: 'Project ID is required',
                    },
                },
            },
            pmUserID: {
                validators: {
                    notEmpty: {
                        message: 'User ID is required',
                    },
                },
            },
            pmStatus: {
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
            MembersFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
    })
        .on('core.form.valid', function () {
            KTUtil.btnWait(MembersFormSubmitButton, _buttonSpinnerClasses, 'Please wait');


            // Accessing Restful API
            axios({
                method: 'post',
                url: `${HOST_URL}/api/v1/project/members`,
                data: {
                    // _projectId: pmID.value,
                    // _userId: pmUserID.value,
                    status: pmStatus.value,
                },
            }).then(function (res) {
                KTUtil.btnRelease(MembersFormSubmitButton);
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
    const _createProjectTaskRemindersForm = function (){
        // Getting Document related information
        const createProjectTaskRemindersForm = KTUtil.getById('createProjectTaskRemindersForm');
        const TaskRemindersFormSubmitButton = KTUtil.getById('TaskRemindersFormSubmitButton');
        const ptrDescription = KTUtil.getById('ptrDescription');
        const ptrDate = KTUtil.getById('ptrDate');
        const ptrIsNotified = KTUtil.getById('ptrIsNotified');
        const taskID = KTUtil.getById('taskID');
        const ptrNotifyByEmail = KTUtil.getById('ptrNotifyByEmail');
        const ptrCreator = KTUtil.getById('ptrCreator');

    // Date & Time : Date Created
    $('#ptrDate' ).datepicker({
        rtl: KTUtil.isRTL(),
        todayBtn: 'linked',
        clearBtn: true,
        todayHighlight: true,
        orientation: 'bottom left',
        templates: arrows,
      });
      if (!createProjectTaskRemindersForm) {
        return;
    }

    FormValidation.formValidation(createProjectTaskRemindersForm, {
        fields: {
            ptrDescription: {
                validators: {
                    notEmpty: {
                        message: 'Description is required',
                    },
                },
            },
            ptrDate: {
                validators: {
                    notEmpty: {
                        message: 'Date is required',
                    },
                },
            },
            ptrIsNotified: {
                validators: {
                    notEmpty: {
                        message: 'Is Notified is required',
                    },
                },
            },
            taskID: {
                validators: {
                    notEmpty: {
                        message: 'Task ID is required',
                    },
                },
            },
            ptrNotifyByEmail: {
                validators: {
                    notEmpty: {
                        message: 'Notify By Email is required',
                    },
                },
            },
            ptrCreator: {
                validators: {
                    notEmpty: {
                        message: 'Creator is required',
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
            TaskRemindersFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
    })
        .on('core.form.valid', function () {
            KTUtil.btnWait(TaskRemindersFormSubmitButton, _buttonSpinnerClasses, 'Please wait');


            // Accessing Restful API
            axios({
                method: 'post',
                url: `${HOST_URL}/api/v1/project/task-reminders`,
                data: {
                    
                    description: ptrDescription.value,
                    date: ptrDate.value,
                    isNotified: true,
                    // _taskId: taskID.value,
                    notifyByEmail: true,
                    creator: ptrCreator.value,    
                },
            }).then(function (res) {
                KTUtil.btnRelease(TaskRemindersFormSubmitButton);
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
    const _createProjectTaskStatusForm = function () {
        // Getting Document related information
        const createProjectTaskStatusForm = KTUtil.getById('createProjectTaskStatusForm');
        const TaskRemindersFormSubmitButton = KTUtil.getById('TaskRemindersFormSubmitButton');
        const ptsStatus = KTUtil.getById('ptsStatus');
        const ptsDeadlineNotified = KTUtil.getById('ptsDeadlineNotified');
        const ptsKanbanOrder = KTUtil.getById('ptsKanbanOrder');
        const ptsMilestoneOrder = KTUtil.getById('ptsMilestoneOrder');
        const ptstaskID = KTUtil.getById('ptstaskID');
        const ptsProjectID = KTUtil.getById('ptsProjectID');
        const ptsUserID = KTUtil.getById('ptsUserID');
        const ptsProgress = KTUtil.getById('ptsProgress');

    // Dropdown List : Single Select1 With Search
    $('ptsStatus').selectpicker({
    });
    if (!createProjectTaskStatusForm) {
        return;
    }

    FormValidation.formValidation(createProjectTaskStatusForm, {
        fields: {
            ptsStatus: {
                validators: {
                    notEmpty: {
                        message: 'Message is required',
                    },
                },
            },
            ptsDeadlineNotified: {
                validators: {
                    notEmpty: {
                        message: 'Deadline Notified is required',
                    },
                },
            },
            ptsKanbanOrder: {
                validators: {
                    notEmpty: {
                        message: 'Kanban Order is required',
                    },
                },
            },
            ptsMilestoneOrder: {
                validators: {
                    notEmpty: {
                        message: 'Milestone Order is required',
                    },
                },
            },
            ptstaskID: {
                validators: {
                    notEmpty: {
                        message: 'Task ID is required',
                    },
                },
            },
            ptsProjectID: {
                validators: {
                    notEmpty: {
                        message: 'Project ID is required',
                    },
                },
            },            
            ptsUserID: {
                validators: {
                    notEmpty: {
                        message: 'User ID is required',
                    },
                },
            },            
            ptsProgress: {
                validators: {
                    notEmpty: {
                        message: 'Progress is required',
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
            TaskRemindersFormSubmitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            //defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        },
    })
        .on('core.form.valid', function () {
            KTUtil.btnWait(TaskRemindersFormSubmitButton, _buttonSpinnerClasses, 'Please wait');


            // Accessing Restful API
            axios({
                method: 'post',
                url: `${HOST_URL}/api/v1/project/task-status`,
                data: {
                    // _projectId: pdID.value,
                    status: ptsStatus.value,
                    deadlineNotified: true,
                    kanbanOrder: (ptsKanbanOrder.value)*1,
                    milestoneOrder: (ptsMilestoneOrder.value)*1,
                    // _taskId: ptstaskID.value,
                    // _projectId: ptsProjectID.value, 
                    // _userId: ptsUserID.value,
                    progress: (ptsProgress.value)*1,        
       
                },
            }).then(function (res) {
                KTUtil.btnRelease(TaskRemindersFormSubmitButton);
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
            _createProjectDiscussionsForm();
            _createProjectMembersForm();
            _createProjectTaskRemindersForm();
            _createProjectTaskStatusForm();
            

            

        },
    };
})();


jQuery(document).ready(function () {
    ProjectCRUD.init();
});
