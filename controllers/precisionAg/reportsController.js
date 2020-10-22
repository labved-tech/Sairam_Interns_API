/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const Reports = require('./../../models/precisionAg/reportsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllReports = async (req, res, next) => {
  console.log('Getting All reports');

  try {
    const reportss = await Reports.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All reports',
      results: reportss.length,
      data: {
        reportss,
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

exports.getReports = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting reports for Id ${id}`);

  try {
    const reports = await Reports.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got reports Id=${id}`,
      Data: { reports },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createReports = async (req, res, next) => {
  console.log('Creating reports');

  try {
    const reports = await Reports.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created reports',
      data: { reports },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateReports = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating reports Id ${id}`);

  try {
    const reports = await Reports.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated reports Id=${id}`,
      data: { reports },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteReports = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting reports Id ${id}`);

  try {
    const reports = await Reports.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted reports Id=${id}`,
      data: { reports },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
