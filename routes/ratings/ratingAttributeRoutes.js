const ratingAttribute = {
    _id:{type:mongoose.ObjectId},
    Name:{type:String}, 
    type:{type:String},
    Description:{type:String}, 
    Notes:{type:String},
    status:{type:String},    
    updatedAt:{type:Date}, 
    updatedBy:{type:mongoose.ObjectId},
    createdAt:{type:Date},
    createdBy:{type:mongoose.ObjectId}    
}