/* DEPENDENCIES */
const mongoose = require('mongoose');

/* SCHEMA CONSTRUCTOR */
const { Schema } = mongoose;

/* SCHEMA */
const commentEntriesSchema = new Schema({
    _id:{type:mongoose.ObjectId},
    _commentorId:{type:mongoose.ObjectId},
    relName:{type:String},
    _relId:{type:mongoose.ObjectId},
    rating:{type:Number},
    message:{type:String},
    commentReplies:{
        [
            {

                message:{type:String},
                _commentorId:{type:mongoose.ObjectId},
                createdAt:{type:Date},
                updatedAt:{type:Date},
                _id:{type:mongoose.ObjectId}
            }    
        ]
    },
    status:{type:String},
    createdAt:{type:Date},
    updatedAt:{type:Date}
});

/* MODEL */
const CommentEntries = mongoose.model('commentEntries',  commentEntriesSchema);

/* EXPORT */
module.exports = CommentEntries;