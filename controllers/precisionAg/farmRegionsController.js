/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const FarmRegions = require('./../../models/precisionAg/farmRegionsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllFarmRegions = async (req, res, next) => {
  console.log('Getting All farmRegions');

  try {
    const farmRegions = await FarmRegions.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All farmRegions',
      results: farmRegions.length,
      data: {
        farmRegions,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.getFarmRegions = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting farmRegions for Id ${id}`);

  try {
    const farmRegions = await FarmRegions.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got farmRegions Id=${id}`,
      Data: { farmRegions },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createFarmRegions = async (req, res, next) => {
  console.log('Creating farmRegions');

  try {
    const farmRegions = await FarmRegions.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created farmRegions',
      data: { farmRegions },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateFarmRegions = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating farmRegions Id ${id}`);

  try {
    const farmRegions = await FarmRegions.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated farmRegions Id=${id}`,
      data: { farmRegions },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteFarmRegions = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting farmRegions Id ${id}`);

  try {
    const farmRegions = await FarmRegions.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted farmRegions Id=${id}`,
      data: { farmRegions },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
