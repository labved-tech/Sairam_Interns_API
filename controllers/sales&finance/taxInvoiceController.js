/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const TaxInvoice = require('./../../models/sales & finance/taxInvoiceModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
    const { id } = req.params.id;
    console.log(`ID is ${id}`);
    next();
  };
  
  exports.getAllTaxInvoice = async (req, res, next) => {
    console.log('Getting All TaxInvoice');
  
    try {
      const taxInvoices = await TaxInvoice.find().then();
  
      res.status(200).json({
        status: 'sucess',
        message: 'Got All TaxInvoice',
        results: taxInvoices.length,
        data: {
          taxInvoices,
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
  
  exports.getTaxInvoice = async (req, res, next) => {
    const { id } = req.params;
    console.log(`Getting TaxInvoice for Id ${id}`);
  
    try {
      const taxInvoice = await TaxInvoice.findById(id).then();
      res.status(200).json({
        status: 'sucess',
        message: `Got TaxInvoice Id=${id}`,
        Data: { taxInvoice },
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err,
      });
    }
  
    next();
  };
  
  exports.createTaxInvoice = async (req, res, next) => {
    console.log('Creating TaxInvoice');
  
    try {
      const taxInvoice = await TaxInvoice.create(req.body).then();
  
      res.status(201).json({
        status: 'sucess',
        message: 'Created TaxInvoice',
        data: { taxInvoice },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  
    next();
  };
  
  exports.updateTaxInvoice = async (req, res, next) => {
    const { id } = req.params;
    console.log(`Updating TaxInvoice Id ${id}`);
  
    try {
      const taxInvoice = await TaxInvoice.findByIdAndUpdate(id, req.body, {
        new: true,
      }).then();
  
      res.status(201).json({
        status: 'sucess',
        message: `Updated TaxInvoice Id=${id}`,
        data: { taxInvoice },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  
    next();
  };
  
  exports.deleteTaxInvoice = async (req, res, next) => {
    const { id } = req.params;
    console.log(`Deleting TaxInvoice Id ${id}`);
  
    try {
      const taxInvoice = await TaxInvoice.findByIdAndDelete(id).then();
  
      res.status(200).json({
        status: 'sucess',
        message: `Deleted TaxInvoice Id=${id}`,
        data: { taxInvoice },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  
    next();
  };
  
