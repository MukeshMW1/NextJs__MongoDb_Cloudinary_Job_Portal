import mongoose,{Schema} from 'mongoose'


const jobSchema =new Schema({

title:String,
description:String,
requirements:[String],
favorite:{

    type:Boolean,
    default:false
},

perks:[String],
salary:String


},

{timestamps:true}
)


const jobModel = mongoose.models.Job || mongoose.model('Job',jobSchema

)


export default jobModel;