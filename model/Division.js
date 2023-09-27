const mongoose=require('mongoose')
const {Schema}=mongoose



const Division=new Schema({
    d_name:{
        type:String,
        required:true
    },
    d_status:{
        type:String,
        required:true
    },
    d_adate:{
        type:Date,
        default:Date.now
        
    },
    d_update:{
        type:Date,
        required:false
    }
})

module.exports=mongoose.model("division",Division)