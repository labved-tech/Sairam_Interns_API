/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Analytics = require('../../models/analytics/analyticsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllAnalytics = catchAsync(async (req, res, next) => {
  console.log('Getting All analytics');


    const analytics = await Analytics.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All analytics',
      results: analytics.length,
      data: {
        analytics,
      },
    });


  next();
});

exports.getAnalytics = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting analytics for Id ${id}`);


    const analytics = await Analytics.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got analytics Id=${id}`,
      Data: { analytics },
    });


  next();
});

exports.createAnalytics = catchAsync(async (req, res, next) => {
  console.log('Creating analytics');
    // parse through models
    const doc = new Analytics(req.body);
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

    const analytics = await Analytics.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created analytics',
      data: { analytics },
    });


  next();
});

exports.updateAnalytics = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating Analytics Id ${id}`);

  // parse through models
  const AnalyticsToUpdate = new Analytics(body);
  console.log(body);
  const doc = AnalyticsToUpdate.toObject();
  delete doc._id;


  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);


    const analytics = await Analytics.findByIdAndUpdate(id, doc, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated analytics Id=${id}`,
      data: { analytics },
    });


  next();
});

exports.deleteAnalytics = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting analytics Id ${id}`);


    const analytics = await Analytics.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted analytics Id=${id}`,
      data: { analytics },
    });


  next();
});
