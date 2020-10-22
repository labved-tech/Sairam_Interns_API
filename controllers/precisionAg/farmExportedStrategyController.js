/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const FarmExportedStrategy = require('./../../models/precisionAg/farmExportedStrategyModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllFarmExportedStrategy = async (req, res, next) => {
  console.log('Getting All farmExportedStrategy');

  try {
    const farmExportedStrategys = await FarmExportedStrategy.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All farmExportedStrategy',
      results: farmExportedStrategys.length,
      data: {
        farmExportedStrategys,
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

exports.getfarmExportedStrategy = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting farmExportedStrategy for Id ${id}`);

  try {
    const farmExportedStrategy = await FarmExportedStrategy.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got farmExportedStrategy Id=${id}`,
      Data: { farmExportedStrategy },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createFarmExportedStrategy = async (req, res, next) => {
  console.log('Creating farmExportedStrategy');

  try {
    const farmExportedStrategy = await FarmExportedStrategy.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created farmExportedStrategy',
      data: { farmExportedStrategy },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateFarmExportedStrategy = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating farmExportedStrategy Id ${id}`);

  try {
    const farmExportedStrategy = await FarmExportedStrategy.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated farmExportedStrategy Id=${id}`,
      data: { farmExportedStrategy },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteFarmExportedStrategy = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting farmExportedStrategy Id ${id}`);

  try {
    const farmExportedStrategy = await FarmExportedStrategy.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted farmExportedStrategy Id=${id}`,
      data: { farmExportedStrategy },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
