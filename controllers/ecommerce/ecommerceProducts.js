/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const EcommerceProducts = require('./../../models/ecommerce/ecommerceProductsModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllEcommerceProducts = async (req, res, next) => {
  console.log('Getting All EcommerceProducts');

  try {
    const ecommerceProductss = await EcommerceProducts.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All EcommerceProducts',
      results: ecommerceProductss.length,
      data: {
        ecommerceProductss,
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

exports.getecommerceProducts = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting EcommerceProducts for Id ${id}`);

  try {
    const ecommerceProducts = await EcommerceProducts.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got EcommerceProducts Id=${id}`,
      Data: { ecommerceProducts },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createEcommerceProducts = async (req, res, next) => {
  console.log('Creating EcommerceProducts');

  try {
    const ecommerceProducts = await EcommerceProducts.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created EcommerceProducts',
      data: { ecommerceProducts },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateEcommerceProducts = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating EcommerceProducts Id ${id}`);

  try {
    const ecommerceProducts = await EcommerceProducts.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated EcommerceProducts Id=${id}`,
      data: { ecommerceProducts },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteEcommerceProducts = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting EcommerceProducts Id ${id}`);

  try {
    const ecommerceProducts = await EcommerceProducts.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted EcommerceProducts Id=${id}`,
      data: { ecommerceProducts },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};