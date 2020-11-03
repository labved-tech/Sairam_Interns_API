/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const RatingEntries = require('../../models/ratings/ratingEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllRatingEntries = catchAsync(async (req, res, next)=> {
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

exports.getRatingEntries = catchAsync(async (req, res, next)=> {
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

exports.createRatingEntries = catchAsync(async (req, res, next)=> {
  console.log('Creating RatingEntries');
  // parse through models
  const doc = new RatingEntries(req.body);
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
  
    const ratingEntries = await RatingEntries.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created RatingEntries',
      data: { ratingEntries },
    });


  next();
});

exports.updateRatingEntries = catchAsync(async (req, res, next)=> {
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

exports.deleteRatingEntries = catchAsync(async (req, res, next)=> {
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
