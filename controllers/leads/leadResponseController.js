const leadResponse = {
    _id:{type:mongoose.ObjectId},
    _leadId:{type:mongoose.ObjectId},
    _responderId:{type:mongoose.ObjectId},
    emailSent:{type:Boolean},
    isStatusChange:{type:Boolean},
    message:{type:String},
    status:{type:String},    
    createdAt:{type:Date},
    createdBy:{type:mongoose.ObjectId},
    updatedAt:{type:Date},
    updatedBy:{type:mongoose.ObjectId}
}