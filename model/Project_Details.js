const mongoose=require('mongoose')
const {Schema}=mongoose



const Project_Details=new Schema({
  
    project_title:{
        type:String,
        required:false
    },
    project_client_name:{
        type:String,
        required:false
    },
    project_client_address:{
        type:String,
        required:false
    },
    project_client_contact:{
        type:Number,
        required:false
    },
    project_client_email:{
        type:String,
        required:false
    },
    project_description:{
        type:String,
        required:false
    },
    front_end_pro_lang:{
        type:String,
        required:false
    },
    backend_pro_lang:{
        type:String,
        required:false
    },
    staff_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref:'staff'
    },
    college_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'colleges'
    },
    schedule_from:{
        type:Date,
        required:false
    },
    schedule_to:{
        type:Date,
        required:false
    },
  
    duration:{
        type:String,
        required:false
    },
    total_fees:{
        type:Number,
        required:false
    },
    pstatus:{
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


module.exports=mongoose.model("project_details",Project_Details)