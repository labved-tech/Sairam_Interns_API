/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const FarmStrategy = require('../../models/precision-agriculture/farmStrategyModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllTableFarmStrategy = catchAsync(async (req, res, next) => {
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

  query = FarmStrategy.find(searchObj);

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
    numRecords = await FarmStrategy.countDocuments(); // has to be replaced with query.countDocuments();

    if (numRecords % limit === 0) pages = numRecords / limit;
    else pages = numRecords / limit + 1;

    if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const farmStrategy = await query;
  //farmStrategy = await FarmStrategy.find();
  //console.log(farmStrategy);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All FarmStrategy',
    farmStrategy,
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


exports.getAllFarmStrategy = catchAsync(async (req, res, next) => {
  console.log('Getting All farmStrategy');

  const farmStrategys = await FarmStrategy.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All farmStrategy',
    results: farmStrategys.length,
    data: {
      farmStrategys,
    },
  });
  next();
});

exports.getFarmStrategy = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting farmStrategy for Id ${id}`);

  const farmStrategy = await FarmStrategy.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got farmStrategy Id=${id}`,
    Data: { farmStrategy },
  });
  next();
});

exports.createFarmStrategy = catchAsync(async (req, res, next) => {
  console.log('Creating FarmStrategy');
  const { body } = req;

  // parse through models
  const doc = new FarmStrategy(body);

  //  Stages
  if (doc.stages) {
    const stagesLength = doc.stages.length;
    console.log(`Array of objects  length ${stagesLength}`);

    for (let i = 0; i < stagesLength; i++) {
      //commodities
      if (doc.stages.commodities) {
        const commoditiesLength = doc.stages.commodities.length;
        console.log(`Array of objects length ${commoditiesLength}`);

        for (let j = 0; j < commoditiesLength; j++) {
          doc.stages[i].commodities[j].createdBy = '5f990bb3c727e952a076f3b7';
          doc.stages[i].commodities[j].updatedBy = '5f990bb3c727e952a076f3b7';
          doc.stages[i].commodities[j].createdAt = Date.now();
          doc.stages[i].commodities[j].updatedAt = Date.now();
        }
      }
      doc.stages[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.stages[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.stages[i].createdAt = Date.now();
      doc.stages[i].updatedAt = Date.now();
    }
  }

  doc.createdBy = '5f990bb3c727e952a076f3b7';
  doc.updatedBy = '5f990bb3c727e952a076f3b7';

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(`After Validation :${doc}`);

  //const FarmStrategy = await doc.save({ validateBeforeSave: false });

  const farmStrategy = await FarmStrategy.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created farmStrategy',
    data: { farmStrategy },
  });

  next();
});

exports.updateFarmStrategy = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating FarmStrategy Id ${id}`);

  // parse through models
  const FarmStrategyToUpdate = new FarmStrategy(body);
  console.log(body);
  const doc = FarmStrategyToUpdate.toObject();
  delete doc._id;

  const farmStrategy = await FarmStrategy.findByIdAndUpdate(id, doc, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
    message: `Updated farmStrategy Id=${id}`,
    data: { farmStrategy },
  });
  next();
});

exports.deleteFarmStrategy = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting farmStrategy Id ${id}`);

  const farmStrategy = await FarmStrategy.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted farmStrategy Id=${id}`,
    data: { farmStrategy },
  });

  next();
});
