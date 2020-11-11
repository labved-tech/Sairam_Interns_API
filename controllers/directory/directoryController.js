/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Directory = require('../../models/directory/directoryModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllDirectory = catchAsync(async (req, res, next) => {
  console.log('Getting All Directory');

  const directories = await Directory.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All Directory',
    results: directories.length,
    data: {
      directories,
    },
  });

  next();
});

exports.getDirectory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Directory for Id ${id}`);

  const directory = await Directory.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got Directory Id=${id}`,
    Data: { directory },
  });

  next();
});

exports.createDirectory = catchAsync(async (req, res, next) => {
  console.log('Creating directory');
  const { body } = req;

  // parse through models
  const doc = new Directory(body);
  console.log(doc);

  // update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.createdAt;
  doc.updatedAt;

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(doc);

  const directory = await Directory.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created Directory',
    data: { directory },
  });

  next();
});

exports.updateDirectory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating Directory Id ${id}`);

  // parse through models
  const DirectoryToUpdate = new Directory(body);
  console.log(body);
  const doc = DirectoryToUpdate.toObject();
  delete doc._id;


  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  const directory = await Directory.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
    message: `Updated Directory Id=${id}`,
    data: { directory },
  });

  next();
});

exports.deleteDirectory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Directory Id ${id}`);

  const directory = await Directory.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted Directory Id=${id}`,
    data: { directory },
  });

  next();
});
