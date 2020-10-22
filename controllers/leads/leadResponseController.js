/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const LeadResponse = require('./../../models/leads/leadResponseModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllLeadResponse = async (req, res, next) => {
  console.log('Getting All LeadResponse');

  try {
    const leadResponses = await LeadResponse.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All LeadResponse',
      results: leadResponses.length,
      data: {
        leadResponses,
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

exports.getLeadResponse = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting LeadResponse for Id ${id}`);

  try {
    const leadResponse = await LeadResponse.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got LeadResponse Id=${id}`,
      Data: { leadResponse },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createLeadResponse = async (req, res, next) => {
  console.log('Creating LeadResponse');

  try {
    const leadResponse = await LeadResponse.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created LeadResponse',
      data: { leadResponse },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateLeadResponse = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating LeadResponse Id ${id}`);

  try {
    const leadResponse = await LeadResponse.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated LeadResponse Id=${id}`,
      data: { leadResponse },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteLeadResponse = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting LeadResponse Id ${id}`);

  try {
    const leadResponse = await LeadResponse.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted LeadResponse Id=${id}`,
      data: { leadResponse },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};