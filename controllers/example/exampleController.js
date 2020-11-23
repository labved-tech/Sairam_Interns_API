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
  console.log(req.query);
  /*   const paginationObj = req.query.pagination;
  const qObj = req.query.query;
  const sortObj = req.query.sort;
  const requestIdsObj = req.query.requestIds;

  console.log(paginationObj, qObj, sortObj, requestIdsObj); */

  // BUILD QUERY
  // 1A) Filtering
  const queryObj = { ...req.query };
  const excludedFields = [
    'pagination',
    'selectedAllRows',
    'sort',
    'requestIds',
    'query',
  ];
  excludedFields.forEach((el) => delete queryObj[el]);
  console.log(queryObj);

  // 1B) Advanced Filtering
  const queryStr = JSON.stringify(queryObj);
  let query;
  query = Example.find(JSON.parse(queryStr)).then();

  // 2) Sorting
  if (req.query.sort) {
    //query = query.sort(req.query.sort.field);
  } else {
    query = query.sort('-createdAt');
  }

  // 3) Field Limiting

  // 4) Pagination
  const page = req.query.pagination.page * 1 || 1;
  const limit = req.query.pagination.perpage * 1 || 30;
  const skip = (page - 1) * limit;

  if (req.query.pagination) {
    query = query.skip(skip).limit(limit);
  }

  //const query = Example.find(queryObj).then();

  // EXECUTE QUERY
  const examples = await query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    message: 'Got All Example',
    results: examples.length,
    examples,
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
