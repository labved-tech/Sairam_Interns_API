/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const Analytics = require('../../models/analytics/analyticsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllAnalytics = async (req, res, next) => {
  console.log('Getting All analytics');

  try {
    const analytics = await Analytics.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All analytics',
      results: analytics.length,
      data: {
        analytics,
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

exports.getAnalytics = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting analytics for Id ${id}`);

  try {
    const analytics = await Analytics.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got analytics Id=${id}`,
      Data: { analytics },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createAnalytics = async (req, res, next) => {
  console.log('Creating analytics');

  try {
    const analytics = await Analytics.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created analytics',
      data: { analytics },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateAnalytics = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating analytics Id ${id}`);

  try {
    const analytics = await Analytics.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated analytics Id=${id}`,
      data: { analytics },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteAnalytics = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting analytics Id ${id}`);

  try {
    const analytics = await Analytics.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted analytics Id=${id}`,
      data: { analytics },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
