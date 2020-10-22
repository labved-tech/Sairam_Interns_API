const leadCategories = {
    _id:{type:mongoose.ObjectId},
    name:{type:String},
    description:{type:String},
    notes:{type:String},
    status:{type:String},
    createdAt:{type:Date},
    createdBy:{type:mongoose.ObjectId},
    updatedAt:{type:Date},
    updatedBy:{type:mongoose.ObjectId}
}