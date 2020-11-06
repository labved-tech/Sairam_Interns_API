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
  console.log('Creating FarmStrategy');
  const { body } = req;

  // parse through models
  const doc = new FarmStrategy(body);

  // extRefObject

  //  Stages
  if (doc.stages) {
    const commoditiesLength = doc.stages.commodities.length;
    console.log(`Array of objects length ${commoditiesLength}`);

    for (let i = 0; i < commoditiesLength; i++) {
      //commodities
      if (doc.stages.commodities) {
        const commoditiesLength = doc.stages.commodities.length;
        console.log(`Array of objects length ${commoditiesLength}`);
    
        for (let j = 0; j < commoditiesLength; j++) {
          doc.stages.commodities[j].createdBy = '5f990bb3c727e952a076f3b7';
          doc.stages.commodities[j].updatedBy = '5f990bb3c727e952a076f3b7';
          doc.stages.commodities[j].createdAt = Date.now();
          doc.stages.commodities[j].updatedAt = Date.now();
        }
      }
      doc.stages[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.stages[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.stages[i].createdAt = Date.now();
      doc.stages[i].updatedAt = Date.now();
    }
  }

  doc.createdBy = '5f990bb3c727e952a076f3b7';
  doc.updatedBy = '5f990bb3c727e952a076f3b7';

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(`After Validation :${doc}`);

  //const FarmStrategy = await doc.save({ validateBeforeSave: false });
 
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
