const mongoose=require('mongoose');
const {Schema}=mongoose;


const Fees =new Schema({
    rec_num:{
        type:String,
        require:false
      //   unique:true
    },
    div_id :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'division',
        require:true
     },
     amount :{
        type:Number,
        require:true
     },
     std_id:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'students',
       require:true
     },
     pay_type:{
        type:String,
        require:true,
     },
     fees_type:{
        type:String,
        require:true,
     },
     remark :{
        type:String
      //   require:true
     },
     status:{
        type:String,
        require:true
     },
     f_date:{
        type:Date,
        require:true
     },
     created_at	:{
        type:Date,
        default:Date.now 
     },
     updated_at:{
        type:Date,
        require:false
     }
})
module.exports=mongoose.model("fees",Fees)