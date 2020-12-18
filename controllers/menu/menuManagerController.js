/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const MenuManager = require('../../models/menu/menuManagerModel');

/* DATABASE */

/* CONTROLLERS */
exports.getAllMenuManagerSel2 = catchAsync(async (req, res, next) => {
  console.log('Getting All Menu Manager for Select2');
  const { body } = req;
  console.log(body);

  let manager;
  manager = await MenuManager.find().then();
  manager = JSON.stringify(manager);

  const mapObj = {
    _id: 'id',
    name: 'text',
  };

  manager = manager.replace(/_id|name/gi, function (matched) {
    return mapObj[matched];
  });

  manager = JSON.parse(manager);

  res.status(200).json({
    status: 'success',
    message: 'Got Menu Manager',
    manager,
  });
});
exports.getMenuManagerSel2 = catchAsync(async (req, res, next) => {
  console.log('Getting All Menu Manager for Select2');
  const { body } = req;
  const { params } = req;
  const { query } = req;
  console.log('rawBody :', body);
  console.log('rawParams :', params);
  console.log('rawQuery :', query);

  let manager;
  manager = await MenuManager.findById(params.id).then();
  console.log(manager);
  manager = JSON.stringify(manager);

  const mapObj = {
    _id: 'id',
    name: 'text',
  };

  manager = manager.replace(/_id|name/gi, function (matched) {
    return mapObj[matched];
  });

  manager = JSON.parse(manager);

  res.status(200).json({
    status: 'success',
    message: 'Got Menu Manager',
    manager,
  });
});

exports.getAllMenuManager = catchAsync(async (req, res, next) => {
  console.log('Getting All Menu Manager');
  // const { body } = req;
  // console.log(body);

  const manager = await MenuManager.find().then();

  res.status(200).json({
    status: 'success',
    message: 'Got Menu Manager',
    manager,
  });
});

exports.getMenuManager = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Menu with Id ${id}`);

  const manager = await MenuManager.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got Menu Id=${id}`,
    manager,
  });

  next();
});

exports.createMenuManager = catchAsync(async (req, res, next) => {
  console.log('Creating Menu');
  //console.log(req.body);

  // parse through models
  const doc = new MenuManager(req.body);
  console.log(doc);

  // update timestamps & Id's
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.createdAt;
  doc.updatedAt;

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(doc);

  const manager = await MenuManager.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created Menu',
    manager,
  });

  next();
});

exports.updateMenuManager = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating Menu Id ${id}`);

  // parse through models
  const menuToUpdate = new MenuManager(body);
  const doc = menuToUpdate.toObject();
  delete doc._id;

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  // check the doc before doing database operation
  console.log(doc);

  const manager = await MenuManager.findByIdAndUpdate(id, doc, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'success',
    message: `Updated Menu Id=${id}`,
    manager,
  });

  next();
});

exports.deleteMenuManager = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Menu Id ${id}`);

  const manager = await MenuManager.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted Menu Id=${id}`,
    manager,
  });

  next();
});
