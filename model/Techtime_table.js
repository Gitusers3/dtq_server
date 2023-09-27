const mongoose=require('mongoose')
const {Schema}=mongoose

const TechTimetable=new Schema({
    tech_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'staff',
        required:false
    },
    dayofweek:{
        type:String,
        required:true
    },
   
  
    first_session:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'batch'
    }],
   
    second_session:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'batch'
    }],
    third_session:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'batch'
    }],
    four_session:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'batch'
    }],
    status:{
        type:String,
        required:false
    },

})

module.exports=mongoose.model("tech_timetable",TechTimetable)