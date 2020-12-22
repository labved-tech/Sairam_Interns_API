/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const ProjectDiscussionComments = require('../../models/project-management/projectDiscussionCommentsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTableProjectDiscussionComments = catchAsync(async (req, res, next) => {
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

  query = ProjectDiscussionComments.find(searchObj);

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
    numRecords = await ProjectDiscussionComments.countDocuments(); // has to be replaced with query.countDocuments();

    if (numRecords % limit === 0) pages = numRecords / limit;
    else pages = numRecords / limit + 1;

    if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const projectDiscussionComments = await query;
  //projectDiscussionComments = await ProjectDiscussionComments.find();
  console.log(projectDiscussionComments);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All project Discussion Comments Table',
    projectDiscussionComments,
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


exports.getAllProjectDiscussionComments = catchAsync(async (req, res, next) => {
  console.log('Getting All projectDiscussionComments');

  const projectDiscussionComments = await ProjectDiscussionComments.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All projectDiscussionComments',
    results: projectDiscussionComments.length,
    data: {
      projectDiscussionComments,
    },
  });

  next();
});

exports.getProjectDiscussionComments = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting projectDiscussionComments for Id ${id}`);

  const projectDiscussionComments = await ProjectDiscussionComments.findById(
    id
  ).then();
  res.status(200).json({
    status: 'success',
    message: `Got projectDiscussionComments Id=${id}`,
    Data: { projectDiscussionComments },
  });

  next();
});

exports.createProjectDiscussionComments = catchAsync(async (req, res, next) => {
  console.log('Creating projectDiscussionComments');
  const { body } = req;

  // parse through models
  const doc = new ProjectDiscussionComments(body);
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

  const projectDiscussionComments = await ProjectDiscussionComments.create(
    doc
  ).then();

  res.status(201).json({
    status: 'success',
    message: 'Created projectDiscussionComments',
    data: { projectDiscussionComments },
  });

  next();
});

exports.updateProjectDiscussionComments = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  console.log(`Updating ProjectDiscussionComments Id ${id}`);

  // parse through models
  const ProjectDiscussionCommentsToUpdate = new ProjectDiscussionComments(body);
  console.log(body);
  const doc = ProjectDiscussionCommentsToUpdate.toObject();
  delete doc._id;

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  const projectDiscussionComments = await ProjectDiscussionComments.findByIdAndUpdate(
    id,
    doc,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'success',
    message: `Updated projectDiscussionComments Id=${id}`,
    data: { projectDiscussionComments },
  });

  next();
});

exports.deleteProjectDiscussionComments = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting projectDiscussionComments Id ${id}`);

  const projectDiscussionComments = await ProjectDiscussionComments.findByIdAndDelete(
    id
  ).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted projectDiscussionComments Id=${id}`,
    data: { projectDiscussionComments },
  });

  next();
});
