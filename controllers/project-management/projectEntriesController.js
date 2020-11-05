/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const ProjectEntries = require('../../models/project-management/projectEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllProjectEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All projectEntries');

  
    const projectEntries = await ProjectEntries.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All projectEntries',
      results: projectEntries.length,
      data: {
        projectEntries,
      },
    });


  next();
});

exports.getProjectEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectEntries for Id ${id}`);

  
    const projectEntries = await ProjectEntries.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got projectEntries Id=${id}`,
      Data: { projectEntries },
    });


  next();
});

exports.createProjectEntries = catchAsync(async (req, res, next) => {
  console.log('Creating projectEntries');
    // parse through models
    const doc = new ProjectEntries(req.body);
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
  
    const projectEntries = await ProjectEntries.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectEntries',
      data: { projectEntries },
    });


  next();
});

exports.updateProjectEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  console.log(`Updating ProjectEntries Id ${id}`);


  // parse through models
  const ProjectEntriesToUpdate = new ProjectEntries(body);
  console.log(body);
  const doc = ProjectEntriesToUpdate.toObject();
  delete doc._id;

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  
    const projectEntries = await ProjectEntries.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    ).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated projectEntries Id=${id}`,
      data: { projectEntries },
    });


  next();
});

exports.deleteProjectEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectEntries Id ${id}`);

  
    const projectEntries = await ProjectEntries.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted projectEntries Id=${id}`,
      data: { projectEntries },
    });


  next();
});
