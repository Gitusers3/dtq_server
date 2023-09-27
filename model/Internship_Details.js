const mongoose=require('mongoose')
const {Schema}=mongoose



const Internship_Details=new Schema({
  
    internship_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'interships'
    },
    student_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'students'
    },
    start_date:{
        type:Date,
        required:false
    },
    end_date:{
        type:Date,
        required:false
    },
    start_time:{
        type:String,
        required:false
    },
    end_time:{
        type:String,
        required:false
    },
    no_of_days:{
        type:String,
        required:false
    },
    no_of_hours:{
        type:String,
        required:false
    },
   
    total_fees:{
        type:Number,
        required:false
    },
    status:{
        type:String,
        required:false
    },
    created_at:{
        type:Date,
        required:true,
        default:Date.now()
    },
    updated_at:{
        type:String,
        required:false
    }


})


module.exports=mongoose.model("internship_details",Internship_Details)