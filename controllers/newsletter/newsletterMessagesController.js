/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const appError = require('../../utils/appError');
const NewsletterMessages = require('./../../models/newsletter/newsletterMessagesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllNewsletterMessages = catchAsync(async (req, res, next) => {
  console.log('Getting All Newsletter Messages');
  const newsletterMessagess = await NewsletterMessages.find();

  res.status(200).json({
    status: 'sucess',
    message: 'Got All Newsletter Messages',
    results: newsletterMessagess.length,
    data: {
      newsletterMessagess,
    },
  });
  next();
});

exports.getNewsletterMessages = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Newsletter Messages for Id ${id}`);
  const newsletterMessages = await NewsletterMessages.findById(id).then();
  res.status(200).json({
    status: 'sucess',
    message: `Got Newsletter Messages Id=${id}`,
    Data: { newsletterMessages },
  });
  
  next();
});

exports.createNewsletterMessages = catchAsync(async (req, res, next) => {
  console.log('Creating Newsletter Messages');
  // parse through models
  const doc = new NewsletterMessages(req.body);
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
  constnewsletterMessages = await NewsletterMessages.create(doc).then();

  res.status(201).json({
    status: 'sucess',
    message: 'Created Newsletter Messages',
    data: { newsletterMessages },
  });
  next();
});

exports.updateNewsletterMessages = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating Newsletter Messages Id ${id}`);
  const newsletterMessages = await NewsletterMessages.findByIdAndUpdate(id, req.body, {
    new: true,
  }).then();

  res.status(201).json({
    status: 'sucess',
    message: `Updated Newsletter Messages Id=${id}`,
    data: { newsletterMessages },
  });
  next();
});

exports.deleteNewsletterMessages = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Newsletter Messages Id ${id}`);
  const newsletterMessages = await NewsletterMessages.findByIdAndDelete(id).then();

  res.status(200).json({
    status: 'sucess',
    message: `Deleted Newsletter Messages Id=${id}`,
    data: { newsletterMessages },
  });

  next();
});
