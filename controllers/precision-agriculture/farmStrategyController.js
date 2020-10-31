/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const FarmStrategy = require('../../models/precision-agriculture/farmStrategyModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllFarmStrategy = catchAsync(async (req, res, next) => {
  console.log('Getting All farmStrategy');

  const farmStrategys = await FarmStrategy.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All farmStrategy',
    results: farmStrategys.length,
    data: {
      farmStrategys,
    },
  });
  next();
});

exports.getFarmStrategy = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting farmStrategy for Id ${id}`);

  const farmStrategy = await FarmStrategy.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got farmStrategy Id=${id}`,
    Data: { farmStrategy },
  });
  next();
});

exports.createFarmStrategy = catchAsync(async (req, res, next) => {
  console.log('Creating farmStrategy');
    // parse through models
    const doc = new FarmStrategy(req.body);
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
  const farmStrategy = await FarmStrategy.create(req.body).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created farmStrategy',
    data: { farmStrategy },
  });

  next();
});

exports.updateFarmStrategy = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating farmStrategy Id ${id}`);

  const farmStrategy = await FarmStrategy.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated farmStrategy Id=${id}`,
    data: { farmStrategy },
  });
  next();
});

exports.deleteFarmStrategy = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting farmStrategy Id ${id}`);

  const farmStrategy = await FarmStrategy.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted farmStrategy Id=${id}`,
    data: { farmStrategy },
  });

  next();
});
