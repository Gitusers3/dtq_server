const mongoose=require('mongoose')
const {Schema}=mongoose



const Admin=new Schema({
    a_name:{
        type:String,
        required:true
    },
    a_phone:{
        type:String,
        required:true,
        // unique:true
    },
    a_email:{
        type:String,
        required:true,
        unique:true
    },
    a_password:{
        type:String,
        require:true
    },
    a_adate:{
        type:Date,
        default:Date.now
    },
    a_status:{
        type:String,
        required:true
    },
    a_update:{
        type:Date,
        required:false
    }
})
module.exports=mongoose.model("admins",Admin)