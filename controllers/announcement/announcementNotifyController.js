/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const AnnouncementNotify = require('./../../models/announcement/announcementNotifyModel');

/* DATABASE */

/* CONTROLLERS */
exports.checkID = (req, res, next, val) => {
  const { id } = req.params.id;
  console.log(`ID is ${id}`);
  next();
};

exports.getAllAnnouncementNotify = async (req, res, next) => {
  console.log('Getting All announcementNotify');

  try {
    const announcementNotify = await AnnouncementNotify.find().then();

    res.status(200).json({
      status: 'sucess',
      message: 'Got All announcementNotify',
      results: announcementNotify.length,
      data: {
        announcementNotify,
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

exports.getAnnouncementNotify= async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting announcementNotify for Id ${id}`);

  try {
    const announcementNotify = await AnnouncementNotify.findById(id).then();
    res.status(200).json({
      status: 'sucess',
      message: `Got announcementNotify Id=${id}`,
      Data: { announcementNotify},
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.createAnnouncementNotify = async (req, res, next) => {
  console.log('Creating announcementNotify');

  try {
    const announcementNotify = await AnnouncementNotify.create(req.body).then();

    res.status(201).json({
      status: 'sucess',
      message: 'Created announcementNotify',
      data: { announcementNotify},
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.updateAnnouncementNotify = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating announcementNotify Id ${id}`);

  try {
    const announcementNotify= await AnnouncementNotify.findByIdAndUpdate(id, req.body, {
      new: true,
    }).then();

    res.status(201).json({
      status: 'sucess',
      message: `Updated announcementNotify Id=${id}`,
      data: { announcementNotify},
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};

exports.deleteAnnouncementNotify= async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting announcementNotify Id ${id}`);

  try {
    const announcementNotify = await AnnouncementNotify.findByIdAndDelete(id).then();

    res.status(200).json({
      status: 'sucess',
      message: `Deleted announcementNotify Id=${id}`,
      data: { announcementNotify},
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }

  next();
};
