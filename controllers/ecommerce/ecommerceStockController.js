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

exports.getAllEcommerceStock = catchAsync(async (req, res, next)=> {
  console.log('Getting All EcommerceStock');

  
    const ecommerceStocks = await EcommerceStock.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All EcommerceStock',
      results: ecommerceStocks.length,
      data: {
        ecommerceStocks,
      },
    });


  next();
});

exports.getEcommerceStock = catchAsync(async (req, res, next)=> {
  const { id } = req.params;
  console.log(`Getting EcommerceStock for Id ${id}`);

  
    const ecommerceStock = await EcommerceStock.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got EcommerceStock Id=${id}`,
      Data: { ecommerceStock },
    });


  next();
});

exports.createEcommerceStock = catchAsync(async (req, res, next)=> {
  console.log('Creating EcommerceStock');
// parse through models
const doc = new EcommerceStock(req.body);
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
  
    const ecommerceStock = await EcommerceStock.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created EcommerceStock',
      data: { ecommerceStock },
    });


  next();
});

exports.updateEcommerceStock = catchAsync(async (req, res, next)=> {
  const { id } = req.params;
  console.log(`Updating EcommerceStock Id ${id}`);

  
    const ecommerceStock = await EcommerceStock.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated EcommerceStock Id=${id}`,
      data: { ecommerceStock },
    });


  next();
});

exports.deleteEcommerceStock = catchAsync(async (req, res, next)=> {
  const { id } = req.params;
  console.log(`Deleting EcommerceStock Id ${id}`);

  
    const ecommerceStock = await EcommerceStock.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted EcommerceStock Id=${id}`,
      data: { ecommerceStock },
    });


  next();
});