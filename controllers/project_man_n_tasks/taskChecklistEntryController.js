const TaskChecklistEntry = {
    _id:{type:mongoose.ObjectId},
    _taskId:{type:mongoose.ObjectId},
    finished:{type:Boolean},
    description:{type:String},
    dateadded:{type:Date},
    addedBy:{type:String},
    listOrder:{type:Number}
}    