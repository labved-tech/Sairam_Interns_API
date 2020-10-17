const directoryAttributeGroups = {
    _id:{type:mongoose.ObjectId},
    name:{type:String},   
    attributes:{
        [
            {
                _id:{type:mongoose.ObjectId},
                name:{type:String},   
                type:{type:String},
                Description:{type:String},
                notes:{type:String},
                status:{type:String},
                updatedBy:{type:mongoose.ObjectId},
                updatedAt:{type:Date},
                createdBy:{type:mongoose.ObjectId},
                createdAt:{type:Date}        
            }
        ]
    } ,
    status:{type:String},
    description:{type:String},   
    updatedBy:{type:mongoose.ObjectId},
    updatedAt:{type:Date},
    createdBy:{type:mongoose.ObjectId},
    createdAt:{type:Date} 
}