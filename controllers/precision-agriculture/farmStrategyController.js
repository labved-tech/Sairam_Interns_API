/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const FarmStrategy = require('../../models/precision-agriculture/farmStrategyModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllFarmStrategy = async (req, res, next) => {
  console.log('Getting All farmStrategy');

  try {
    const farmStrategys = await FarmStrategy.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All farmStrategy',
      results: farmStrategys.length,
      data: {
        farmStrategys,
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

exports.getFarmStrategy = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting farmStrategy for Id ${id}`);

  try {
    const farmStrategy = await FarmStrategy.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got farmStrategy Id=${id}`,
      Data: { farmStrategy },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createFarmStrategy = async (req, res, next) => {
  console.log('Creating farmStrategy');

  try {
    const farmStrategy = await FarmStrategy.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created farmStrategy',
      data: { farmStrategy },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateFarmStrategy = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating farmStrategy Id ${id}`);

  try {
    const farmStrategy = await FarmStrategy.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated farmStrategy Id=${id}`,
      data: { farmStrategy },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteFarmStrategy = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting farmStrategy Id ${id}`);

  try {
    const farmStrategy = await FarmStrategy.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted farmStrategy Id=${id}`,
      data: { farmStrategy },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
