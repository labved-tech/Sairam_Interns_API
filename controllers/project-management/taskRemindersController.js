/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const TaskReminders = require('./../../models/project-management/taskRemindersModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTaskReminders = catchAsync(async (req, res, next) => {
  console.log('Getting All taskReminders');

  
    const taskReminders = await TaskReminders.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All taskReminders',
      results: taskReminders.length,
      data: {
        taskReminders,
      },
    });


  next();
});

exports.getTaskReminders = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting taskReminders for Id ${id}`);

  
    const taskReminders = await TaskReminders.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got taskReminders Id=${id}`,
      Data: { taskReminders },
    });


  next();
});

exports.createTaskReminders = catchAsync(async (req, res, next) => {
  console.log('Creating taskReminders');
    // parse through models
    const doc = new TaskReminders(req.body);
    console.log(doc);
  
    // validate seperately sub-documents if necessary
  
    // replace doc if necessary
  
    // update timestamps & Id's
    doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
    doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
    doc.createdAt;
    doc.updatedAt;
  
  // final validation
  await doc.validate();
  
  // check the doc before doing database operation
  //console.log(doc); 
  
    const taskReminders = await TaskReminders.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created taskReminders',
      data: { taskReminders },
    });


  next();
});

exports.updateTaskReminders = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating taskReminders Id ${id}`);

  
    const taskReminders = await TaskReminders.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated taskReminders Id=${id}`,
      data: { taskReminders },
    });


  next();
});

exports.deleteTaskReminders = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting taskReminders Id ${id}`);

  
    const taskReminders = await TaskReminders.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted taskReminders Id=${id}`,
      data: { taskReminders },
    });


  next();
});
