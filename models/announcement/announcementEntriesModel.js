/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const announcementEntriesSchema = new Schema({

    _id : {type: moogoose.ObjectId},
    title : {type: String},
    message : {type: String},
    from : {type: String},
    isEmailReq : {type: Boolean},
    priority : {type: String},
    targetConditions :[ {
        _id : {type: mongoose.ObjectId},
        condition : {type: Object},
    }],
    expires : {type: Number},
    status : {type: String},
    createdBy : {type: mongoose.ObjectId},
    createdAt : {type: Date},
    updatedAt : {type: Date}
});

/* MODEL */
const AnnouncementEntries  = mongoose.model('announcementEntries', announcementEntriesSchema);

/* EXPORT */
module.exports = AnnouncementEntries;
