/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const RatingAttribute = require('../../models/ratings/ratingAttributeModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllRatingAttribute = catchAsync(async (req, res, next)=> {
  console.log('Getting All RatingAttribute');

  const ratingAttributes = await RatingAttribute.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All RatingAttribute',
    results: ratingAttributes.length,
    data: {
      ratingAttributes,
    },
  });
  next();
});

exports.getRatingAttribute = catchAsync(async (req, res, next)=> {
  const { id } = req.params;
  console.log(`Getting RatingAttribute for Id ${id}`);

 
    const ratingAttribute = await RatingAttribute.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got RatingAttribute Id=${id}`,
      Data: { ratingAttribute },
    });


  next();
});

exports.createRatingAttribute = catchAsync(async (req, res, next) => {
  console.log('Creating RatingAttribute');
  // parse through models
  const doc = new RatingAttribute(req.body);
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
  
    const ratingAttribute = await RatingAttribute.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created RatingAttribute',
      data: { ratingAttribute },
    });


  next();
});

exports.updateRatingAttribute = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating RatingAttribute Id ${id}`);

  
    const ratingAttribute = await RatingAttribute.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated RatingAttribute Id=${id}`,
      data: { ratingAttribute },
    });


  next();
});

exports.deleteRatingAttribute = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting RatingAttribute Id ${id}`);

  
    const ratingAttribute = await RatingAttribute.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted RatingAttribute Id=${id}`,
      data: { ratingAttribute },
    });


  next();
});
