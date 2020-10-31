/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const TaskTimers = require('../../models/project-management/taskTimersModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTaskTimers = catchAsync(async (req, res, next) => {
  console.log('Getting All taskTimers');

  
    const taskTimers = await TaskTimers.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All taskTimers',
      results: taskTimers.length,
      data: {
        taskTimers,
      },
    });


  next();
});

exports.getTaskTimers = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting taskTimers for Id ${id}`);

  
    const taskTimers = await TaskTimers.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got taskTimers Id=${id}`,
      Data: { taskTimers },
    });


  next();
});

exports.createTaskTimers = catchAsync(async (req, res, next) => {
  console.log('Creating taskTimers');

  
    const taskTimers = await TaskTimers.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created taskTimers',
      data: { taskTimers },
    });


  next();
});

exports.updateTaskTimers = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating taskTimers Id ${id}`);

  
    const taskTimers = await TaskTimers.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated taskTimers Id=${id}`,
      data: { taskTimers },
    });


  next();
});

exports.deleteTaskTimers = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting taskTimers Id ${id}`);

  
    const taskTimers = await TaskTimers.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted taskTimers Id=${id}`,
      data: { taskTimers },
    });


  next();
});
