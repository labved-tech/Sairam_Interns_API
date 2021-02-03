/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const AnnouncementEntries = require('../../models/announcement/announcementEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTableAnnouncementEntries = catchAsync(async (req, res, next) => {
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

  query = AnnouncementEntries.find(searchObj);

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
    numRecords = await AnnouncementEntries.countDocuments(); // has to be replaced with query.countDocuments();

    if (numRecords % limit === 0) pages = numRecords / limit;
    else pages = numRecords / limit + 1;

    if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const announcementEntries = await query;
  //announcementEntries = await AnnouncementEntries.find();
  //console.log(announcementEntries);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All Announcement Entries',
    announcementEntries,
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

exports.getAllAnnouncementEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All Announcement Entries');

  const announcementEntries = await AnnouncementEntries.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All Announcement Entries',
    results: announcementEntries.length,
    announcementEntries,
  });
  next();
});

exports.getAnnouncementEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Announcement Entries for Id ${id}`);

  const announcementEntries = await AnnouncementEntries.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got Announcement Entries Id=${id}`,
    announcementEntries,
  });

  next();
});

exports.createAnnouncementEntries = catchAsync(async (req, res, next) => {
  console.log('Creating Announcement Entries');
  const { body } = req;

  // parse through models
  const doc = new AnnouncementEntries(body);
  console.log(body);

  // targetConditions
  if (doc.targetConditions) {
    const targetConditionsLength = doc.targetConditions.length;
    console.log(`Array of objects length ${targetConditionsLength}`);

    for (let i = 0; i < targetConditionsLength; i += 1) {
      doc.targetConditions[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.targetConditions[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.targetConditions[i].createdAt = Date.now();
      doc.targetConditions[i].updatedAt = Date.now();
    }
  }

  doc.createdBy = '5f990bb3c727e952a076f3b7';

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  console.log(doc);

  const announcementEntries = await AnnouncementEntries.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created Announcement Entries',
    data: { announcementEntries },
  });

  next();
});

exports.updateAnnouncementEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Announcement Entries Id ${id}`);
  const { body } = req;

  // parse through models
  const announcementEntriesToUpdate = new AnnouncementEntries(body);
  console.log(body);
  const doc = announcementEntriesToUpdate.toObject();
  delete doc._id;

  if (announcementEntriesToUpdate.targetConditions) {
    const len = announcementEntriesToUpdate.targetConditions.length;
    console.log(len);
  }

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  const announcementEntries = await AnnouncementEntries.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'success',
    message: `Updated Announcement Entries Id=${id}`,
    data: { announcementEntries },
  });

  next();
});

exports.deleteAnnouncementEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Announcement Entries Id ${id}`);

  const announcementEntries = await AnnouncementEntries.findByIdAndDelete(
    id
  ).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted Announcement Entries Id =${id}`,
    data: { announcementEntries },
  });

  next();
});
