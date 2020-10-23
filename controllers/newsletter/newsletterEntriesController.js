/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const NewsletterEntries = require('./../../models/newsletter/NewsletterEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllNewsletterEntries = async (req, res, next) => {
  console.log('Getting All NewsletterEntries');

  try {
    const newsletterEntriess = await NewsletterEntries.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All NewsletterEntries',
      results: newsletterEntriess.length,
      data: {
        newsletterEntriess,
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

exports.getNewsletterEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting NewsletterEntries for Id ${id}`);

  try {
    const newsletterEntries = await NewsletterEntries.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got NewsletterEntries Id=${id}`,
      Data: { newsletterEntries },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createNewsletterEntries = async (req, res, next) => {
  console.log('Creating NewsletterEntries');

  try {
    const newsletterEntries = await NewsletterEntries.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created NewsletterEntries',
      data: { newsletterEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateNewsletterEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating NewsletterEntries Id ${id}`);

  try {
    const newsletterEntries = await NewsletterEntries.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated NewsletterEntries Id=${id}`,
      data: { newsletterEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteNewsletterEntries = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting NewsletterEntries Id ${id}`);

  try {
    const newsletterEntries = await NewsletterEntries.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted NewsletterEntries Id=${id}`,
      data: { newsletterEntries },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

