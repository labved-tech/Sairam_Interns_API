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
    // parse through models
    const doc = new ProjectTaskStatus(req.body);
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
  
    const projectTaskStatus = await ProjectTaskStatus.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectTaskStatus',
      data: { projectTaskStatus },
    });


  next();
});

exports.updateProjectTaskStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  console.log(`Updating ProjectTaskStatus Id ${id}`);


  // parse through models
  const ProjectTaskStatusToUpdate = new ProjectTaskStatus(body);
  console.log(body);
  const doc = ProjectTaskStatusToUpdate.toObject();
  delete doc._id;

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  
    const projectTaskStatus = await ProjectTaskStatus.findByIdAndUpdate(
      id, doc,
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
