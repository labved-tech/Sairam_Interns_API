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
  console.log('Creating farmEntries');

    // parse through models
    const doc = new FarmEntries(req.body);
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
  console.log(`Updating farmEntries Id ${id}`);

  const farmEntries = await FarmEntries.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated farmEntries Id=${id}`,
    data: { farmEntries },
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
