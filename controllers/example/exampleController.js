/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Example = require('../../models/example/exampleModel');
const ExtObject = require('../../models/example/extObjectModel');
const User = require('../../models/user/userModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllExample = catchAsync(async (req, res, next) => {
  console.log(`queryString :`, req.query); //, req.query
  let query;

  // BUILD QUERY
  // 1A) Filtering
  const queryObj = { ...req.query };
/*   const excludedFields = [
    'pagination',
    'selectedAllRows',
    'sort',
    'requestIds',
    //'query',
  ];
  excludedFields.forEach((el) => delete queryObj[el]);
  console.log('queryObj:', queryObj); */

  // 1B) Advanced Filtering
  let queryStr;

  console.log(queryObj.query)
  if (queryObj.query === undefined || queryObj.query === '' || queryObj.query.generalSearch === '') {
    query = Example.find();
  } else if (queryObj.query.generalSearch !== '') {
    queryStr = queryObj.query.generalSearch;
    queryStr = queryStr.trim();
    queryStr = { $text: { $search: `${queryStr}` } };
    query = Example.find(queryStr);
  }


  // 2) Sorting
  let sortStr;
  if (queryObj.sort) {
    sortStr = `{ "${queryObj.sort.field}": "${queryObj.sort.sort}" }`;
    sortStr = JSON.parse(sortStr);
  } else {
    sortStr = `-createdAt`; //{createdAt : desc}
  }
  query = query.find().sort(sortStr);

  // 3) Field Limiting

  // 4) Pagination
  const page = queryObj.pagination.page * 1 || 1;
  const limit = queryObj.pagination.perpage * 1 || 30;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  let numRecords;
  let pages;
  if (queryObj.pagination) {
    numRecords = await Example.countDocuments(); // has to be replaced with query.countDocuments();
 
    if (numRecords % limit === 0) {
      pages = numRecords / limit;
    } else {
      pages = numRecords / limit + 1;
    }
    if (skip >= numRecords) throw new Error('This page does not exist');
  }

  // EXECUTE QUERY
  const examples = await query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All Example',
    data: examples,
    meta: {
      page: page, // current page
      pages: pages, // total pages
      perpage: limit, // per page items
      total: numRecords, // total records
      field: 'createdAt', // default field sort
      sort: 'asc', // asc or desc
      rowIds: '',
    },
  });
});

exports.getExample = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Example for Id ${id}`);

  const example = await Example.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got Example Id=${id}`,
    Data: { example },
  });
});

exports.createExample = catchAsync(async (req, res, next) => {
  console.log(req.body);
  console.log('Creating Example');
  const { body } = req;

  // parse through models
  const doc = new Example(body);
  console.log(doc);

  // extRefObject
  if (doc.extRefObject) {
    // parse through models
    const dataExtRefObject = new ExtObject(
      JSON.parse(JSON.stringify(body.extRefObject))
    );

    // update timestamps & Id's
    dataExtRefObject.createdBy = '5f990bb3c727e952a076f3b7';
    dataExtRefObject.createdAt = Date.now();

    await dataExtRefObject.validate();
    doc.extRefObject = dataExtRefObject; // replace doc if necessary
  }

  //  arrayOfObjects
  if (doc.arrayOfObject) {
    const arrayOfObjectLength = doc.arrayOfObject.length;
    console.log(`Array of objects length ${arrayOfObjectLength}`);

    for (let i = 0; i < arrayOfObjectLength; i++) {
      doc.arrayOfObject[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.arrayOfObject[i].createdAt = Date.now();
    }
  }

  doc.createdBy = '5f990bb3c727e952a076f3b7';

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  console.log(`After Validation :${doc}`);

  //const example = await doc.save({ validateBeforeSave: false });

  const example = await Example.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created Example',
    data: { example },
  });
});

exports.updateExample = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating Example Id ${id}`);

  // parse through models
  const exampleToUpdate = new Example(body);
  console.log(body);
  const doc = exampleToUpdate.toObject();
  delete doc._id;

  if (exampleToUpdate.extRefObject) {
    const dataExtRefObject = new ExtObject(
      JSON.parse(JSON.stringify(exampleToUpdate.extRefObject))
    );

    // validate seperately sub-documents if necessary
    await dataExtRefObject.validate();

    // replace doc if necessary
    doc.extRefObject = dataExtRefObject;
  }

  if (exampleToUpdate.arrayOfString) {
    const len = exampleToUpdate.arrayOfString.length;
    console.log(len);
  }

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  const example = await Example.findByIdAndUpdate(id, doc, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
    message: `Updated Example Id=${id}`,
    example,
  });
});

exports.deleteExample = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Example Id ${id}`);

  const example = await Example.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted Example Id=${id}`,
    data: { example },
  });
});
