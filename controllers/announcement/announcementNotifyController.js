/* DEPENDENCIES */
const mongoose = require('mongoose');

/* MIDDLEWARES */
const announcementNotify = require('./../../models/announcement/announcementNotifyModel');

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
    const announcementNotify = await announcementNotify.find().then();

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

exports.getannouncementNotify= async (req, res, next) => {
  const { id } = req.params;
  console.log(`Getting announcementNotify for Id ${id}`);

  try {
    const announcementNotify = await announcementNotify.findById(id).then();
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

exports.createannouncementNotify = async (req, res, next) => {
  console.log('Creating announcementNotify');

  try {
    const announcementNotify = await announcementNotify.create(req.body).then();

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

exports.updateannouncementNotify = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Updating announcementNotify Id ${id}`);

  try {
    const announcementNotify= await announcementNotify.findByIdAndUpdate(id, req.body, {
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

exports.deleteannouncementNotify= async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting announcementNotify Id ${id}`);

  try {
    const announcementNotify = await announcementNotify.findByIdAndDelete(id).then();

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
