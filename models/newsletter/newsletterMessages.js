/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const newsletterMessagesSchema = new Schema({
    _id:{type:mongoose.ObjectId},
    _newsletterId:{type:mongoose.ObjectId},
    subject:{type:String},
    message:{type:String},
    recipientEmail:{type:String},
    sent:{type:Boolean},
    visited:{type:Boolean},
    lastVisited:{type:Boolean},

});

/* MODEL */
const NewsletterMessages = mongoose.model('newsletterMessages', newsletterMessagesSchema);

/* EXPORT */
module.exports = NewsletterMessages;
