/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const Pages = require('../../models/pages/pagesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllPages = catchAsync(async (req, res, next) => {
  console.log('Getting All pages');


    const pages = await Pages.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All pages',
      results: pages.length,
      data: {
        pages,
      },
    });


  next();
});

exports.getPages = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting pages for Id ${id}`);


    const pages = await Pages.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got pages Id=${id}`,
      Data: { pages },
    });


  next();
});

exports.createPages = catchAsync(async (req, res, next) => {
  console.log('Creating pages');
    // parse through models
    const doc = new Pages(req.body);
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

    const pages = await Pages.create(doc).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created pages',
      data: { pages },
    });


  next();
});

exports.updatePages = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating pages Id ${id}`);


    const pages = await Pages.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated pages Id=${id}`,
      data: { pages },
    });


  next();
});

exports.deletePages = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting pages Id ${id}`);


    const pages = await Pages.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted pages Id=${id}`,
      data: { pages },
    });


  next();
});
