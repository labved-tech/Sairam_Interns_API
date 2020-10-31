/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const ProjectTaskFiles = require('./../../models/project-management/projectTaskFilesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllProjectTaskFiles = catchAsync(async (req, res, next) => {
  console.log('Getting All projectTaskFiles');

  
    const projectTaskFiles = await ProjectTaskFiles.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All projectTaskFiles',
      results: projectTaskFiles.length,
      data: {
        projectTaskFiles,
      },
    });


  next();
});

exports.getProjectTaskFiles = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectTaskFiles for Id ${id}`);

  
    const projectTaskFiles = await ProjectTaskFiles.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got projectTaskFiles Id=${id}`,
      Data: { projectTaskFiles },
    });


  next();
});

exports.createProjectTaskFiles = catchAsync(async (req, res, next) => {
  console.log('Creating projectTaskFiles');

  
    const projectTaskFiles = await ProjectTaskFiles.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectTaskFiles',
      data: { projectTaskFiles },
    });


  next();
});

exports.updateProjectTaskFiles = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating projectTaskFiles Id ${id}`);

  
    const projectTaskFiles = await ProjectTaskFiles.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated projectTaskFiles Id=${id}`,
      data: { projectTaskFiles },
    });


  next();
});

exports.deleteProjectTaskFiles = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectTaskFiles Id ${id}`);

  
    const projectTaskFiles = await ProjectTaskFiles.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted projectTaskFiles Id=${id}`,
      data: { projectTaskFiles },
    });


  next();
});
