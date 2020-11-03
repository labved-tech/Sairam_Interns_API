/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const EcommerceLocations = require('../../models/ecommerce/ecommerceLocationsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllEcommerceLocations = catchAsync(async (req, res, next) => {
  console.log('Getting All EcommerceLocations');

  const ecommerceLocationss = await EcommerceLocations.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All EcommerceLocations',
    results: ecommerceLocationss.length,
    data: {
      ecommerceLocationss,
    },
  });

  next();
});

exports.getEcommerceLocations = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting EcommerceLocations for Id ${id}`);

  const ecommerceLocations = await EcommerceLocations.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got EcommerceLocations Id=${id}`,
    Data: { ecommerceLocations },
  });

  next();
});

exports.createEcommerceLocations = catchAsync(async (req, res, next) => {
  console.log('Creating EcommerceLocations');
  // parse through models
  const doc = new EcommerceLocations(req.body);
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

  const ecommerceLocations = await EcommerceLocations.create(doc).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created EcommerceLocations',
    data: { ecommerceLocations },
  });

  next();
});

exports.updateEcommerceLocations = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating EcommerceLocations Id ${id}`);

  const ecommerceLocations = await EcommerceLocations.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated EcommerceLocations Id=${id}`,
    data: { ecommerceLocations },
  });

  next();
});

exports.deleteEcommerceLocations = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting EcommerceLocations Id ${id}`);

  const ecommerceLocations = await EcommerceLocations.findByIdAndDelete(
    id
  ).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted EcommerceLocations Id=${id}`,
    data: { ecommerceLocations },
  });

  next();
});
