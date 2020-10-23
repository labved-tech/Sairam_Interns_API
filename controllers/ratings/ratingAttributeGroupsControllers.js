const ratingAttributeGroups = {
    _id:{type:mongoose.ObjectId},
    Name:{type:String}, 
    _attributId:{type:mongoose.ObjectId},
    status:{type:String}, 
    Description:{type:String},
    updatedAt:{type:Date}, 
    updatedBy:{type:mongoose.ObjectId},
    createdAt:{type:Date},
    createdBy:{type:mongoose.ObjectId}    
}