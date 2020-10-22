const TaskTimers = {
    _id:{type:mongoose.ObjectId},
    _taskId:{type:mongoose.ObjectId},
    startTime:{type:Date},
    endTime:{type:Date},
    timeSpend:{type:Number},
    note:{type:String},
    _userId:{type:mongoose.ObjectId}
}    