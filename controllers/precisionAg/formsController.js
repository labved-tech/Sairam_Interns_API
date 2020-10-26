/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const Forms = require('./../../models/precisionAg/formsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllForms = async (req, res, next) => {
  console.log('Getting All forms');

  try {
    const forms = await Forms.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All forms',
      results: forms.length,
      data: {
        forms,
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

exports.getForms = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting forms for Id ${id}`);

  try {
    const forms = await Forms.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got forms Id=${id}`,
      Data: { forms },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createForms = async (req, res, next) => {
  console.log('Creating forms');

  try {
    const forms = await Forms.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created forms',
      data: { forms },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateForms = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating forms Id ${id}`);

  try {
    const forms = await Forms.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated forms Id=${id}`,
      data: { forms },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteForms = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting forms Id ${id}`);

  try {
    const forms = await Forms.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted forms Id=${id}`,
      data: { forms },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
