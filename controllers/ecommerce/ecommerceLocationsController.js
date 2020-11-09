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
  const { body } = req;

  // parse through models
  const doc = new EcommerceLocations(req.body);

  //  verifyDocuments
  if (doc.verifyDocuments) {
    const verifyDocumentsLength = doc.verifyDocuments.length;
    console.log(`verifyDocuments length ${verifyDocumentsLength}`);

    for (let i = 0; i < verifyDocumentsLength; i++) {
      doc.verifyDocuments[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.verifyDocuments[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.verifyDocuments[i].createdAt = Date.now();
      doc.verifyDocuments[i].updatedAt = Date.now();
    }
  }

  doc.createdBy = '5f990bb3c727e952a076f3b7';
  doc.updatedBy = '5f990bb3c727e952a076f3b7';


  // final validation
  await doc.validate();

  // check the doc before doing database operation
  console.log(`After Validation :${doc}`);

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
  const { body } = req;
  console.log(`Updating EcommerceLocations Id ${id}`);

  // parse through models
  const EcommerceLocationsToUpdate = new EcommerceLocations(body);
  console.log(body);
  const doc = EcommerceLocationsToUpdate.toObject();
  delete doc._id;



  if (EcommerceLocationsToUpdate.admins) {
    const verifyDocumentsLength = doc.verifyDocuments.length;
    console.log(`Array of objects length ${verifyDocumentsLength}`);

    for (let i = 0; i < verifyDocumentsLength; i++) {
      doc.verifyDocuments[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.verifyDocuments[i].updatedAt = Date.now();
    }
  }

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);
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
