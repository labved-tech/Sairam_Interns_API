/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const catchAsync = require('../../utils/catchAsync');
const appError = require('../../utils/appError');
const NewsletterEntries = require('../../models/newsletter/newsletterEntriesModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllNewsletterEntries = catchAsync(async (req, res, next) => {
  console.log('Getting All Newsletter Entries');
  const newsletterEntriess = await NewsletterEntries.find();

  res.status(200).json({
    status: 'success',
    message: 'Got All Newsletter Entries',
    results: newsletterEntriess.length,
    data: {
      newsletterEntriess,
    },
  });
  next();
});

exports.getNewsletterEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting Newsletter Entries for Id ${id}`);
  const newsletterEntries = await NewsletterEntries.findById(id).then();
  res.status(200).json({
    status: 'success',
    message: `Got Newsletter Entries Id=${id}`,
    Data: { newsletterEntries },
  });
  next();
});

exports.createNewsletterEntries = catchAsync(async (req, res, next) => {
  console.log('Creating Newsletter Entries');
  const { body } = req;

  // parse through models
  const doc = new NewsletterEntries(body);
  console.log(body);

  //extRefObject

  //lists
  if (doc.lists) {
    const listsLength = doc.lists.length;
    console.log(`Array of objects length ${listsLength}`);

    for (let i = 0; i < listsLength; i++) {
      doc.lists[i].createdBy = '5f990bb3c727e952a076f3b7';
      doc.lists[i].updatedBy = '5f990bb3c727e952a076f3b7';
      doc.lists[i].createdAt = Date.now();
      doc.lists[i].updatedAt = Date.now();
    }
  }
  doc.createdBy = '5f990bb3c727e952a076f3b7'; // user id

  // final validation
  await doc.validate();

  // check the doc before doing database operation
  //console.log(doc);

  const newsletterEntries = await NewsletterEntries.create(doc).then();

  res.status(201).json({
    status: 'success',
    message: 'Created Newsletter Entries',
    data: { newsletterEntries },
  });
  next();
});

exports.updateNewsletterEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  console.log(`Updating Newsletter Entries Id ${id}`);

  // parse through models
  const newsletterEntriesToUpdate = new NewsletterEntries(body);
  console.log(body);
  const doc = newsletterEntriesToUpdate.toObject();
  delete doc._id;

  if (newsletterEntriesToUpdate.lists) {
    const len = newsletterEntriesToUpdate.lists.length;
    console.log(len);
  }

  // update timestamps & Id's
  doc.updatedBy = '5f990bb3c727e952a076f3b7'; // user id
  doc.updatedAt;

  //console.log(doc);
  const newsletterEntries = await NewsletterEntries.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  ).then();

  res.status(201).json({
    status: 'success',
    message: `Updated Newsletter Entries Id=${id}`,
    data: { newsletterEntries },
  });
  next();
});

exports.deleteNewsletterEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting Newsletter Entries Id ${id}`);
  const newsletterEntries = await NewsletterEntries.findByIdAndDelete(
    id
  ).then();

  res.status(200).json({
    status: 'success',
    message: `Deleted Newsletter Entries Id=${id}`,
    data: { newsletterEntries },
  });
  next();
});
