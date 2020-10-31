/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const ProjectFiles = require('../../models/project-management/projectFilesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllProjectFiles = catchAsync(async (req, res, next) => {
  console.log('Getting All projectFiles');

  
    const projectFiles = await ProjectFiles.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All projectFiles',
      results: projectFiles.length,
      data: {
        projectFiles,
      },
    });


  next();
});

exports.getProjectFiles = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectFiles for Id ${id}`);

  
    const projectFiles = await ProjectFiles.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got projectFiles Id=${id}`,
      Data: { projectFiles },
    });


  next();
});

exports.createProjectFiles = catchAsync(async (req, res, next) => {
  console.log('Creating projectFiles');

  
    const projectFiles = await ProjectFiles.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectFiles',
      data: { projectFiles },
    });


  next();
});

exports.updateProjectFiles = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating projectFiles Id ${id}`);

  
    const projectFiles = await ProjectFiles.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated projectFiles Id=${id}`,
      data: { projectFiles },
    });


  next();
});

exports.deleteProjectFiles = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectFiles Id ${id}`);

  
    const projectFiles = await ProjectFiles.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted projectFiles Id=${id}`,
      data: { projectFiles },
    });


  next();
});
