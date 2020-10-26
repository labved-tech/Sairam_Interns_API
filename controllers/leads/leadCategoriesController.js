/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const LeadCategories = require('./../../models/leads/leadCategoriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllLeadCategories = async (req, res, next) => {
  console.log('Getting All leadCategories');

  try {
    const leadCategories = await LeadCategories.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All leadCategories',
      results: leadCategories.length,
      data: {
        leadCategories,
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

exports.getLeadCategories = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting leadCategories for Id ${id}`);

  try {
    const leadCategories = await LeadCategories.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got leadCategories Id=${id}`,
      Data: { leadCategories },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createLeadCategories = async (req, res, next) => {
  console.log('Creating leadCategories');

  try {
    const leadCategories = await LeadCategories.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created leadCategories',
      data: { leadCategories },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateLeadCategories = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating leadCategories Id ${id}`);

  try {
    const leadCategories = await LeadCategories.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated leadCategories Id=${id}`,
      data: { leadCategories },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteLeadCategories = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting leadCategories Id ${id}`);

  try {
    const leadCategories = await LeadCategories.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted leadCategories Id=${id}`,
      data: { leadCategories },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
