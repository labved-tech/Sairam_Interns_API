const TaskChecklistStatus = {
    _id:{type:mongoose.ObjectId},
    _taskId:{type:mongoose.ObjectId},
    finished:{type:Boolean},
    _taskChecklistId:{type:mongoose.ObjectId},
    dateadded:{type:Date},
    addedBy:{type:String},
    listOrder:{type:Number}
}    