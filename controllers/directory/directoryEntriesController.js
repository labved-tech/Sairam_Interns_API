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

exports.getAllDirectoryEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All DirectoryEntries');

  const directories = await DirectoryEntries.find().then();

  res.status(200).json({
    status: 'sucess',
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
    status: 'sucess',
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
    status: 'sucess',
    message: 'Created DirectoryEntries',
    data: { directoryEntries },
  });

  next();
});

exports.updateDirectoryEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating DirectoryEntries Id ${id}`);

  const directoryEntries = await DirectoryEntries.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'sucess',
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
    status: 'sucess',
    message: `Deleted DirectoryEntries Id=${id}`,
    data: { directoryEntries },
  });

  next();
});
