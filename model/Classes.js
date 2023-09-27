const mongoose=require('mongoose')
const {Schema}=mongoose

const ClassRoom=new Schema({
    cls_name:{
        type:String,
        required:true
    },
    cls_date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("class",ClassRoom)