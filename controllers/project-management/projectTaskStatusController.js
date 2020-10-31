/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const ProjectTaskStatus = require('../../models/project-management/projectTaskStatusModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllProjectTaskStatus = catchAsync(async (req, res, next) => {
  console.log('Getting All projectTaskStatus');

  try {
    const projectTaskStatuss = await ProjectTaskStatus.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All projectTaskStatus',
      results: projectTaskStatuss.length,
      data: {
        projectTaskStatuss,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
});

exports.getProjectTaskStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectTaskStatus for Id ${id}`);

  try {
    const projectTaskStatus = await ProjectTaskStatus.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got projectTaskStatus Id=${id}`,
      Data: { projectTaskStatus },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
});

exports.createProjectTaskStatus = catchAsync(async (req, res, next) => {
  console.log('Creating projectTaskStatus');

  try {
    const projectTaskStatus = await ProjectTaskStatus.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectTaskStatus',
      data: { projectTaskStatus },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
});

exports.updateProjectTaskStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating projectTaskStatus Id ${id}`);

  try {
    const projectTaskStatus = await ProjectTaskStatus.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    ).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated projectTaskStatus Id=${id}`,
      data: { projectTaskStatus },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
});

exports.deleteProjectTaskStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectTaskStatus Id ${id}`);

  try {
    const projectTaskStatus = await ProjectTaskStatus.findByIdAndDelete(
      id
    ).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted projectTaskStatus Id=${id}`,
      data: { projectTaskStatus },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
});
