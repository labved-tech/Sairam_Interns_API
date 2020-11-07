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
  const { body } = req;

    // parse through models
    const doc = new ProjectTaskFiles(body);
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
  
    const projectTaskFiles = await ProjectTaskFiles.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectTaskFiles',
      data: { projectTaskFiles },
    });


  next();
});

exports.updateProjectTaskFiles = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  console.log(`Updating ProjectTaskFiles Id ${id}`);


  // parse through models
  const ProjectTaskFilesToUpdate = new ProjectTaskFiles(body);
  console.log(body);
  const doc = ProjectTaskFilesToUpdate.toObject();
  delete doc._id;

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  
    const projectTaskFiles = await ProjectTaskFiles.findByIdAndUpdate(id, doc, {
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
