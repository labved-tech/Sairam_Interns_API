const TaskReminders = {
    _id:{type:mongoose.ObjectId},
    description:{type:String},
    date:{type:Date},
    isNotified:{type:Boolean},
    timeSpend:{type:Number},
    _taskId:{type:mongoose.ObjectId},
    notifyByEmail:{type:Boolean},
    creator:{type:String}

}    