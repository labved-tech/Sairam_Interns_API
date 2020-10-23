/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const FarmResponse = require('./../../models/precisionAg/farmResponseModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllFarmResponse = async (req, res, next) => {
  console.log('Getting All farmResponse');

  try {
    const farmResponses = await FarmResponse.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All farmResponse',
      results: farmResponses.length,
      data: {
        farmResponses,
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

exports.getFarmResponse = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting farmResponse for Id ${id}`);

  try {
    const farmResponse = await FarmResponse.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got farmResponse Id=${id}`,
      Data: { farmResponse },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createFarmResponse = async (req, res, next) => {
  console.log('Creating farmResponse');

  try {
    const farmResponse = await FarmResponse.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created farmResponse',
      data: { farmResponse },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateFarmResponse = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating farmResponse Id ${id}`);

  try {
    const farmResponse = await FarmResponse.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated farmResponse Id=${id}`,
      data: { farmResponse },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteFarmResponse = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting farmResponse Id ${id}`);

  try {
    const farmResponse = await FarmResponse.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted farmResponse Id=${id}`,
      data: { farmResponse },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
