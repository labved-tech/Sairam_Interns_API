/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const PackingList = require('./../../models/sales-finance/packingListModel');

/* DATABASE */


/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
    const { id } = req.params.id;
    console.log(`ID is ${id}`);
    next();
  };
  
  exports.getAllPackingList = catchAsync(async (req, res, next) => {
    console.log('Getting All Packing List');
    const packingLists = await PackingList.find().then();
  
    res.status(200).json({
      status: 'sucess',
      message: 'Got All Packing List',
      results: packingLists.length,
      data: {
        packingLists,
      },
    });
    
    next();
  });
  
  exports.getPackingList = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    console.log(`Getting Packing List for Id ${id}`);
    const packingList = await PackingList.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got Packing List Id=${id}`,
      Data: { packingList },
    });
    
    next();
  });
  
  exports.createPackingList = catchAsync(async (req, res, next) => {
    console.log('Creating PackingList');

  // parse through models
  const doc = new PackingList(req.body);
  console.log(doc);

  // validate seperately sub-documents if necessary

  // replace doc if necessary

  // update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.createdAt;
  doc.updatedAt;

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(doc);
    const packingList = await PackingList.create(doc).then();
  
    res.status(201).json({
      status: 'sucess',
      message: 'Created PackingList',
      data: { packingList },
    });
    
    next();
  });
  
  exports.updatePackingList = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    console.log(`Updating Packing List Id ${id}`);
     // parse through models
   const packingListToUpdate = new PackingList(body);
   console.log(body);
   const doc =  packingListToUpdate.toObject();
   delete doc._id;
 
 
   // update timestamps & Id's
   doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
   doc.updatedAt;
 
   // check the doc before doing database operation
   //console.log(doc);
    const packingList = await PackingList.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated Packing List Id=${id}`,
      data: { packingList },
    });
    
    next();
  });
  
  exports.deletePackingList = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    console.log(`Deleting Packing List Id ${id}`);
    const packingList = await PackingList.findByIdAndDelete(id).then();
  
    res.status(200).json({
      status: 'sucess',
      message: `Deleted Packing List Id=${id}`,
      data: { packingList },
    });
    
    next();
  });
  
  
