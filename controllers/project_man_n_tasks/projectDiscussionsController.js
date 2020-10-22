const ProjectDiscussion = {
    _id:{type:mongoose.ObjectId},
    _projectId:{type:mongoose.ObjectId},
    subject:{type:String},
    description:{type:String},
    datecreated:{type:Date},
    lastActivity:{type:Date},
    startedBy:{type:String}
}    