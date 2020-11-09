/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

const FarmEntries = require('../../models/precision-agriculture/farmEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllFarmEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All farmEntries');

  const farmEntries = await FarmEntries.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All farmEntries',
    results: farmEntries.length,
    data: {
      farmEntries,
    },
  });
  next();
});

exports.getFarmEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting farmEntries for Id ${id}`);

  const farmEntries = await FarmEntries.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got farmEntries Id=${id}`,
    Data: { farmEntries },
  });
  next();
});

exports.createFarmEntries = catchAsync(async (req, res, next) => {
  console.log('Creating FarmEntries');
  const { body } = req;

  // parse through models
  const doc = new FarmEntries(body);

  //  adminss
  if (doc.admins) {
    const adminsLength = doc.admins.length;
    console.log(`Array of objects length ${adminsLength}`);

    for (let i = 0; i < adminsLength; i++) {
      doc.admins[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.admins[i].createdAt = Date.now();
    }
  }

  doc.createdBy = '5f990bb3c727e952a076f3b7';
  doc.updatedBy = '5f990bb3c727e952a076f3b7';

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(`After Validation :${doc}`);

  //const farmEntries = await doc.save({ validateBeforeSave: false });
 
  const farmEntries = await FarmEntries.create(doc).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created farmEntries',
    data: { farmEntries },
  });

  next();
});

exports.updateFarmEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating FarmEntries Id ${id}`);

  // parse through models
  const FarmEntriesToUpdate = new FarmEntries(body);
  console.log(body);
  const doc = FarmEntriesToUpdate.toObject();
  delete doc._id;



  if (FarmEntriesToUpdate.admins) {
    const adminsLength = doc.admins.length;
    console.log(`Array of objects length ${adminsLength}`);

    for (let i = 0; i < adminsLength; i++) {
      doc.admins[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.admins[i].updatedAt = Date.now();
    }
  }

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);
  const farmEntries = await FarmEntries.findByIdAndUpdate(id, doc, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated farmEntries Id=${id}`,
    data:  { farmEntries },
  });
  next();
});

exports.deleteFarmEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting farmEntries Id ${id}`);

  const farmEntries = await FarmEntries.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted farmEntries Id=${id}`,
    data: { farmEntries },
  });
  next();
});
