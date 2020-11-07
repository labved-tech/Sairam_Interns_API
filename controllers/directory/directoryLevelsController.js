/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const DirectoryLevels = require('../../models/directory/directoryLevelsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllDirectoryLevels = catchAsync(async (req, res, next) => {
  console.log('Getting All DirectoryLevels');

  const directories = await DirectoryLevels.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All DirectoryLevels',
    results: directories.length,
    data: {
      directories,
    },
  });

  next();
});

exports.getDirectoryLevels = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting DirectoryLevels for Id ${id}`);

  const directoryLevels = await DirectoryLevels.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got DirectoryLevels Id=${id}`,
    Data: { directoryLevels },
  });

  next();
});

exports.createDirectoryLevels = catchAsync(async (req, res, next) => {
  console.log('Creating directoryLevels');
  const { body } = req;

  // parse through models
  const doc = new DirectoryLevels(body);
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

  const directoryLevels = await DirectoryLevels.create(doc).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created DirectoryLevels',
    data: { directoryLevels },
  });

  next();
});

exports.updateDirectoryLevels = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating DirectoryLevels Id ${id}`);

  const directoryLevels = await DirectoryLevels.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated DirectoryLevels Id=${id}`,
    data: { directoryLevels },
  });

  next();
});

exports.deleteDirectoryLevels = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting DirectoryLevels Id ${id}`);

  const directoryLevels = await DirectoryLevels.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted DirectoryLevels Id=${id}`,
    data: { directoryLevels },
  });

  next();
});
