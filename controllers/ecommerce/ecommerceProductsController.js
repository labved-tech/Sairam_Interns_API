/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const EcommerceProducts = require('../../models/ecommerce/ecommerceProductsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllEcommerceProducts = catchAsync(async (req, res, next) => {
  console.log('Getting All EcommerceProducts');

  const ecommerceProductss = await EcommerceProducts.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All EcommerceProducts',
    results: ecommerceProductss.length,
    data: {
      ecommerceProductss,
    },
  });

  next();
});

exports.getEcommerceProducts = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting EcommerceProducts for Id ${id}`);

  const ecommerceProducts = await EcommerceProducts.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got EcommerceProducts Id=${id}`,
    Data: { ecommerceProducts },
  });

  next();
});

exports.createEcommerceProducts = catchAsync(async (req, res, next) => {
  console.log('Creating EcommerceProducts');
  // parse through models
  const doc = new EcommerceProduct(req.body);
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

  const ecommerceProducts = await EcommerceProducts.create(doc).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created EcommerceProducts',
    data: { ecommerceProducts },
  });

  next();
});

exports.updateEcommerceProducts = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating EcommerceProducts Id ${id}`);

  const ecommerceProducts = await EcommerceProducts.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated EcommerceProducts Id=${id}`,
    data: { ecommerceProducts },
  });

  next();
});

exports.deleteEcommerceProducts = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting EcommerceProducts Id ${id}`);

  const ecommerceProducts = await EcommerceProducts.findByIdAndDelete(
    id
  ).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted EcommerceProducts Id=${id}`,
    data: { ecommerceProducts },
  });

  next();
});
