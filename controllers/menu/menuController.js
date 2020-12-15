/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const { text } = require('express');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const MenuManager = require('../../models/menu/menuManagerModel');

/* DATABASE */

/* CONTROLLERS */
exports.getAllMenu = catchAsync(async (req, res, next) => {
  console.log('Getting All Menu');
  console.log(req.query);

  const menuManagerStr = req.query.manager;
  let manager;

  if (menuManagerStr === undefined) {
    manager = await MenuManager.find()
      .populate({
        path: '_section',
        populate: {
          path: '_item',
          populate: {
            path: '_subItem1',
            populate: { path: '_subItem2' },
          },
        },
      })
      .then();
  } else {
    manager = await MenuManager.find({ name: menuManagerStr })
      .populate({
        path: '_section',
        populate: {
          path: '_item',
          populate: {
            path: '_subItem1',
            populate: { path: '_subItem2' },
          },
        },
      })
      .then();
  }

  res.status(200).json({
    status: 'success',
    message: 'Got Menu',
    manager,
  });
});

exports.getAllMenuTree = catchAsync(async (req, res, next) => {
  console.log('Getting All Menu');
  console.log(req.query);

  const menuManagerStr = req.query.manager;
  let manager;

  if (menuManagerStr === undefined) {
    manager = await MenuManager.find()
      .populate({
        path: '_section',
        populate: {
          path: '_item',
          populate: {
            path: '_subItem1',
            populate: { path: '_subItem2' },
          },
        },
      })
      .then();
  } else {
    manager = await MenuManager.find({ name: menuManagerStr })
      .populate({
        path: '_section',
        populate: {
          path: '_item',
          populate: {
            path: '_subItem1',
            populate: { path: '_subItem2' },
          },
        },
      })
      .then();
  }
  manager = JSON.stringify(manager);

  const mapObj = {
    _section: 'children',
    _item: 'children',
    _subItem1: 'children',
    _subItem2: 'children',
    _id: 'id',
    name: 'text',
  };

  manager = manager.replace(
    /_section|_item|_subItem1|_subItem2|_id|name/gi,
    function (matched) {
      return mapObj[matched];
    }
  );
  // manager = manager.replace('"_section":', '"children":');
  manager = JSON.parse(manager);

  res.status(200).json({
    status: 'success',
    message: 'Got Menu',
    manager,
  });
});

exports.getMenu = catchAsync(async (req, res, next) => {
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

exports.createMenu = catchAsync(async (req, res, next) => {
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

exports.updateMenu = catchAsync(async (req, res, next) => {
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

exports.deleteMenu = catchAsync(async (req, res, next) => {
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
