/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const RatingAttributeGroup = require('./../../models/ratings/ratingAttributeGroupModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllRatingAttributeGroup = async (req, res, next) => {
  console.log('Getting All RatingAttributeGroup');

  try {
    const ratingAttributeGroups = await RatingAttributeGroup.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All RatingAttributeGroup',
      results: ratingAttributeGroups.length,
      data: {
        ratingAttributeGroups,
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

exports.getRatingAttributeGroup = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting RatingAttributeGroup for Id ${id}`);

  try {
    const ratingAttributeGroup = await RatingAttributeGroup.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got RatingAttributeGroup Id=${id}`,
      Data: { ratingAttributeGroup },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createRatingAttributeGroup = async (req, res, next) => {
  console.log('Creating RatingAttributeGroup');

  try {
    const ratingAttributeGroup = await RatingAttributeGroup.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created RatingAttributeGroup',
      data: { ratingAttributeGroup },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateRatingAttributeGroup = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating RatingAttributeGroup Id ${id}`);

  try {
    const ratingAttributeGroup = await RatingAttributeGroup.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated RatingAttributeGroup Id=${id}`,
      data: { ratingAttributeGroup },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteRatingAttributeGroup = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting RatingAttributeGroup Id ${id}`);

  try {
    const ratingAttributeGroup = await RatingAttributeGroup.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted RatingAttributeGroup Id=${id}`,
      data: { ratingAttributeGroup },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
