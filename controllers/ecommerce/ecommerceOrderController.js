/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const EcommerceOrder = require('../../models/ecommerce/ecommerceOrderModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllEcommerceOrder = catchAsync(async (req, res, next)=> {
  console.log('Getting All EcommerceOrder');

  
    const ecommerceOrders = await EcommerceOrder.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All EcommerceOrder',
      results: ecommerceOrders.length,
      data: {
        ecommerceOrders,
      },
    });


  next();
});

exports.getEcommerceOrder = catchAsync(async (req, res, next)=> {
  const { id } = req.params;
  console.log(`Getting EcommerceOrder for Id ${id}`);

  
    const ecommerceOrder = await EcommerceOrder.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got EcommerceOrder Id=${id}`,
      Data: { ecommerceOrder },
    });


  next();
});

exports.createEcommerceOrder = catchAsync(async (req, res, next)=> {
  console.log('Creating EcommerceOrder');

  // parse through models
  const doc = new EcommerceOrder(req.body);
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
    const ecommerceOrder = await EcommerceOrder.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created EcommerceOrder',
      data: { ecommerceOrder },
    });


  next();
});

exports.updateEcommerceOrder = catchAsync(async (req, res, next)=> {
  const { id } = req.params;
  console.log(`Updating EcommerceOrder Id ${id}`);

  
    const ecommerceOrder = await EcommerceOrder.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated EcommerceOrder Id=${id}`,
      data: { ecommerceOrder },
    });


  next();
});

exports.deleteEcommerceOrder = catchAsync(async (req, res, next)=> {
  const { id } = req.params;
  console.log(`Deleting EcommerceOrder Id ${id}`);

  
    const ecommerceOrder = await EcommerceOrder.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted EcommerceOrder Id=${id}`,
      data: { ecommerceOrder },
    });


  next();
});