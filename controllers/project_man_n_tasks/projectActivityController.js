const ProjectActivity = {
    _id:{type:mongoose.ObjectId},
    _projectId:{type:mongoose.ObjectId},
    _userId:{type:mongoose.ObjectId},
    fullName:{type:String},
    visibleToUser:{type:Boolean},
    descriptionKey:{type:String},
    additionalData:{type:String},
    dateadded:{type:Date}
}    