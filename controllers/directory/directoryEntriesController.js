/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const DirectoryEntries = require('../../models/directory/directoryEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTableDirectoryEntries = catchAsync(async (req, res, next) => {
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

  query = DirectoryEntries.find(searchObj);

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
    numRecords = await DirectoryEntries.countDocuments(); // has to be replaced with query.countDocuments();

    if (numRecords % limit === 0) pages = numRecords / limit;
    else pages = numRecords / limit + 1;

    if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const directoryEntries = await query;
  //directoryEntries = await Example.find();
  //console.log(directoryEntries);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All Example',
    directoryEntries,
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

exports.getAllDirectoryEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All DirectoryEntries');

  const directories = await DirectoryEntries.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All DirectoryEntries',
    results: directories.length,
    data: {
      directories,
    },
  });

  next();
});

exports.getDirectoryEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting DirectoryEntries for Id ${id}`);

  const directoryEntries = await DirectoryEntries.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got DirectoryEntries Id=${id}`,
    Data: { directoryEntries },
  });

  next();
});

exports.createDirectoryEntries = catchAsync(async (req, res, next) => {
  console.log('Creating directoryEntries');
  const { body } = req;

  // parse through models
  const doc = new DirectoryEntries(req.body);

  //  contactInfo
  if (doc.contactInfo) {
    const contactInfoLength = doc.contactInfo.length;
    console.log(`contactInfo length ${contactInfoLength}`);

    for (let i = 0; i < contactInfoLength; i++) {
      doc.contactInfo[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.contactInfo[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.contactInfo[i].createdAt = Date.now();
      doc.contactInfo[i].updatedAt = Date.now();
    }
  }

  // relation
  if (doc.relation) {
    const relationLength = doc.relation.length;
    console.log(`relation length ${relationLength}`);

    for (let i = 0; i < relationLength; i++) {
      doc.relation[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.relation[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.relation[i].createdAt = Date.now();
      doc.relation[i].updatedAt = Date.now();
    }
  }

  // directories
  if (doc.directories) {
    const directoriesLength = doc.directories.length;
    console.log(`directories length ${directoriesLength}`);

    for (let i = 0; i < directoriesLength; i++) {
      doc.directories[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.directories[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.directories[i].createdAt = Date.now();
      doc.directories[i].updatedAt = Date.now();
    }
  }

  doc.createdBy = '5f990bb3c727e952a076f3b7';
  doc.updatedBy = '5f990bb3c727e952a076f3b7';

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  console.log(`After Validation :${doc}`);
  //console.log(doc);

  const directoryEntries = await DirectoryEntries.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created DirectoryEntries',
    data: { directoryEntries },
  });

  next();
});

exports.updateDirectoryEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating DirectoryEntries Id ${id}`);

  // parse through models
  const DirectoryEntriesToUpdate = new DirectoryEntries(body);
  console.log(body);
  const doc = DirectoryEntriesToUpdate.toObject();
  delete doc._id;



  if (DirectoryEntriesToUpdate.contactInfo) {
    const contactInfoLength = doc.contactInfo.length;
    console.log(`Array of objects length ${contactInfoLength}`);

    for (let i = 0; i < contactInfoLength; i++) {
      doc.contactInfo[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.contactInfo[i].updatedAt = Date.now();
    }
  }
  if (DirectoryEntriesToUpdate.relation) {
    const relationLength = doc.relation.length;
    console.log(`Array of objects length ${relationLength}`);

    for (let i = 0; i < relationLength; i++) {
      doc.relation[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.relation[i].updatedAt = Date.now();
    }
  }
  if (DirectoryEntriesToUpdate.directories) {
    const directoriesLength = doc.directories.length;
    console.log(`Array of objects length ${directoriesLength}`);

    for (let i = 0; i < directoriesLength; i++) {
      doc.directories[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.directories[i].updatedAt = Date.now();
    }
  }

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);
  const directoryEntries = await DirectoryEntries.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'success',
    message: `Updated DirectoryEntries Id=${id}`,
    data: { directoryEntries },
  });

  next();
});

exports.deleteDirectoryEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting DirectoryEntries Id ${id}`);

  const directoryEntries = await DirectoryEntries.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted DirectoryEntries Id=${id}`,
    data: { directoryEntries },
  });

  next();
});
