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

exports.getAllTableTaskChecklistEntries = catchAsync(async (req, res, next) => {
  let query;
  // BUILD QUERY
  // 1A) Filtering
  const queryObj = { ...req.query };
  console.log('Raw :', queryObj);

  const excludedFields = [
    'pagination',
    'selectedAllRows',
    'requestIds',
    'sort',
    'fields',
  ];
  excludedFields.forEach((el) => delete queryObj[el]);

  // 1B) Advanced Filtering
  let searchObj;
  if (queryObj.query.generalSearch) {
    const searchStr = queryObj.query.generalSearch;
    searchObj = { $text: { $search: `${searchStr}` } };
    console.log(searchObj);
  }

  let queryStr = JSON.stringify(queryObj.query);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  console.log(queryStr);
  const tempObj = JSON.parse(queryStr);
  console.log('Obj :', tempObj);

  query = TaskChecklistEntries.find(searchObj);

  // 2) Sorting
  let sortBy;
  if (req.query.sort) {
    sortBy = `{ "${req.query.sort.field}": "${req.query.sort.sort}" }`;
    query = query.sort(JSON.parse(sortBy));
  } else {
    sortBy = `-createdAt`; //{createdAt : desc}
    query = query.sort(sortBy);
  }

  // 3) Field Limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  // 4) Pagination
  const page = req.query.pagination.page * 1 || 1;
  const limit = req.query.pagination.perpage * 1 || 30;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  let numRecords;
  let pages;
  if (req.query.pagination) {
    numRecords = await TaskChecklistEntries.countDocuments(); // has to be replaced with query.countDocuments();

    if (numRecords % limit === 0) pages = numRecords / limit;
    else pages = numRecords / limit + 1;

    if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const taskChecklistEntries = await query;
  //taskChecklistEntries = await TaskChecklistEntries.find();
  //console.log(taskChecklistEntries);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All TaskChecklistEntries',
    taskChecklistEntries,
    meta: {
      page: page, // current page
      pages: pages, // total pages
      perpage: limit, // per page items
      total: numRecords, // total records
      field: 'createdAt', // default field sort
      sort: 'desc', // asc or desc
      rowIds: '',
    },
  });
});


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
    taskChecklistEntries,
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
