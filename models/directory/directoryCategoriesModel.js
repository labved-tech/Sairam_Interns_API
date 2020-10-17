const directoryCategories = {
    _id:{type:mongoose.ObjectId},
    name:{type:String},   
    slug:{type:String},
    _attributeGroupsId:{type:mongoose.ObjectId},
    _ratingAttributeGroupId:{type:mongoose.ObjectId}
}