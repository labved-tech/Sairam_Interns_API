const ProjectDiscussionComments = {
    _id:{type:mongoose.ObjectId},
    _discussionId:{type:mongoose.ObjectId},
    discussionType:{type:String},
    parent:{type:String},
    created:{type:Date},
    modified:{type:Date},
    _commenterId:{type:mongoose.ObjectId},
    fullname:{type:String},
    fileName:{type:String},
    fileType:{type:String},
    _projectId:{type:mongoose.ObjectId}
}    