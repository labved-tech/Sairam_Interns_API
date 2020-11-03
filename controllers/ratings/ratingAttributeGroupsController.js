/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const RatingAttributeGroup = require('../../models/ratings/ratingAttributeGroupsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllRatingAttributeGroup = catchAsync(async (req, res, next)=> {
  console.log('Getting All RatingAttributeGroup');

  
    const ratingAttributeGroups = await RatingAttributeGroup.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All RatingAttributeGroup',
      results: ratingAttributeGroups.length,
      data: {
        ratingAttributeGroups,
      },
    });


  next();
});

exports.getRatingAttributeGroup = catchAsync(async (req, res, next)=> {
  const { id } = req.params;
  console.log(`Getting RatingAttributeGroup for Id ${id}`);

  
    const ratingAttributeGroups = await RatingAttributeGroup.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got RatingAttributeGroup Id=${id}`,
      Data: { ratingAttributeGroups },
    });


  next();
});

exports.createRatingAttributeGroup = catchAsync(async (req, res, next)=> {
  console.log('Creating RatingAttributeGroup');
  // parse through models
  const doc = new RatingAttributeGroups(req.body);
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
  
    const ratingAttributeGroups = await RatingAttributeGroup.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created RatingAttributeGroup',
      data: { ratingAttributeGroups },
    });


  next();
});

exports.updateRatingAttributeGroup = catchAsync(async (req, res, next)=> {
  const { id } = req.params;
  console.log(`Updating RatingAttributeGroup Id ${id}`);

  
    const ratingAttributeGroups = await RatingAttributeGroup.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated RatingAttributeGroup Id=${id}`,
      data: { ratingAttributeGroups },
    });


  next();
});

exports.deleteRatingAttributeGroup = catchAsync(async (req, res, next)=> {
  const { id } = req.params;
  console.log(`Deleting RatingAttributeGroup Id ${id}`);

  
    const ratingAttributeGroups = await RatingAttributeGroup.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted RatingAttributeGroup Id=${id}`,
      data: { ratingAttributeGroups },
    });


  next();
});
