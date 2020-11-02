/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Quotation = require('./../../models/sales-finance/quotationModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
    const { id } = req.params.id;
    console.log(`ID is ${id}`);
    next();
  };
  
  exports.getAllQuotation = catchAsync(async (req, res, next) => {
    console.log('Getting All Quotation');
    const quotation = await Quotation.find().then();
  
    res.status(200).json({
      status: 'sucess',
      message: 'Got All Quotation',
      results: quotation.length,
      data: {
        quotations,
      },
    });
    next();
  });
  
  exports.getQuotation = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    console.log(`Getting Quotation for Id ${id}`);
    const quotation = await Quotation.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got Quotation Id=${id}`,
      Data: { quotation },
    }); 
    next();
  });
  
  exports.createQuotation = catchAsync(async (req, res, next) => {
    console.log('Creating Quotation');
    // parse through models
  const doc = new AnnouncementEntries(req.body);
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

    const quotation = await Quotation.create(doc).then();
  
    res.status(201).json({
      status: 'sucess',
      message: 'Created Quotation',
      data: { quotation },
    }); 
    next();
  });
  
  exports.updateQuotation = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    console.log(`Updating Quotation Id ${id}`);
    const quotation = await Quotation.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated Quotation Id=${id}`,
      data: { Quotation },
    });  
    next();
  });
  
  exports.deleteQuotation = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    console.log(`Deleting Quotation Id ${id}`);
    const quotation = await Quotation.findByIdAndDelete(id).then();
  
    res.status(200).json({
      status: 'sucess',
      message: `Deleted Quotation Id=${id}`,
      data: { quotation },
    });
    next();
  });
  