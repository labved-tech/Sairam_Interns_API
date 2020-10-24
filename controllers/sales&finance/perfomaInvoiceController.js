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
    console.log('Getting All Perfoma Invoice ');
  
    try {
      const perfomaInvoice  = await PerfomaInvoice .find().then();
  
      res.status(200).json({
        status: 'sucess',
        message: 'Got All Perfoma Invoice ',
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
    console.log(`Getting Perfoma Invoice for Id ${id}`);
  
    try {
      const perfomaInvoice = await PerfomaInvoice. findById(id).then();
      res.status(200).json({
        status: 'sucess',
        message: `Got Perfoma Invoice Id=${id}`,
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
    console.log('Creating Perfoma Invoice' );
  
    try {
      const perfomaInvoice = await PerfomaInvoice .create(req.body).then();
  
      res.status(201).json({
        status: 'sucess',
        message: 'Created Perfoma Invoice' ,
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
    console.log(`Updating Perfoma Invoice Id ${id}`);
  
    try {
      const perfomaInvoice = await PerfomaInvoice .findByIdAndUpdate(id, req.body, {
        new: true,
      }).then();
  
      res.status(201).json({
        status: 'sucess',
        message: `Updated Perfoma Invoice Id=${id}`,
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
    console.log(`Deleting Perfoma Invoice Id ${id}`);
  
    try {
      const perfomaInvoice = await PerfomaInvoice. findByIdAndDelete(id).then();
  
      res.status(200).json({
        status: 'sucess',
        message: `Deleted Perfoma Invoice Id=${id}`,
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
  