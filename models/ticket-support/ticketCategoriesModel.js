
/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const ticketCategoriesSchema = new Schema(
    {
    _id : {type: mongoose.ObjectId},
    name : {type: String},
    description : {type: String},
    notes : {type: String},
    status : {type: String},
    createdAt : {type: Date},
    updatedAt: {type: Date},
    createdBy : {type: mongoose.ObjectId},
    updatedBy : {type: mongoose.ObjectId}
});

/* MODEL */
const TicketCategories = mongoose.model('ticketCategories', ticketCategoriesSchema);

/* EXPORT */
module.exports = TicketCategories;

