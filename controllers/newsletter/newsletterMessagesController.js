/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const NewsletterMessages = require('./../../models/newsletter/newsletterMessagesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllNewsletterMessages = async (req, res, next) => {
  console.log('Getting All NewsletterMessages');

  try {
    const newsletterMessagess = await NewsletterMessages.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All NewsletterMessages',
      results: newsletterMessagess.length,
      data: {
        newsletterMessagess,
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

exports.getNewsletterMessages = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting NewsletterMessages for Id ${id}`);

  try {
    const newsletterMessages = await NewsletterMessages.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got NewsletterMessages Id=${id}`,
      Data: { newsletterMessages },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createNewsletterMessages = async (req, res, next) => {
  console.log('Creating NewsletterMessages');

  try {
    constnewsletterMessages = await NewsletterMessages.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created NewsletterMessages',
      data: { newsletterMessages },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateNewsletterMessages = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating NewsletterMessages Id ${id}`);

  try {
    const newsletterMessages = await NewsletterMessages.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated NewsletterMessages Id=${id}`,
      data: { newsletterMessages },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteNewsletterMessages = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting NewsletterMessages Id ${id}`);

  try {
    const newsletterMessages = await NewsletterMessages.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted NewsletterMessages Id=${id}`,
      data: { newsletterMessages },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
