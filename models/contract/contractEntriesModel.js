/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const contractEntriesSchema = new Schema({
    _id : {type: mongoose.ObjectId},
    _contractOwnerId : {type: mongoose.ObjectId},
    _clientId : {type: mongoose.ObjectId},
    clientAccepted : {type: Boolean},
    acceptedDate : {type: Date},
    contractNumber : {type: String},
    _contractTemplateId : {type: mongoose.ObjectId},
    rel : {type: String},
    _relId : {type: mongoose.ObjectId},
    validFrom : {type: Date},
    validTill : {type: Date},
    validity : {type: Number},
    billingType : {type: String},
    rate : {type : Number},
    tax : {
            _id : { type: mongoose.ObjectId},
            HSNCode : {type: String},
            CGSTRate : {type: Number},
            SGSTRate : {type: Number},
            IGSTRate : {type: Number},
    },
    contractFileURL : {type: String},
    additionalAttributes : {type: String},
    signedContractUploaded : {type: String},
    termsAndConditions : [],
    status : {type: String}
});

/* MODEL */
const ContractEntries = mongoose.model('contractEntries', contractEntriesSchema);

/* EXPORT */
module.exports = ContractEntries;

