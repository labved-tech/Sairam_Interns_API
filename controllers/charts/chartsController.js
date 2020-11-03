/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Charts = require('../../models/charts/chartsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllCharts = catchAsync(async (req, res, next) => {
  console.log('Getting All charts');


    const charts = await Charts.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All charts',
      results: charts.length,
      data: {
        charts,
      },
    });


  next();
});

exports.getCharts = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting charts for Id ${id}`);


    const charts = await Charts.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got charts Id=${id}`,
      Data: { charts },
    });


  next();
});

exports.createCharts = catchAsync(async (req, res, next) => {
  console.log('Creating charts');
    // parse through models
    const doc = new Charts(req.body);
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

    const charts = await Charts.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created charts',
      data: { charts },
    });


  next();
});

exports.updateCharts = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating charts Id ${id}`);


    const charts = await Charts.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated charts Id=${id}`,
      data: { charts },
    });


  next();
});

exports.deleteCharts = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting charts Id ${id}`);


    const charts = await Charts.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted charts Id=${id}`,
      data: { charts },
    });


  next();
});
