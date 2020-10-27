/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const Charts = require('../../models/precision-agriculture/chartsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllCharts = async (req, res, next) => {
  console.log('Getting All charts');

  try {
    const charts = await Charts.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All charts',
      results: charts.length,
      data: {
        charts,
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

exports.getCharts = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting charts for Id ${id}`);

  try {
    const charts = await Charts.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got charts Id=${id}`,
      Data: { charts },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createCharts = async (req, res, next) => {
  console.log('Creating charts');

  try {
    const charts = await Charts.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created charts',
      data: { charts },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateCharts = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating charts Id ${id}`);

  try {
    const charts = await Charts.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated charts Id=${id}`,
      data: { charts },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteCharts = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting charts Id ${id}`);

  try {
    const charts = await Charts.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted charts Id=${id}`,
      data: { charts },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
