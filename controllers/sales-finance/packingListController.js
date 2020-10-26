/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const PackingList = require('../../models/sales-finance/packingListModel');

/* DATABASE */


/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
    const { id } = req.params.id;
    console.log(`ID is ${id}`);
    next();
  };
  
  exports.getAllPackingList = async (req, res, next) => {
    console.log('Getting All Packing List');
  
    try {
      const packingLists = await PackingList.find().then();
  
      res.status(200).json({
        status: 'sucess',
        message: 'Got All Packing List',
        results: packingLists.length,
        data: {
          packingLists,
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
  
  exports.getPackingList = async (req, res, next) => {
    const { id } = req.params;
    console.log(`Getting Packing List for Id ${id}`);
  
    try {
      const packingList = await PackingList.findById(id).then();
      res.status(200).json({
        status: 'sucess',
        message: `Got Packing List Id=${id}`,
        Data: { packingList },
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err,
      });
    }
  
    next();
  };
  
  exports.createPackingList = async (req, res, next) => {
    console.log('Creating PackingList');
  
    try {
      const packingList = await PackingList.create(req.body).then();
  
      res.status(201).json({
        status: 'sucess',
        message: 'Created PackingList',
        data: { packingList },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  
    next();
  };
  
  exports.updatePackingList = async (req, res, next) => {
    const { id } = req.params;
    console.log(`Updating Packing List Id ${id}`);
  
    try {
      const packingList = await PackingList.findByIdAndUpdate(id, req.body, {
        new: true,
      }).then();
  
      res.status(201).json({
        status: 'sucess',
        message: `Updated Packing List Id=${id}`,
        data: { packingList },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  
    next();
  };
  
  exports.deletePackingList = async (req, res, next) => {
    const { id } = req.params;
    console.log(`Deleting Packing List Id ${id}`);
  
    try {
      const packingList = await PackingList.findByIdAndDelete(id).then();
  
      res.status(200).json({
        status: 'sucess',
        message: `Deleted Packing List Id=${id}`,
        data: { packingList },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  
    next();
  };
  
  
