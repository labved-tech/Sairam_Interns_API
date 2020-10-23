/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const EcommerceLocation = require('./../../models/ecommerce/ecommerceLocationModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllEcommerceLocation = async (req, res, next) => {
  console.log('Getting All EcommerceLocation');

  try {
    const ecommerceLocations = await EcommerceLocation.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All EcommerceLocation',
      results: ecommerceLocations.length,
      data: {
        ecommerceLocations,
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

exports.getecommerceLocation = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting EcommerceLocation for Id ${id}`);

  try {
    const ecommerceLocation = await EcommerceLocation.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got EcommerceLocation Id=${id}`,
      Data: { ecommerceLocation },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createEcommerceLocation = async (req, res, next) => {
  console.log('Creating EcommerceLocation');

  try {
    const ecommerceLocation = await EcommerceLocation.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created EcommerceLocation',
      data: { ecommerceLocation },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateEcommerceLocation = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating EcommerceLocation Id ${id}`);

  try {
    const ecommerceLocation = await EcommerceLocation.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated EcommerceLocation Id=${id}`,
      data: { ecommerceLocation },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteEcommerceLocation = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting EcommerceLocation Id ${id}`);

  try {
    const ecommerceLocation = await EcommerceLocation.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted EcommerceLocation Id=${id}`,
      data: { ecommerceLocation },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};