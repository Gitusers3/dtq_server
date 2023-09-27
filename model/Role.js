const mongoose=require('mongoose')
const {Schema}=mongoose


const Role=new Schema({
    role:{
        type:String,
        required:true,
        unique:true
    },
    created_at:{
        type:Date,
        default:Date.now()
    },
    updated_at:{
        type:Date,
        required:false
    }
})


module.exports=mongoose.model("role",Role)