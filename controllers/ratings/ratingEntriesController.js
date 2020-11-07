/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const RatingEntries = require('../../models/ratings/ratingEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllRatingEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All RatingEntries');

  const ratingEntriess = await RatingEntries.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All RatingEntries',
    results: ratingEntriess.length,
    data: {
      ratingEntriess,
    },
  });

  next();
});

exports.getRatingEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting RatingEntries for Id ${id}`);

  const ratingEntries = await RatingEntries.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got RatingEntries Id=${id}`,
    Data: { ratingEntries },
  });

  next();
});

exports.createRatingEntries = catchAsync(async (req, res, next) => {
  console.log('Creating RatingEntries');
  const { body } = req;

  // parse through models
  const doc = new RatingEntries(body);

  //  ratingEntries
  if (doc.meta) {
    const metaLength = doc.meta.length;
    console.log(`ratingEntries length ${metaLength}`);

    for (let i = 0; i < metaLength; i++) {
      doc.meta[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.meta[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.meta[i].createdAt = Date.now();
      doc.meta[i].updatedAt = Date.now();
    }
  }

  // update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  console.log(`After Validation :${doc}`);

  const ratingEntries = await RatingEntries.create(doc).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created RatingEntries',
    data: { ratingEntries },
  });

  next();
});

exports.updateRatingEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating RatingEntries Id ${id}`);

  const ratingEntries = await RatingEntries.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated RatingEntries Id=${id}`,
    data: { ratingEntries },
  });

  next();
});

exports.deleteRatingEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting RatingEntries Id ${id}`);

  const ratingEntries = await RatingEntries.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted RatingEntries Id=${id}`,
    data: { ratingEntries },
  });

  next();
});
