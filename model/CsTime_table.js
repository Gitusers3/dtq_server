const mongoose=require('mongoose')
const {Schema}=mongoose

const CsTimetable=new Schema({
    dayofweek:{
        type:String,
        required:true
    },
    first_session:{
        type:String,
        required:true
    },
    second_session:{
        type:String,
        required:true
    },
 
    status:{
        type:String,
        required:false
    },
  
})

module.exports=mongoose.model("cs_timetable",CsTimetable)