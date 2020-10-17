/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ticketEntriesSchema = new Schema({
    _id : {type: mongoose.ObjectId},
    _userId : {type: mongoose.ObjectId},
    userName : {type: String},
    userEmail : {type: String},
    userPhoneNumber : {type: String},
    category : {type: String},
    product : {type: String},
    subject : {type: String},
    body : {type: String},
    status : {type: String},
    lastStatusChange : {type: Date},
    assignedTo : {type: String},
    priority : {type: String},
    lastActivityDate : {type: Date},
    lastActivityBy : {type: String},
    _agencyId : {type: mongoose.ObjectId}

});
/* MODEL */
const TicketEntries = mongoose.model('ticketEntries', ticketEntriesSchema);

/* EXPORT */
module.exports = TicketEntries;
