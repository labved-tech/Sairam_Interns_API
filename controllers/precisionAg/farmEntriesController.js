const farmEntries = {
    _id:{type:mongoose.ObjectId},
    _ownerId:{type:mongoose.ObjectId},
    admins:{
        [
            {
                _adminId:{type:mongoose.ObjectId},
                permissions:{type:String}
            }

        ]
    },
    name:{type:String},
    description:{type:String},
    notes:{type:String},
    status:{type:String},
    address:{type: Object},
    gpsCoordinates:{type:Map},
    size:{
        size:{type:Number},
        units:{type:String}
    },
    documents:[],
    createdBy:{type:mongoose.ObjectId},
    createdAt:{type:Date},
    updatedBy:{type:mongoose.ObjectId},
    updatedAt:{type:Date}
        
}