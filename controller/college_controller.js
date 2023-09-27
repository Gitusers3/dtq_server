const express = require('express');
const College=require('../model/College');
require('dotenv').config
const AddCollege= async (req,res)=>{
    try{ 
        const{college,address,status}=req.body;
     let c= new College({c_name:college,c_address:address,c_status:status});
     let savedCollege= await c.save();
     res.json({ success: true, savedCollege })
     console.log("College inserted successfully")
     console.log(req.method)
     console.log(savedCollege)
    }
    catch (err) {
     res.json({ success: false, message: "Internal server error!!!" })
     console.log(err)
    }
 }

const ViewCollege = async (req, res)=> {
    try{
        const college= await College.find();
        res.json(college);
        console.log("-----------------------");
        console.log(req.method);
        console.log(college);
        console.log("-----------------------");

    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}
//deleting
const DeleteCollege = async ( req , res ) => {
    try{
        let college = await College.findById(req.params.id);
        if(!college){
            return res.status(404).send(' College not found!');
            console.log(" College not found with this ID, Please check the ID which you specified !");
        }
        college = await College.findByIdAndDelete(req.params.id);
        res.json({" Success " : " College deleted Successfully...",
        college : college })
        console.log(" College deleted Successfully.... ")
        console.log(college)
    }
    catch(error) {
        console.error(" Some error occurred : " + error)
        res.status(500).json(' Some internal error ');
    }
}
//updating
const UpdateCollege = async (req, res) => {
    const { c_name ,  c_address, c_status,u_date } = req.body
    try {
        const newCollege = {};
        if (c_name){ newCollege.c_name = c_name };
        if (c_address){ newCollege.c_address = c_address };
        if (c_status){ newCollege.c_status = c_status };
        if (u_date){ newCollege.u_date = u_date };
        //newCollege={
        //     name:"name",
        //     phone:"phone",
        //     email:"email",
        //     address:"address
        // }
        let college = await College.findById(req.params.id);
        if(!college){
            res.status(404).send(" Not Found !")
        }
        college = await College.findByIdAndUpdate(req.params.id, {
            $set: newCollege }, { new : true })
            res.json({ college });
            console.log("-----------------------");
            console.log("College Updates Successfully");
        console.log(req.method);
        console.log(college);
        console.log("-----------------------");
        }
        catch(err){
            console.error(err.message);
            res.status(500).send(" Internal error Occurred ! ");
    }

}

//single-view
const ViewOneCollege = async ( req, res ) =>{
    try{
        let college = await College.findById(req.params.id);
        if(!college){
            res.status(404).send(" Not Found !")
        }
        res.json(college);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send(" Internal error Occurred ! ");
}
}


module.exports={AddCollege, ViewCollege,DeleteCollege,UpdateCollege,ViewOneCollege}