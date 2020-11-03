/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const FarmRegions = require('../../models/precision-agriculture/farmRegionsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllFarmRegions = async (req, res, next) => {
  console.log('Getting All farmRegions');

  const farmRegions = await FarmRegions.find().then();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All farmRegions',
    results: farmRegions.length,
    data: {
      farmRegions,
    },
  });
  next();
};

exports.getFarmRegions = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting farmRegions for Id ${id}`);

  const farmRegions = await FarmRegions.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got farmRegions Id=${id}`,
    Data: { farmRegions },
  });
  next();
};

exports.createFarmRegions = async (req, res, next) => {
  console.log('Creating farmRegions');
    // parse through models
    const doc = new FarmRegions(req.body);
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
  const farmRegions = await FarmRegions.create(doc).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created farmRegions',
    data: { farmRegions },
  });

  next();
};

exports.updateFarmRegions = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating farmRegions Id ${id}`);

  const farmRegions = await FarmRegions.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated farmRegions Id=${id}`,
    data: { farmRegions },
  });

  next();
};

exports.deleteFarmRegions = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting farmRegions Id ${id}`);

  const farmRegions = await FarmRegions.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted farmRegions Id=${id}`,
    data: { farmRegions },
  });
  next();
};
