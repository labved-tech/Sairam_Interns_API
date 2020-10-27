/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const FarmEntries = require('../../models/precision-agriculture/farmEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllFarmEntries = async (req, res, next) => {
  console.log('Getting All farmEntries');

  try {
    const farmEntries = await FarmEntries.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All farmEntries',
      results: farmEntries.length,
      data: {
        farmEntries,
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

exports.getFarmEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting farmEntries for Id ${id}`);

  try {
    const farmEntries = await FarmEntries.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got farmEntries Id=${id}`,
      Data: { farmEntries },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createFarmEntries = async (req, res, next) => {
  console.log('Creating farmEntries');

  try {
    const farmEntries = await FarmEntries.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created farmEntries',
      data: { farmEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateFarmEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating farmEntries Id ${id}`);

  try {
    const farmEntries = await FarmEntries.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated farmEntries Id=${id}`,
      data: { farmEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteFarmEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting farmEntries Id ${id}`);

  try {
    const farmEntries = await FarmEntries.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted farmEntries Id=${id}`,
      data: { farmEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
