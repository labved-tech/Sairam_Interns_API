/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const ProjectActivity = require('../../models/project-management/projectActivityModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllProjectActivity = catchAsync(async (req, res, next) => {
  console.log('Getting All projectActivity');

  
    const projectActivitys = await ProjectActivity.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All projectActivity',
      results: projectActivitys.length,
      data: {
        projectActivitys,
      },
    });


  next();
});

exports.getProjectActivity = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectActivityfor Id ${id}`);

  
    const projectActivity = await ProjectActivity.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got projectActivityId=${id}`,
      Data: { projectActivity },
    });


  next();
});

exports.createProjectActivity = catchAsync(async (req, res, next) => {
  console.log('Creating projectActivity');
  const { body } = req;

    // parse through models
    const doc = new ProjectActivity(body);
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
  
    const projectActivity = await ProjectActivity.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created projectActivity',
      data: { projectActivity },
    });


  next();
});

exports.updateProjectActivity = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating ProjectActivity Id ${id}`);


  // parse through models
  const ProjectActivityToUpdate = new ProjectActivity(body);
  console.log(body);
  const doc = ProjectActivityToUpdate.toObject();
  delete doc._id;

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);
  
    const projectActivity = await ProjectActivity.findByIdAndUpdate(
      id, doc,
      {
        new: true,
      }
    ).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated projectActivityId=${id}`,
      data: { projectActivity },
    });


  next();
});

exports.deleteProjectActivity = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectActivityId ${id}`);

  
    const projectActivity = await ProjectActivity.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted projectActivityId=${id}`,
      data: { projectActivity },
    });


  next();
});
