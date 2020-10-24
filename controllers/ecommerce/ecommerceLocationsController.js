/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const EcommerceLocations = require('./../../models/ecommerce/ecommerceLocationsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllEcommerceLocations = async (req, res, next) => {
  console.log('Getting All EcommerceLocations');

  try {
    const ecommerceLocationss = await EcommerceLocations.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All EcommerceLocations',
      results: ecommerceLocationss.length,
      data: {
        ecommerceLocationss,
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

exports.getEcommerceLocations = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting EcommerceLocations for Id ${id}`);

  try {
    const ecommerceLocations = await EcommerceLocations.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got EcommerceLocations Id=${id}`,
      Data: { ecommerceLocations },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createEcommerceLocations = async (req, res, next) => {
  console.log('Creating EcommerceLocations');

  try {
    const ecommerceLocations = await EcommerceLocations.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created EcommerceLocations',
      data: { ecommerceLocations },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateEcommerceLocations = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating EcommerceLocations Id ${id}`);

  try {
    const ecommerceLocations = await EcommerceLocations.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated EcommerceLocations Id=${id}`,
      data: { ecommerceLocations },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteEcommerceLocations = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting EcommerceLocations Id ${id}`);

  try {
    const ecommerceLocations = await EcommerceLocations.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted EcommerceLocations Id=${id}`,
      data: { ecommerceLocations },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};