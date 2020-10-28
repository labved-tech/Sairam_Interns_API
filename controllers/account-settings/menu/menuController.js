/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const Menu = require('../../../models/account-settings/menu/menuManagerModel');

/* DATABASE */

/* CONTROLLERS */
exports.getAllMenu = async (req, res, next) => {
  console.log('Getting All Menu');

  try {
    const menus = await Menu.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All Menus',
      results: menus.length,
      data: {
        menus,
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

exports.getOneMenu = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Menu with Id ${id}`);

  try {
    const menu = await Menu.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got Menu Id=${id}`,
      data: { menu },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createMenu = async (req, res, next) => {
  console.log('Creating Menu');
  //console.log(req.body);

  const { menuItems } = req.body;
  console.log(menuItems);

  try {
    const newMenu = await Menu.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created Menu',
      data: {
        newMenu,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateMenu = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Menu Id ${id}`);

  try {
    const menu = await Menu.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated Menu Id=${id}`,
      data: { menu },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteMenu = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Menu Id ${id}`);

  try {
    const menu = await Menu.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted Menu Id=${id}`,
      data: { menu },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
