const Fees=require('../model/Fees')
const Student=require('../model/Student')




const add_fees= async (req,res)=>{
    try {
        console.log(req.body.amount)
        const{rec_num,div_id,amount,std_id,pay_type,fees_type,rec_towards,status,f_date,remark}=req.body
        console.log("student",std_id)
        let fees=await new Fees({
            rec_num,
            div_id,
            amount,
            std_id,
            pay_type,
            fees_type,
            rec_towards,
            status,
            f_date,
            remark
        })
        let savedFees = await fees.save()
       

        let s1=await Student.findById(std_id)
        console.log(s1)
       
       
        let pending_fees=s1.pending_fees
        console.log("pending",pending_fees)
        let newPending_fees=pending_fees-amount
        const savedStudent=await Student.findByIdAndUpdate(std_id,{pending_fees:newPending_fees},{new:true})
        console.log("pending fees updated",newPending_fees)

        res.json(savedFees)
        console.log(newPending_fees)
    }
    catch (err) {
        res.json({ success: false, message: "something went wrong" })
        console.log(err)
    }
}


const view_fees=async (req,res)=>{
    try{
        const fees=await Fees.find().populate(["div_id","std_id"])
        if(fees){
            res.json(fees)
            console.log("---------------------")
            console.log(req.method)
            console.log(fees)
            console.log("---------------------")
        }else{
            res.json({success:true,message:"No records Found"})
        }
    }
    catch(err){
        res.json({success:false,message:"some internal error!!"})
    }
}

const view_one_fees= async (req,res)=>{
    try{
     
    const fees= await Fees.findById(req.params.id).populate(["div_id","std_id"]) 
   
    if(!fees){
        res.status(400).send("Not found")


    }else{
        res.json(fees)
    }
    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Some internal ERROR")
    }
    
}
const view_student_fees= async (req,res)=>{
    try{
     
    const fees= await Fees.find({std_id:req.params.id})  
   
    if(!fees){
        res.status(400).send("Not found")


    }else{
        res.json(fees)
    }
    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Some internal ERROR")
    }
    
}

const Update_fees=async(req,res)=>{
    try{
        const {rec_num,div_id,amount,std_id,pay_type,fees_type,remark,status,f_date}=req.body
        const fees=await Fees.findById(req.params.id)
        if(!fees){
            console.log("Record Not Found")
            res.status(400).send("Record Not Found")

        }else{
            const newFees={}
            if(rec_num){newFees.rec_num=rec_num}
            if(div_id){newFees.div_id=div_id}
            if(amount){newFees.amount=amount}
            if(std_id){newFees.std_id=std_id}
            if(pay_type){newFees.pay_type=pay_type}
            if(fees_type){newFees.fees_type=fees_type}
            if(remark){newFees.remark=remark}
            if(status){newFees.status=status}
            if(f_date){newFees.f_date=f_date}
           


            const updatedFees=await Fees.findByIdAndUpdate(req.params.id,{$set:newFees},{new:true})

            res.json(updatedFees)
            console.log(updatedFees)
            console.log(req.method)
            console.log("Record Updated Successfully")
            
            

        }

    }catch(err){
        console.error(err.message)
        res.status(500).send("Some Internal Error Occured")
    }

}


const Delete=async(req,res)=>{
    try{
        const fid=req.params.id;
        const fees=await Fees.findById(fid)
        if(fees){
            const fees_data=await Fees.findByIdAndDelete(fid)
            res.json({success:true,message:"deleted Successfully"})
            console.log("Deleted Successfully")
            

        }else{
            res.json({success:false,message:"Not found"})
            console.log("Not found")


        }


    }catch(err){
        console.error(err.message)
        res.json(err)

    }

}
module.exports = { add_fees,view_fees,view_one_fees,Update_fees,view_student_fees,Delete}