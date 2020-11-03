/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const DirectoryAttributesGroups = require('../../models/directory/directoryAttributesGroupsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllDirectoryAttributesGroups = catchAsync(async (req, res, next) => {
  console.log('Getting All DirectoryAttributesGroups');

  const directories = await DirectoryAttributesGroups.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All DirectoryAttributesGroups',
    results: directories.length,
    data: {
      directories,
    },
  });

  next();
});

exports.getDirectoryAttributesGroups = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting DirectoryAttributesGroups for Id ${id}`);

  const directoryAttributesGroups = await DirectoryAttributesGroups.findById(
    id
  ).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got DirectoryAttributesGroups Id=${id}`,
    Data: { directoryAttributesGroups },
  });

  next();
});

exports.createDirectoryAttributesGroups = catchAsync(async (req, res, next) => {
  console.log('Creating directoryAttributesGroups');
  // parse through models
  const doc = new DirectoryAtributesGroups(req.body);
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

  const directoryAttributesGroups = await DirectoryAttributesGroups.create(
    doc
  ).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created DirectoryAttributesGroups',
    data: { directoryAttributesGroups },
  });

  next();
});

exports.updateDirectoryAttributesGroups = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating DirectoryAttributesGroups Id ${id}`);

  const directoryAttributesGroups = await DirectoryAttributesGroups.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated DirectoryAttributesGroups Id=${id}`,
    data: { directoryAttributesGroups },
  });

  next();
});

exports.deleteDirectoryAttributesGroups = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting DirectoryAttributesGroups Id ${id}`);

  const directoryAttributesGroups = await DirectoryAttributesGroups.findByIdAndDelete(
    id
  ).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted DirectoryAttributesGroups Id=${id}`,
    data: { directoryAttributesGroups },
  });

  next();
});
