/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const PerfomaInvoice = require('./../../models/sales-finance/perfomaInvoiceModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllPerfomaInvoice = catchAsync(async (req, res, next) => {
  console.log('Getting All Perfoma Invoice ');
  const perfomaInvoice = await PerfomaInvoice.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All Perfoma Invoice ',
    results: perfomaInvoice.length,
    data: {
      perfomaInvoice,
    },
  });

  next();
});

exports.getPerfomaInvoice = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Perfoma Invoice for Id ${id}`);
  const perfomaInvoice = await PerfomaInvoice.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got Perfoma Invoice Id=${id}`,
    Data: { perfomaInvoice },
  });
  next();
});

exports.createPerfomaInvoice = catchAsync(async (req, res, next) => {
  console.log('Creating Perfoma Invoice');
  const { body } = req;

  // parse through models
  const doc = new PerfomaInvoice(body);
  console.log(body);

  //paymentMethods
  if (doc.paymentMethods) {
    const paymentMethodsLength = doc.paymentMethods.length;
    console.log(`Array of objects length ${paymentMethodsLength}`);

    for (let i = 0; i < paymentMethodsLength; i++) {
      doc.paymentMethods[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.paymentMethods[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.paymentMethods[i].createdAt = Date.now();
      doc.paymentMethods[i].updatedAt = Date.now();
    }
  }
  //itemTable
  if (doc.itemTable) {
    const itemTableLength = doc.itemTable.length;
    console.log(`Array of objects length ${itemTableLength}`);

    for (let i = 0; i < itemTableLength; i++) {
      doc.itemTable[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.itemTable[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.itemTable[i].createdAt = Date.now();
      doc.itemTable[i].updatedAt = Date.now();
    }
  }


  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id


  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(doc);

  const perfomaInvoice = await PerfomaInvoice.create(doc).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created Perfoma Invoice',
    data: { perfomaInvoice },
  });
  next();
});

exports.updatePerfomaInvoice = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Perfoma Invoice Id ${id}`);
  const { body } = req;

  // parse through models
  const perfomaInvoiceToUpdate = new PerfomaInvoice(body);
  console.log(body);
  const doc = perfomaInvoiceToUpdate.toObject();
  delete doc._id;


  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);
  const perfomaInvoice = await PerfomaInvoice.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated Perfoma Invoice Id=${id}`,
    data: { perfomaInvoice },
  });

  next();
});

exports.deletePerfomaInvoice = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Perfoma Invoice Id ${id}`);
  const perfomaInvoice = await PerfomaInvoice.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted Perfoma Invoice Id=${id}`,
    data: { perfomaInvoice },
  });

  next();
});
