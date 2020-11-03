/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const FarmExportedStrategy = require('../../models/precision-agriculture/farmExportedStrategyModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllFarmExportedStrategy = catchAsync(async (req, res, next) => {
  console.log('Getting All farmExportedStrategy');

  const farmExportedStrategys = await FarmExportedStrategy.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All farmExportedStrategy',
    results: farmExportedStrategys.length,
    data: {
      farmExportedStrategys,
    },
  });

  next();
});

exports.getFarmExportedStrategy = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting farmExportedStrategy for Id ${id}`);

  const farmExportedStrategy = await FarmExportedStrategy.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got farmExportedStrategy Id=${id}`,
    Data: { farmExportedStrategy },
  });
  next();
});

exports.createFarmExportedStrategy = catchAsync(async (req, res, next) => {
  console.log('Creating farmExportedStrategy');
    // parse through models
    const doc = new FarmExportedStrategy(req.body);
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
  const farmExportedStrategy = await FarmExportedStrategy.create(
    doc
  ).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created farmExportedStrategy',
    data: { farmExportedStrategy },
  });
  next();
});

exports.updateFarmExportedStrategy = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating farmExportedStrategy Id ${id}`);

  const farmExportedStrategy = await FarmExportedStrategy.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated farmExportedStrategy Id=${id}`,
    data: { farmExportedStrategy },
  });
  next();
});

exports.deleteFarmExportedStrategy = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting farmExportedStrategy Id ${id}`);

  const farmExportedStrategy = await FarmExportedStrategy.findByIdAndDelete(
    id
  ).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted farmExportedStrategy Id=${id}`,
    data: { farmExportedStrategy },
  });

  next();
});
