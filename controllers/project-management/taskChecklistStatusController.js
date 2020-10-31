/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const TaskChecklistStatus = require('./../../models/project-management/taskChecklistStatusModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTaskChecklistStatus = catchAsync(async (req, res, next) => {
  console.log('Getting All taskChecklistStatus');

  
    const taskChecklistStatuss = await TaskChecklistStatus.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All taskChecklistStatus',
      results: taskChecklistStatuss.length,
      data: {
        taskChecklistStatuss,
      },
    });


  next();
});

exports.getTaskChecklistStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting taskChecklistStatus for Id ${id}`);

  
    const taskChecklistStatus = await TaskChecklistStatus.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got taskChecklistStatus Id=${id}`,
      Data: { taskChecklistStatus },
    });


  next();
});

exports.createTaskChecklistStatus = catchAsync(async (req, res, next) => {
  console.log('Creating taskChecklistStatus');

  
    const taskChecklistStatus = await TaskChecklistStatus.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created taskChecklistStatus',
      data: { taskChecklistStatus },
    });


  next();
});

exports.updateTaskChecklistStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating taskChecklistStatus Id ${id}`);

  
    const taskChecklistStatus = await TaskChecklistStatus.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated taskChecklistStatus Id=${id}`,
      data: { taskChecklistStatus },
    });


  next();
});

exports.deleteTaskChecklistStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting taskChecklistStatus Id ${id}`);

  
    const taskChecklistStatus = await TaskChecklistStatus.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted taskChecklistStatus Id=${id}`,
      data: { taskChecklistStatus },
    });


  next();
});
