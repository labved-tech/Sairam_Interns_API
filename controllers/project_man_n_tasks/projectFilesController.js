const ProjectDiscussionComments = {
    _id:{type:mongoose.ObjectId},
    fileName:{type:String},
    fileType:{type:String},
    subject:{type:String},
    description:{type:String},
    dateadded:{type:Date},
    _projectId:{type:mongoose.ObjectId},
    _userId:{type:mongoose.ObjectId},
    external:{type:String},
    thumbnailLink:{type:String}
}    