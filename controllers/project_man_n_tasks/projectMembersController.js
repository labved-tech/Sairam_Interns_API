const projectMembers = {
    _id:{type:mongoose.ObjectId},
    _projectId:{type:mongoose.ObjectId},
    _userId:{type:mongoose.ObjectId},
    status:{type:String},
    createdAt:{type:Date},
    updatedAt:{type:Date},
    createdBy:{type:mongoose.ObjectId},
    updatedBy:{type:mongoose.ObjectId}
    
}