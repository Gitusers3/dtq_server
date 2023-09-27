const express = require('express');
const CsTimetable=require('../model/CsTime_table');
require('dotenv').config
const AddCsTimetable= async (req,res)=>{
    try{ 
        console.log("reqs",req.body)
        const{dayofweek,first_session,second_session,status}=req.body;
     let c= new CsTimetable({dayofweek:dayofweek,first_session:first_session,second_session:second_session,status:status});
     let savedcsTimetable= await c.save();
     res.json({ success: true, savedcsTimetable })
     console.log("CsTimetable inserted successfully")
     console.log(req.method)
     console.log(savedcsTimetable)
    }
    catch (err) {
     res.json({ success: false, message: "Internal server error!!!" })
     console.log(err)
    }
 }

const ViewCsTimetable = async (req, res)=> {
    try{
        const csTimetable= await CsTimetable.find();
        res.json(csTimetable);
        console.log("-----------------------");
        console.log(req.method);
        console.log(csTimetable);
        console.log("-----------------------");

    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}
//deleting
const DeleteCsTimetable = async ( req , res ) => {
    try{
        let csTimetable = await CsTimetable.findById(req.params.id);
        if(!csTimetable){
            return res.status(404).send(' CsTimetable not found!');
            console.log(" CsTimetable not found with this ID, Please check the ID which you specified !");
        }
        csTimetable = await CsTimetable.findByIdAndDelete(req.params.id);
        res.json({" Success " : " CsTimetable deleted Successfully...",
        csTimetable : csTimetable })
        console.log(" CsTimetable deleted Successfully.... ")
        console.log(csTimetable)
    }
    catch(error) {
        console.error(" Some error occurred : " + error)
        res.status(500).json(' Some internal error ');
    }
}
//updating
const UpdateCsTimetable = async (req, res) => {
    const { dayofweek ,  first_session, second_session,status } = req.body
    try {
        const newcsTimetable = {};
        if (dayofweek){ newcsTimetable.dayofweek = dayofweek };
        if (first_session){ newcsTimetable.first_session = first_session };
        if (second_session){ newcsTimetable.second_session = second_session };
        if (status){ newcsTimetable.status = status };
        //newCsTimetable={
        //     name:"name",
        //     phone:"phone",
        //     email:"email",
        //     address:"address
        // }
        let csTimetable = await CsTimetable.findById(req.params.id);
        if(!csTimetable){
            res.status(404).send(" Not Found !")
        }
        csTimetable = await CsTimetable.findByIdAndUpdate(req.params.id, {
            $set: newcsTimetable }, { new : true })
            res.json({ csTimetable });
            console.log("-----------------------");
            console.log("CsTimetable Updates Successfully");
        console.log(req.method);
        console.log(csTimetable);
        console.log("-----------------------");
        }
        catch(err){
            console.error(err.message);
            res.status(500).send(" Internal error Occurred ! ");
    }

}

//single-view



module.exports={AddCsTimetable, ViewCsTimetable,DeleteCsTimetable,UpdateCsTimetable}