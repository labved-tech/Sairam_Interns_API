/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const TaskChecklistEntries = require('../../models/project-management/taskChecklistEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTaskChecklistEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All taskChecklistEntries');

  const taskChecklistEntries = await TaskChecklistEntries.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All taskChecklistEntries',
    results: taskChecklistEntries.length,
    data: {
      taskChecklistEntries,
    },
  });

  next();
});

exports.getTaskChecklistEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting taskChecklistEntries for Id ${id}`);

  const taskChecklistEntries = await TaskChecklistEntries.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got taskChecklistEntries Id=${id}`,
    Data: { taskChecklistEntries },
  });

  next();
});

exports.createTaskChecklistEntries = catchAsync(async (req, res, next) => {
  console.log('Creating taskChecklistEntries');
  const { body } = req;

  // parse through models
  const doc = new TaskChecklistEntries(body);
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

  const taskChecklistEntries = await TaskChecklistEntries.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created taskChecklistEntries',
    data: { taskChecklistEntries },
  });

  next();
});

exports.updateTaskChecklistEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  console.log(`Updating TaskChecklistEntries Id ${id}`);

  // parse through models
  const TaskChecklistEntriesToUpdate = new TaskChecklistEntries(body);
  console.log(body);
  const doc = TaskChecklistEntriesToUpdate.toObject();
  delete doc._id;

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  const taskChecklistEntries = await TaskChecklistEntries.findByIdAndUpdate(
    id,
    doc,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'success',
    message: `Updated taskChecklistEntries Id=${id}`,
    data: { taskChecklistEntries },
  });

  next();
});

exports.deleteTaskChecklistEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting taskChecklistEntries Id ${id}`);

  const taskChecklistEntries = await TaskChecklistEntries.findByIdAndDelete(
    id
  ).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted taskChecklistEntries Id=${id}`,
    data: { taskChecklistEntries },
  });

  next();
});
