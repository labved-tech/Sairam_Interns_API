/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const RatingAttribute = require('./../../models/ratings/ratingAttributeModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllRatingAttribute = async (req, res, next) => {
  console.log('Getting All RatingAttribute');

  try {
    const ratingAttributes = await RatingAttribute.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All RatingAttribute',
      results: ratingAttributes.length,
      data: {
        ratingAttributes,
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

exports.getRatingAttribute = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting RatingAttribute for Id ${id}`);

  try {
    const ratingAttribute = await RatingAttribute.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got RatingAttribute Id=${id}`,
      Data: { ratingAttribute },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createRatingAttribute = async (req, res, next) => {
  console.log('Creating RatingAttribute');

  try {
    const ratingAttribute = await RatingAttribute.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created RatingAttribute',
      data: { ratingAttribute },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateRatingAttribute = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating RatingAttribute Id ${id}`);

  try {
    const ratingAttribute = await RatingAttribute.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated RatingAttribute Id=${id}`,
      data: { ratingAttribute },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteRatingAttribute = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting RatingAttribute Id ${id}`);

  try {
    const ratingAttribute = await RatingAttribute.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted RatingAttribute Id=${id}`,
      data: { ratingAttribute },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
