/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const TaskChecklistEntries = require('./../../models/project-management/taskChecklistEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTaskChecklistEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All taskChecklistEntries');

  
    const taskChecklistEntries = await TaskChecklistEntries.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All taskChecklistEntries',
      results: taskChecklistEntries.length,
      data: {
        taskChecklistEntries,
      },
    });


  next();
});

exports.getTaskChecklistEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting taskChecklistEntries for Id ${id}`);

  
    const taskChecklistEntries = await TaskChecklistEntries.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got taskChecklistEntries Id=${id}`,
      Data: { taskChecklistEntries },
    });


  next();
});

exports.createTaskChecklistEntries = catchAsync(async (req, res, next) => {
  console.log('Creating taskChecklistEntries');

  
    const taskChecklistEntries = await TaskChecklistEntries.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created taskChecklistEntries',
      data: { taskChecklistEntries },
    });


  next();
});

exports.updateTaskChecklistEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating taskChecklistEntries Id ${id}`);

  
    const taskChecklistEntries = await TaskChecklistEntries.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated taskChecklistEntries Id=${id}`,
      data: { taskChecklistEntries },
    });


  next();
});

exports.deleteTaskChecklistEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting taskChecklistEntries Id ${id}`);

  
    const taskChecklistEntries = await TaskChecklistEntries.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted taskChecklistEntries Id=${id}`,
      data: { taskChecklistEntries },
    });


  next();
});
