/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const EcommerceStock = require('../../models/ecommerce/ecommerceStockModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllEcommerceStock = catchAsync(async (req, res, next) => {
  console.log('Getting All EcommerceStock');

  const ecommerceStocks = await EcommerceStock.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All EcommerceStock',
    results: ecommerceStocks.length,
    data: {
      ecommerceStocks,
    },
  });

  next();
});

exports.getEcommerceStock = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting EcommerceStock for Id ${id}`);

  const ecommerceStock = await EcommerceStock.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got EcommerceStock Id=${id}`,
    Data: { ecommerceStock },
  });

  next();
});

exports.createEcommerceStock = catchAsync(async (req, res, next) => {
  console.log('Creating EcommerceStock');
  const { body } = req;

  // parse through models
  const doc = new EcommerceStock(req.body);

  //  discount
  if (doc.discount) {
    const discountLength = doc.discount.length;
    console.log(`discount length ${discountLength}`);

    for (let i = 0; i < discountLength; i++) {
      doc.discount[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.discount[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.discount[i].createdAt = Date.now();
      doc.discount[i].updatedAt = Date.now();
    }
  }

  // tax
  if (doc.tax) {
    const taxLength = doc.tax.length;
    console.log(`tax length ${taxLength}`);

    for (let i = 0; i < taxLength; i++) {
      doc.tax[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.tax[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.tax[i].createdAt = Date.now();
      doc.tax[i].updatedAt = Date.now();
    }
  }

  // update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id


  // final validation
  await doc.validate();

  // check the doc before doing database operation
  console.log(`After Validation :${doc}`);
  //console.log(doc);

  const ecommerceStock = await EcommerceStock.create(doc).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created EcommerceStock',
    data: { ecommerceStock },
  });

  next();
});

exports.updateEcommerceStock = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating EcommerceStock Id ${id}`);

  const ecommerceStock = await EcommerceStock.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated EcommerceStock Id=${id}`,
    data: { ecommerceStock },
  });

  next();
});

exports.deleteEcommerceStock = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting EcommerceStock Id ${id}`);

  const ecommerceStock = await EcommerceStock.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted EcommerceStock Id=${id}`,
    data: { ecommerceStock },
  });

  next();
});
