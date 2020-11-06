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
  console.log('Getting All Example');

  const examples = await Example.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All Example',
    results: examples.length,
    data: {
      examples,
    },
  });
});

exports.getExample = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Example for Id ${id}`);

  const example = await Example.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got Example Id=${id}`,
    Data: { example },
  });
});

exports.createExample = catchAsync(async (req, res, next) => {
  console.log('Creating Example');
  const { body } = req;

  // parse through models
  const doc = new Example(body);

  // extRefObject
  if (doc.extRefObject) {
    // parse through models
    const dataExtRefObject = new ExtObject(
      JSON.parse(JSON.stringify(body.extRefObject)),
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
    status: 'sucess',
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
      JSON.parse(JSON.stringify(exampleToUpdate.extRefObject)),
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
    status: 'sucess',
    message: `Updated Example Id=${id}`,
    example,
  });
});

exports.deleteExample = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Example Id ${id}`);

  const example = await Example.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted Example Id=${id}`,
    data: { example },
  });
});
