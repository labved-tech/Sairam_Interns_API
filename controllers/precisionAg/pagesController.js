/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const Pages = require('./../../models/precisionAg/pagesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllPages = async (req, res, next) => {
  console.log('Getting All pages');

  try {
    const pages = await Pages.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All pages',
      results: pages.length,
      data: {
        pages,
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

exports.getPages = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting pages for Id ${id}`);

  try {
    const pages = await Pages.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got pages Id=${id}`,
      Data: { pages },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createPages = async (req, res, next) => {
  console.log('Creating pages');

  try {
    const pages = await Pages.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created pages',
      data: { pages },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updatePages = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating pages Id ${id}`);

  try {
    const pages = await Pages.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated pages Id=${id}`,
      data: { pages },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deletePages = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting pages Id ${id}`);

  try {
    const pages = await Pages.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted pages Id=${id}`,
      data: { pages },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
