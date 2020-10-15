/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const Menu = require('../models/menuModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const id = req.params.id * 1;
  console.log(`ID is ${id}`);
  next();
};
exports.getAllMenu = async (req, res, next) => {
  console.log('Getting All Menu');

  try {
    const menus = await Menu.find();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All Menu',
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
  console.log(`Getting One Menu for Id ${id}`);

  try {
    const menu = await Menu.findById(id);
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
  console.log('Created Menu');

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
    req.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateMenu = (req, res, next) => {
  const id = req.params.id * 1;
  console.log(`Updated Menu Id ${id}`);
  res.status(200).json({ status: 'sucess', message: `Updated Menu Id=${id}` });
  next();
};

exports.deleteMenu = (req, res, next) => {
  const id = req.params.id * 1;
  console.log(`Delete Menu Id ${id}`);
  res.status(200).json({ app: 'sucess', message: `Deleted Menu Id=${id}` });
  next();
};
