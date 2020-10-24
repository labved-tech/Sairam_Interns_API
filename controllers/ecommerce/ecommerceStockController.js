/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const EcommerceStock = require('../../models/ecommerce/ecommerceStockModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllEcommerceStock = async (req, res, next) => {
  console.log('Getting All EcommerceStock');

  try {
    const ecommerceStocks = await EcommerceStock.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All EcommerceStock',
      results: ecommerceStocks.length,
      data: {
        ecommerceStocks,
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

exports.getEcommerceStock = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting EcommerceStock for Id ${id}`);

  try {
    const ecommerceStock = await EcommerceStock.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got EcommerceStock Id=${id}`,
      Data: { ecommerceStock },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createEcommerceStock = async (req, res, next) => {
  console.log('Creating EcommerceStock');

  try {
    const ecommerceStock = await EcommerceStock.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created EcommerceStock',
      data: { ecommerceStock },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateEcommerceStock = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating EcommerceStock Id ${id}`);

  try {
    const ecommerceStock = await EcommerceStock.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated EcommerceStock Id=${id}`,
      data: { ecommerceStock },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteEcommerceStock = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting EcommerceStock Id ${id}`);

  try {
    const ecommerceStock = await EcommerceStock.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted EcommerceStock Id=${id}`,
      data: { ecommerceStock },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};