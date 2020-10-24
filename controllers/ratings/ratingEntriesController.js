/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const RatingEntries = require('../../models/ratings/ratingEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllRatingEntries = async (req, res, next) => {
  console.log('Getting All RatingEntries');

  try {
    const ratingEntriess = await RatingEntries.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All RatingEntries',
      results: ratingEntriess.length,
      data: {
        ratingEntriess,
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

exports.getRatingEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting RatingEntries for Id ${id}`);

  try {
    const ratingEntries = await RatingEntries.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got RatingEntries Id=${id}`,
      Data: { ratingEntries },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createRatingEntries = async (req, res, next) => {
  console.log('Creating RatingEntries');

  try {
    const ratingEntries = await RatingEntries.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created RatingEntries',
      data: { ratingEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateRatingEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating RatingEntries Id ${id}`);

  try {
    const ratingEntries = await RatingEntries.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated RatingEntries Id=${id}`,
      data: { ratingEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteRatingEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting RatingEntries Id ${id}`);

  try {
    const ratingEntries = await RatingEntries.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted RatingEntries Id=${id}`,
      data: { ratingEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
