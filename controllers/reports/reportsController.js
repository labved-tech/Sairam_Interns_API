/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Reports = require('../../models/reports/reportsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllReports = catchAsync(async (req, res, next) => {
  console.log('Getting All reports');


    const reports = await Reports.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All reports',
      results: reports.length,
      data: {
        reports,
      },
    });


  next();
});

exports.getReports = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting reports for Id ${id}`);


    const reports = await Reports.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got reports Id=${id}`,
      Data: { reports },
    });


  next();
});

exports.createReports = catchAsync(async (req, res, next) => {
  console.log('Creating reports');
  const { body } = req;
    // parse through models
    const doc = new Reports(body);
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

    const reports = await Reports.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created reports',
      data: { reports },
    });


  next();
});

exports.updateReports = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating Reports Id ${id}`);

  // parse through models
  const ReportsToUpdate = new Reports(body);
  console.log(body);
  const doc = ReportsToUpdate.toObject();
  delete doc._id;


  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  //console.log(doc);


    const reports = await Reports.findByIdAndUpdate(id, doc, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated reports Id=${id}`,
      data: { reports },
    });


  next();
});

exports.deleteReports = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting reports Id ${id}`);


    const reports = await Reports.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted reports Id=${id}`,
      data: { reports },
    });


  next();
});
