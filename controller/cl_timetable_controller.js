const express = require('express');
const ClTimetable=require('../model/ClTime_table');
require('dotenv').config
const AddClTimetable= async (req,res)=>{
    try{ 
        const{dayofweek,first_session,second_session,third_session,status}=req.body;
     let c= new ClTimetable({dayofweek:dayofweek,first_session:first_session,second_session:second_session,third_session:third_session,status:status});
     let savedClTimetable= await c.save();
     res.json({ success: true, savedClTimetable })
     console.log("ClTimetable inserted successfully")
     console.log(req.method)
     console.log(savedClTimetable)
    }
    catch (err) {
     res.json({ success: false, message: "Internal server error!!!" })
     console.log(err)
    }
 }

const ViewClTimetable = async (req, res)=> {
    try{
        const clTimetable= await ClTimetable.find();
        res.json(clTimetable);
        console.log("-----------------------");
        console.log(req.method);
        console.log(clTimetable);
        console.log("-----------------------");

    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}
//deleting
const DeleteClTimetable = async ( req , res ) => {
    try{
        let clTimetable = await ClTimetable.findById(req.params.id);
        if(!clTimetable){
            return res.status(404).send(' ClTimetable not found!');
            console.log(" ClTimetable not found with this ID, Please check the ID which you specified !");
        }
        clTimetable = await ClTimetable.findByIdAndDelete(req.params.id);
        res.json({" Success " : " ClTimetable deleted Successfully...",
        clTimetable : clTimetable })
        console.log(" ClTimetable deleted Successfully.... ")
        console.log(clTimetable)
    }
    catch(error) {
        console.error(" Some error occurred : " + error)
        res.status(500).json(' Some internal error ');
    }
}
//updating
const UpdateClTimetable = async (req, res) => {
    const { dayofweek,first_session,second_session,status} = req.body
    try {
        const newclTimetable = {};
        if (dayofweek){ newclTimetable.dayofweek = dayofweek };
        if (first_session){ newclTimetable.first_session = first_session };
        if (second_session){ newclTimetable.second_session = second_session };
        if (status){ newclTimetable.status = status };
        //newClTimetable={
        //     name:"name",
        //     phone:"phone",
        //     email:"email",
        //     address:"address
        // }
        let clTimetable = await ClTimetable.findById(req.params.id);
        console.log(clTimetable)
        if(!clTimetable){
            res.status(404).send(" Not Found !")
        }
        clTimetable = await ClTimetable.findByIdAndUpdate(req.params.id, {
            $set: newclTimetable }, { new : true })
            res.json({ newclTimetable });
            console.log("-----------------------");
            console.log("ClTimetable Updates Successfully");
        console.log(req.method);
        console.log(clTimetable);
        console.log("-----------------------");
        }
        catch(err){
            console.error(err.message);
            res.status(500).send(" Internal error Occurred ! ");
    }

}

//single-view



module.exports={AddClTimetable, ViewClTimetable,DeleteClTimetable,UpdateClTimetable}