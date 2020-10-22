const projectEntries = {
    _id:{type:mongoose.ObjectId},
    name:{type:String},
    description:{type:String},
    status:{type:String},
    startDate:{type:Date},
    deadline:{type:Date},
    finished:{type:Date},
    progress:{type:Number},
    estimatedHours:{type:Number},
    type:{type:String},
    _farmRegionId:{type:mongoose.ObjectId},
    createdAt:{type:Date},
    _createdbyId:{type:mongoose.ObjectId},
    updatedAt:{type:Date}, 
    _updatedbyId:{type:mongoose.ObjectId}
     
}