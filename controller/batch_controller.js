const express = require('express');
const Batch=require('../model/Batch');
require('dotenv').config
const AddBatch= async (req,res)=>{
    try{ 
        const{b_name,d_id,tech_id,status,project_id,c_id,timings,class_id}=req.body;
     let b= new Batch({b_name,d_id,tech_id,status,timings,class_id});
     let savedBatch= await b.save();
     res.json({ success: true, savedBatch })
     console.log("batch inserted successfully")
     console.log(req.method)
     console.log(req.body)
     console.log(savedBatch)
    }
    catch (err) {
     res.json({ success: false, message: "Internal server error!!!" })
     console.log(err)
    }
 }

const ViewBatch = async (req, res)=> {
    try{
        const batch= await Batch.find().populate([{path:"tech_id"},{path:"project_id"},{path:"class_id"},'d_id','college_id']);
        res.json(batch);
        console.log("-----------------------");
        console.log(req.method);
        console.log(batch);
        console.log("-----------------------");

    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}
//deleting
const DeleteBatch = async ( req , res ) => {
    try{
        let batch = await Batch.findById(req.params.id);
        if(!batch){
            return res.status(404).send(' batch not found!');
            console.log(" batch not found with this ID, Please check the ID which you specified !");
        }
        batch = await Batch.findByIdAndDelete(req.params.id);
        res.json({" Success " : " batch deleted Successfully...",
        batch : batch })
        console.log(" batch deleted Successfully.... ")
        console.log(batch)
    }
    catch(error) {
        console.error(" Some error occurred : " + error)
        res.status(500).json(' Some internal error ');
    }
}
//updating
const UpdateBatch = async (req, res) => {
    const { b_name,d_id,tech_id,status,u_date,timings,class_id } = req.body
    try {
        const newbatch = {};
        if (b_name){ newbatch.b_name = b_name };
        if (d_id){ newbatch.d_id = d_id };
        if (tech_id){ newbatch.tech_id = tech_id };
        if (status){ newbatch.status = status };
        if (timings){ newbatch.timings = timings };
        if (class_id){ newbatch.class_id = class_id };
        if  (u_date){newbatch.u_date=u_date};
        //newbatch={
        //     name:"name",
        //     phone:"phone",
        //     email:"email",
        //     address:"address
        // }
        let batch = await Batch.findById(req.params.id);
        if(!batch){
            res.status(404).send(" Not Found !")
        }
        batch = await Batch.findByIdAndUpdate(req.params.id, {
            $set: newbatch }, { new : true })
            res.json({ batch });
            console.log("-----------------------");
            console.log("batch Updates Successfully");
        console.log(req.method);
        console.log(batch);
        console.log("-----------------------");
        }
        catch(err){
            console.error(err.message);
            res.status(500).send(" Internal error Occurred ! ");
    }

}

//single-view
const ViewOneBatch = async ( req, res ) =>{
    try{
        let batch = await Batch.findById(req.params.id).populate([{path:"project_id"},'d_id','college_id','class_id']);
        if(!batch){
            res.status(404).send(" Not Found !")
            return
        }
        res.json(batch);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send(" Internal error Occurred ! ");
}
}

const ViewBatchTechie=async(req,res)=>{
    try{
    const id=req.params.id
    const batch=await Batch.find({tech_id:id}).populate([{path:"tech_id"},{path:"project_id"},'d_id','college_id'])
    if(batch){
        res.json(batch)
        console.log(batch)

    }else{
        console.log("Not found")
    }
    }catch(err){
        console.log(err)
    }


}


module.exports={AddBatch, ViewBatch,DeleteBatch,UpdateBatch,ViewOneBatch,ViewBatchTechie}