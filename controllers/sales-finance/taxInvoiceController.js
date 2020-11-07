/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const TaxInvoice = require('./../../models/sales-finance/taxInvoiceModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
    const { id } = req.params.id;
    console.log(`ID is ${id}`);
    next();
  };
  
  exports.getAllTaxInvoice = catchAsync(async (req, res, next) => {
    console.log('Getting All Tax Invoice');
    const taxInvoices = await TaxInvoice.find().then();
  
    res.status(200).json({
      status: 'sucess',
      message: 'Got All Tax Invoice',
      results: taxInvoices.length,
      data: {
        taxInvoices,
      },
    });
    next();
  });
  
  exports.getTaxInvoice = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    console.log(`Getting Tax Invoice for Id ${id}`);
    const taxInvoice = await TaxInvoice.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got Tax Invoice Id=${id}`,
      Data: { taxInvoice },
    });
    next();
  });
  
  exports.createTaxInvoice = catchAsync(async (req, res, next) => {
    console.log('Creating Tax Invoice');
    const {body} = req;

    // parse through models
  const doc = new TaxInvoice(body);
 
  //itemTable
  if (doc.itemTable) {
    const itemTableLength = doc.itemTable.length;
    console.log(`Array of objects length ${itemTableLength}`);

    for (let i = 0; i < itemTableLength; i++) {
      doc.itemTable[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.itemTable[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.itemTable[i].createdAt = Date.now();
      doc.itemTable[i].updatedAt = Date.now();
    }
  }

  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(doc);

    const taxInvoice = await TaxInvoice.create(doc).then();
  
    res.status(201).json({
      status: 'sucess',
      message: 'Created Tax Invoice',
      data: { taxInvoice },
    });
    next();
  });
  
  exports.updateTaxInvoice = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    console.log(`Updating Tax Invoice Id ${id}`);
    const { body } = req;
   
   // parse through models
   const taxInvoiceToUpdate = new TaxInvoice(body);
   console.log(body);
   const doc = taxInvoiceToUpdate.toObject();
   delete doc._id;


if (taxInvoiceToUpdate.itemTable) {
  const len = taxInvoiceToUpdate.itemTable.length;
  console.log(len);
}
 
 
   // update timestamps & Id's
   doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
   doc.updatedAt;
 
   // check the doc before doing database operation
   //console.log(doc);
    const taxInvoice = await TaxInvoice.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated Tax Invoice Id=${id}`,
      data: { taxInvoice },
    });
    next();
  });
  
  exports.deleteTaxInvoice = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    console.log(`Deleting Tax Invoice Id ${id}`);
    const taxInvoice = await TaxInvoice.findByIdAndDelete(id).then();
  
    res.status(200).json({
      status: 'sucess',
      message: `Deleted Tax Invoice Id=${id}`,
      data: { taxInvoice },
    });
    next();
  });
  
