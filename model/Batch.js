const mongoose=require('mongoose')
const {Schema}=mongoose



const Batch=new Schema({
    b_name:{
        type:String,
        required:true
    },
    d_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'division'
    },
    college_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'colleges'
    },
    class_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'class'
    },
    tech_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'staff'
    }],
    project_id:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'project_details'
    }],
   
    c_date:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        required:true
    },
    u_date:{
        type:Date,
        required:false
    },timings:[]
})
module.exports=mongoose.model("batch",Batch)