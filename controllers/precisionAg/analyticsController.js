const analytics = {
        _id:{type:mongoose.ObjectId},
    name:{type:String},
    state:{type:Object},
    _ownerid:{type:mongoose.ObjectId}, 
    _reportid:{type:mongoose.ObjectId}
}