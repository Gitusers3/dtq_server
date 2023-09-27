const express = require('express');
const ClassRoom=require('../model/Classes');
require('dotenv').config
const AddClassRoom= async (req,res)=>{
    try{ 
        const{cls_name}=req.body;
     let classRoom= new ClassRoom({cls_name});
     let savedClassRoom= await classRoom.save();
     console.log("Class room inserted successfully")
     console.log(req.method)
     console.log(req.body)
     console.log(savedClassRoom);
     res.json({ success: true, savedClassRoom: savedClassRoom})
    }
    catch (err) {
     res.json({ success: false, message: "Internal server error!!!" })
     console.log(err)
    }
 }

const ViewClassRooms = async (req, res)=> {
    try{
        const classRoom= await ClassRoom.find();
        console.log("-----------------------");
        console.log(req.method);
        console.log(classRoom);
        console.log("-----------------------");
        res.json(classRoom);
    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}
//deleting
const DeleteClassRoom = async ( req , res ) => {
    try{
        let classRoom = await ClassRoom.findById(req.params.id);
        if(!classRoom){
            console.log(" Classroom not found with this ID, Please check the ID which you specified !");
            return res.status(404).send(' batch not found!');
        }
        classRoom = await ClassRoom.findByIdAndDelete(req.params.id);
        console.log(" batch deleted Successfully.... ")
        console.log(classRoom)
        res.json({" Success " : " class room deleted Successfully...",
        classRoom : classRoom })
        
    }
    catch(error) {
        console.error(" Some error occurred : " + error)
        res.status(500).json(' Some internal error ');
    }
}
//updating
const UpdateClass = async (req, res) => {
    const { name } = req.body
    try {
        const newClassRoom = {};
        if (name){ newClassRoom.cls_name = name };
        //newbatch={
        //     name:"name",
        //     phone:"phone",
        //     email:"email",
        //     address:"address
        // }
        let classRoom = await ClassRoom.findById(req.params.id);
        if(!classRoom){
            res.status(404).send(" Not Found !")
        }
        classRoom = await ClassRoom.findByIdAndUpdate(req.params.id, {
            $set: newClassRoom }, { new : true })
            console.log("-----------------------");
            console.log("Class room Updates Successfully");
            console.log(req.method);
            console.log(classRoom);
            console.log("-----------------------");
            res.json({ classRoom });
            
        }
        catch(err){
            console.error(err.message);
            res.status(500).send(" Internal error Occurred ! ");
    }

}

//single-view
const ViewOneClassRoom = async ( req, res ) =>{
    try{
        let classRoom = await ClassRoom.findById(req.params.id)
        if(!classRoom){
            res.status(404).send(" Not Found !")
            return
        }
        res.json(classRoom);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send(" Internal error Occurred ! ");
}
}

module.exports={AddClassRoom,ViewClassRooms,DeleteClassRoom,UpdateClass,ViewOneClassRoom}