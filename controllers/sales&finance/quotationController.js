/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const Quotation = require('./../../models/sales & finance/quotationModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
    const { id } = req.params.id;
    console.log(`ID is ${id}`);
    next();
  };
  
  exports.getAllQuotation = async (req, res, next) => {
    console.log('Getting All Quotation');
  
    try {
      const quotation = await Quotation.find().then();
  
      res.status(200).json({
        status: 'sucess',
        message: 'Got All Quotation',
        results: quotation.length,
        data: {
          quotations,
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
  
  exports.getQuotation = async (req, res, next) => {
    const { id } = req.params;
    console.log(`Getting Quotation for Id ${id}`);
  
    try {
      const quotation = await Quotation.findById(id).then();
      res.status(200).json({
        status: 'sucess',
        message: `Got Quotation Id=${id}`,
        Data: { quotation },
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err,
      });
    }
  
    next();
  };
  
  exports.createQuotation = async (req, res, next) => {
    console.log('Creating Quotation');
  
    try {
      const quotation = await Quotation.create(req.body).then();
  
      res.status(201).json({
        status: 'sucess',
        message: 'Created Quotation',
        data: { quotation },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  
    next();
  };
  
  exports.updateQuotation = async (req, res, next) => {
    const { id } = req.params;
    console.log(`Updating Quotation Id ${id}`);
  
    try {
      const quotation = await Quotation.findByIdAndUpdate(id, req.body, {
        new: true,
      }).then();
  
      res.status(201).json({
        status: 'sucess',
        message: `Updated Quotation Id=${id}`,
        data: { Quotation },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  
    next();
  };
  
  exports.deleteQuotation = async (req, res, next) => {
    const { id } = req.params;
    console.log(`Deleting Quotation Id ${id}`);
  
    try {
      const quotation = await Quotation.findByIdAndDelete(id).then();
  
      res.status(200).json({
        status: 'sucess',
        message: `Deleted Quotation Id=${id}`,
        data: { quotation },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  
    next();
  };
  