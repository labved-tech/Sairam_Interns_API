/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const LeadEntries = require('./../../models/leads/leadEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllLeadEntries = async (req, res, next) => {
  console.log('Getting All LeadEntries');

  try {
    const leadEntries = await LeadEntries.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All LeadEntries',
      results: leadEntries.length,
      data: {
        leadEntries,
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

exports.getLeadEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting leadEntries for Id ${id}`);

  try {
    const leadEntries = await LeadEntries.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got leadEntries Id=${id}`,
      Data: { leadEntries },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createLeadEntries = async (req, res, next) => {
  console.log('Creating LeadEntries');

  try {
    const leadEntries = await LeadEntries.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created leadEntries',
      data: { leadEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateLeadEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating LeadEntries Id ${id}`);

  try {
    const leadEntries = await LeadEntries.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated leadEntries Id=${id}`,
      data: { leadEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteLeadEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting LeadEntries Id ${id}`);

  try {
    const leadEntries = await LeadEntries.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted LeadEntries Id=${id}`,
      data: { leadEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};