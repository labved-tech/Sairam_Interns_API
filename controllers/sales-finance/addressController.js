/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Address = require('./../../models/sales-finance/addressModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllAddress = catchAsync(async (req, res, next) => {
  console.log('Getting All Address');
  const address = await Address.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All Address',
    results: address.length,
    data: {
     address,
    },
  });
  next();
});

exports.getAddress = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Address for Id ${id}`);

  const address = await Address.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got Address Id=${id}`,
    Data: {address },
  });
  
  next();
});

exports.createAddress = catchAsync(async (req, res, next) => {
  console.log('Creating Address');

   // parse through models
   const doc = new Address(req.body);
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
  const address = await Address.create(doc).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created Address',
    data: {address },
  });

  next();
});

exports.updateAddress = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Address Id ${id}`);
  const { body } = req;
    
   // parse through models
   const addressToUpdate = new Address(body);
   console.log(body);
   const doc = addressToUpdate.toObject();
   delete doc._id;
 
 
   // update timestamps & Id's
   doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
   doc.updatedAt;
 
   // check the doc before doing database operation
   //console.log(doc);
  const address = await Address.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated Address Id=${id}`,
    data: {address },
  });
  next();
});

exports.deleteAddress =catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Address Id ${id}`);
  const address = await Address.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted Address Id=${id}`,
    data: {address },
  });
  next();
});
