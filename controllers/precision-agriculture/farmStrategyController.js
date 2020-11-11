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
    status: 'success',
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
    status: 'success',
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

  //  Stages
  if (doc.stages) {
    const stagesLength = doc.stages.length;
    console.log(`Array of objects  length ${stagesLength}`);

    for (let i = 0; i < stagesLength; i++) {
      //commodities
      if (doc.stages.commodities) {
        const commoditiesLength = doc.stages.commodities.length;
        console.log(`Array of objects length ${commoditiesLength}`);

        for (let j = 0; j < commoditiesLength; j++) {
          doc.stages[i].commodities[j].createdBy = '5f990bb3c727e952a076f3b7';
          doc.stages[i].commodities[j].updatedBy = '5f990bb3c727e952a076f3b7';
          doc.stages[i].commodities[j].createdAt = Date.now();
          doc.stages[i].commodities[j].updatedAt = Date.now();
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

  const farmStrategy = await FarmStrategy.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created farmStrategy',
    data: { farmStrategy },
  });

  next();
});

exports.updateFarmStrategy = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating FarmStrategy Id ${id}`);

  // parse through models
  const FarmStrategyToUpdate = new FarmStrategy(body);
  console.log(body);
  const doc = FarmStrategyToUpdate.toObject();
  delete doc._id;

  const farmStrategy = await FarmStrategy.findByIdAndUpdate(id, doc, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
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
    status: 'success',
    message: `Deleted farmStrategy Id=${id}`,
    data: { farmStrategy },
  });

  next();
});
