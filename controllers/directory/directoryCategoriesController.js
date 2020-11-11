/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const DirectoryCategories = require('../../models/directory/directoryCategoriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllDirectoryCategories = catchAsync(async (req, res, next) => {
  console.log('Getting All DirectoryCategories');

  const directories = await DirectoryCategories.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got All DirectoryCategories',
    results: directories.length,
    data: {
      directories,
    },
  });

  next();
});

exports.getDirectoryCategories = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting DirectoryCategories for Id ${id}`);

  const directoryCategories = await DirectoryCategories.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got DirectoryCategories Id=${id}`,
    Data: { directoryCategories },
  });

  next();
});

exports.createDirectoryCategories = catchAsync(async (req, res, next) => {
  console.log('Creating directoryCategories');
  // parse through models
  const doc = new DirectoryCategories(req.body);
  console.log(doc);

  // update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id


  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(doc);

  const directoryCategories = await DirectoryCategories.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created DirectoryCategories',
    data: { directoryCategories },
  });

  next();
});

exports.updateDirectoryCategories = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating DirectoryCategories Id ${id}`);

  // parse through models
  const DirectoryCategoriesToUpdate = new DirectoryCategories(body);
  console.log(body);
  const doc = DirectoryCategoriesToUpdate.toObject();
  delete doc._id;


  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  const directoryCategories = await DirectoryCategories.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'success',
    message: `Updated DirectoryCategories Id=${id}`,
    data: { directoryCategories },
  });

  next();
});

exports.deleteDirectoryCategories = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting DirectoryCategories Id ${id}`);

  const directoryCategories = await DirectoryCategories.findByIdAndDelete(
    id
  ).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted DirectoryCategories Id=${id}`,
    data: { directoryCategories },
  });

  next();
});
