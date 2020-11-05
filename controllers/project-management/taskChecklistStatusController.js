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
    // parse through models
    const doc = new TaskChecklistStatus(req.body);
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
  
    const taskChecklistStatus = await TaskChecklistStatus.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created taskChecklistStatus',
      data: { taskChecklistStatus },
    });


  next();
});

exports.updateTaskChecklistStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  console.log(`Updating TaskChecklistStatus Id ${id}`);


  // parse through models
  const TaskChecklistStatusToUpdate = new TaskChecklistStatus(body);
  console.log(body);
  const doc = TaskChecklistStatusToUpdate.toObject();
  delete doc._id;

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  
    const taskChecklistStatus = await TaskChecklistStatus.findByIdAndUpdate(id, doc, {
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
