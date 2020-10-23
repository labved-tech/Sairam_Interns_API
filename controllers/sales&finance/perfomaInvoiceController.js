/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const PerfomaInvoice=require('./../../models/sales & finance/perfomaInvoiceModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
    const { id } = req.params.id;
    console.log(`ID is ${id}`);
    next();
  };
  
  exports.getAllPerfomaInvoice = async (req, res, next) => {
    console.log('Getting All PerfomaInvoice ');
  
    try {
      const perfomaInvoice  = await PerfomaInvoice .find().then();
  
      res.status(200).json({
        status: 'sucess',
        message: 'Got All PerfomaInvoice ',
        results: perfomaInvoice .length,
        data: {
          perfomaInvoice ,
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
  
  exports.getPerfomaInvoice = async (req, res, next) => {
    const { id } = req.params;
    console.log(`Getting PerfomaInvoice for Id ${id}`);
  
    try {
      const perfomaInvoice = await PerfomaInvoice. findById(id).then();
      res.status(200).json({
        status: 'sucess',
        message: `Got PerfomaInvoice Id=${id}`,
        Data: { perfomaInvoice },
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err,
      });
    }
  
    next();
  };
  
  exports.createPerfomaInvoice = async (req, res, next) => {
    console.log('Creating PerfomaInvoice' );
  
    try {
      const perfomaInvoice = await PerfomaInvoice .create(req.body).then();
  
      res.status(201).json({
        status: 'sucess',
        message: 'Created PerfomaInvoice' ,
        data: { perfomaInvoice },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  
    next();
  };
  
  exports.updatePerfomaInvoice = async (req, res, next) => {
    const { id } = req.params;
    console.log(`Updating PerfomaInvoice Id ${id}`);
  
    try {
      const perfomaInvoice = await PerfomaInvoice .findByIdAndUpdate(id, req.body, {
        new: true,
      }).then();
  
      res.status(201).json({
        status: 'sucess',
        message: `Updated PerfomaInvoice Id=${id}`,
        data: { perfomaInvoice },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  
    next();
  };
  
  exports.deletePerfomaInvoice = async (req, res, next) => {
    const { id } = req.params;
    console.log(`Deleting PerfomaInvoice Id ${id}`);
  
    try {
      const perfomaInvoice = await PerfomaInvoice. findByIdAndDelete(id).then();
  
      res.status(200).json({
        status: 'sucess',
        message: `Deleted PerfomaInvoice Id=${id}`,
        data: { perfomaInvoice },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  
    next();
  };
  