/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const EcommerceAddress = require('../../models/ecommerce/ecommerceAddressModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllEcommerceAddress = catchAsync(async (req, res, next) => {
  console.log('Getting All Ecommerce Address');

  const ecommerceAddresss = await EcommerceAddress.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All ecommerceAddress',
    results: ecommerceAddresss.length,
    data: {
      ecommerceAddresss,
    },
  });

  next();
});

exports.getEcommerceAddress = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting ecommerceAddress for Id ${id}`);

  const ecommerceAddress = await EcommerceAddress.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got ecommerceAddress Id=${id}`,
    Data: { ecommerceAddress },
  });

  next();
});

exports.createEcommerceAddress = catchAsync(async (req, res, next) => {
  console.log('Creating Ecommerce Address');
  // parse through models
  const doc = new EcommerceAddress(req.body);
  console.log(doc);


  // update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.createdAt;
  doc.updatedAt;

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(doc);

  const ecommerceAddress = await EcommerceAddress.create(doc).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created ecommerceAddress',
    data: { ecommerceAddress },
  });

  next();
});

exports.updateEcommerceAddress = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating ecommerceAddress Id ${id}`);

  // parse through models
  const ecommerceAddressToUpdate = new ecommerceAddress(body);
  console.log(body);
  const doc = ecommerceAddressToUpdate.toObject();
  delete doc._id;


  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);

  const ecommerceAddress = await EcommerceAddress.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated ecommerceAddress Id=${id}`,
    data: { ecommerceAddress },
  });

  next();
});

exports.deleteEcommerceAddress = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting ecommerceAddress Id ${id}`);

  const ecommerceAddress = await EcommerceAddress.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted ecommerceAddress Id=${id}`,
    data: { ecommerceAddress },
  });

  next();
});
