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

  
    const projectTaskStatuss = await ProjectTaskStatus.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All projectTaskStatus',
      results: projectTaskStatuss.length,
      data: {
        projectTaskStatuss,
      },
    });


  next();
});

exports.getProjectTaskStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectTaskStatus for Id ${id}`);

  
    const projectTaskStatus = await ProjectTaskStatus.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got projectTaskStatus Id=${id}`,
      Data: { projectTaskStatus },
    });


  next();
});

exports.createProjectTaskStatus = catchAsync(async (req, res, next) => {
  console.log('Creating projectTaskStatus');

  
    const projectTaskStatus = await ProjectTaskStatus.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectTaskStatus',
      data: { projectTaskStatus },
    });


  next();
});

exports.updateProjectTaskStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating projectTaskStatus Id ${id}`);

  
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


  next();
});

exports.deleteProjectTaskStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectTaskStatus Id ${id}`);

  
    const projectTaskStatus = await ProjectTaskStatus.findByIdAndDelete(
      id
    ).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted projectTaskStatus Id=${id}`,
      data: { projectTaskStatus },
    });


  next();
});
