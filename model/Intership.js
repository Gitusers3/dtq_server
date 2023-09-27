const mongoose=require('mongoose');
const {Schema}=mongoose;

const Intership= new Schema({
    intership_on:{
        type:String,
        require:true
     },
     frontend_lang:{
        type:String,
        require:true
     },
     backend_lang:{
        type:String,
        require:true
     },
     desc:{
        type:String,
        require:true
     },
     status:{
        type:String,
        require:true
     },
     created_at:{
        type:Date,
        default:Date.now 
     },
     updated_at:{
        type:Date,
        require:false
     }
})
module.exports=mongoose.model("interships",Intership)