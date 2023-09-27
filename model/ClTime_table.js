const mongoose=require('mongoose')
const {Schema}=mongoose

const ClTimetable=new Schema({
    dayofweek:{
        type:String,
        required:true
    },
    first_session:{
        type:String,
        required:false
    },
    second_session:{
        type:String,
        required:false
    },
    third_session:{
        type:String,
        required:false
    },
 
 
    status:{
        type:String,
        required:false
    },
  
})

module.exports=mongoose.model("cl_timetable",ClTimetable)