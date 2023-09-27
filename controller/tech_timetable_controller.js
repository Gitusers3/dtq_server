const express = require('express');
const TechTimetable=require('../model/Techtime_table');
require('dotenv').config
const AddTechTimetable= async (req,res)=>{
    try{ 
        const{tech_id,dayofweek,first_session,second_session,third_session,four_session,status}=req.body;
        console.log(req.body,9999999999)
     let c= new TechTimetable({tech_id:tech_id,dayofweek:dayofweek,first_session:first_session,second_session:second_session,third_session:third_session,four_session:four_session,status:status});
     let savedTechTimetable= await c.save();
     res.json({ success: true, savedTechTimetable })
     console.log("TechTimetable inserted successfully")
     console.log(req.method)
     console.log(savedTechTimetable)
    }
    catch (err) {
     res.json({ success: false, message: "Internal server error!!!" })
     console.log(err)
    }
 }

const ViewTechTimetable = async (req, res)=> {
    try{
        const techTimetable= await TechTimetable.find().populate(['tech_id',[{path:"first_session"}],[{path:"second_session"}],[{path:"third_session"}],[{path:"four_session"}]]);
        res.json(techTimetable);
        console.log("-----------------------");
        console.log(req.method);
        console.log(techTimetable);
        console.log("-----------------------");

    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}
//deleting
const DeleteTechTimetable = async ( req , res ) => {
    try{
        let techTimetable = await TechTimetable.findById(req.params.id);
        if(!techTimetable){
            return res.status(404).send(' TechTimetable not found!');
            console.log(" TechTimetable not found with this ID, Please check the ID which you specified !");
        }
        techTimetable = await TechTimetable.findByIdAndDelete(req.params.id);
        res.json({" Success " : " TechTimetable deleted Successfully...",
        techTimetable : techTimetable })
        console.log(" TechTimetable deleted Successfully.... ")
        console.log(techTimetable)
    }
    catch(error) {
        console.error(" Some error occurred : " + error)
        res.status(500).json(' Some internal error ');
    }
}
//updating
const UpdateTechTimetable = async (req, res) => {
    const {tech_id, dayofweek ,  first_session, second_session,third_session,four_session,status } = req.body
    try {
        const newTechTimetable = {};
        if (tech_id){ newTechTimetable.tech_id = tech_id };
        if ( dayofweek){ newTechTimetable. dayofweek =  dayofweek };
        if (first_session){ newTechTimetable.first_session = first_session };
        if (second_session){ newTechTimetable.second_session = second_session };
        if (third_session){ newTechTimetable.third_session = third_session };
        if (four_session){ newTechTimetable.four_session = four_session };
        if (status){ newTechTimetable.status = status };
        //newTechTimetable={
        //     name:"name",
        //     phone:"phone",
        //     email:"email",
        //     address:"address
        // }
        let techTimetable = await TechTimetable.findById(req.params.id);
        if(!techTimetable){
            res.status(404).send(" Not Found !")
        }
        techTimetable = await TechTimetable.findByIdAndUpdate(req.params.id, {
            $set: newTechTimetable }, { new : true })
            res.json({ newTechTimetable });
            console.log("-----------------------");
            console.log("TechTimetable Updates Successfully");
        console.log(req.method);
        console.log(techTimetable);
        console.log("-----------------------");
        }
        catch(err){
            console.error(err.message);
            res.status(500).send(" Internal error Occurred ! ");
    }

}

//single-view



module.exports={AddTechTimetable, ViewTechTimetable,DeleteTechTimetable,UpdateTechTimetable}