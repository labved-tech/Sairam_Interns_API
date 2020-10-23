/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const EcommerceOrder = require('./../../models/ecommerce/ecommerceOrderModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllEcommerceOrder = async (req, res, next) => {
  console.log('Getting All EcommerceOrder');

  try {
    const ecommerceOrders = await EcommerceOrder.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All EcommerceOrder',
      results: ecommerceOrders.length,
      data: {
        ecommerceOrders,
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

exports.getecommerceOrder = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting EcommerceOrder for Id ${id}`);

  try {
    const ecommerceOrder = await EcommerceOrder.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got EcommerceOrder Id=${id}`,
      Data: { ecommerceOrder },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createEcommerceOrder = async (req, res, next) => {
  console.log('Creating EcommerceOrder');

  try {
    const ecommerceOrder = await EcommerceOrder.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created EcommerceOrder',
      data: { ecommerceOrder },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateEcommerceOrder = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating EcommerceOrder Id ${id}`);

  try {
    const ecommerceOrder = await EcommerceOrder.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated EcommerceOrder Id=${id}`,
      data: { ecommerceOrder },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteEcommerceOrder = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting EcommerceOrder Id ${id}`);

  try {
    const ecommerceOrder = await EcommerceOrder.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted EcommerceOrder Id=${id}`,
      data: { ecommerceOrder },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};