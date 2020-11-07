/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const TaskEntries = require('./../../models/project-management/taskEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTaskEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All taskEntries');

  
    const taskEntries = await TaskEntries.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All taskEntries',
      results: taskEntries.length,
      data: {
        taskEntries,
      },
    });


  next();
});

exports.getTaskEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting taskEntries for Id ${id}`);

  
    const taskEntries = await TaskEntries.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got taskEntries Id=${id}`,
      Data: { taskEntries },
    });


  next();
});

exports.createTaskEntries = catchAsync(async (req, res, next) => {
  console.log('Creating taskEntries');
  const { body } = req;

    // parse through models
    const doc = new TaskEntries(body);
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
  
    const taskEntries = await TaskEntries.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created taskEntries',
      data: { taskEntries },
    });


  next();
});

exports.updateTaskEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  console.log(`Updating TaskEntries Id ${id}`);


  // parse through models
  const TaskEntriesToUpdate = new TaskEntries(body);
  console.log(body);
  const doc = TaskEntriesToUpdate.toObject();
  delete doc._id;

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  
    const taskEntries = await TaskEntries.findByIdAndUpdate(id, doc, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated taskEntries Id=${id}`,
      data: { taskEntries },
    });


  next();
});

exports.deleteTaskEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting taskEntries Id ${id}`);

  
    const taskEntries = await TaskEntries.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted taskEntries Id=${id}`,
      data: { taskEntries },
    });


  next();
});
