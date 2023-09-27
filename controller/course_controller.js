const express = require('express');
const Course=require('../model/Course');
require('dotenv').config
const AddCourse= async (req,res)=>{
    try{ 
        const{cou_name,cou_status}=req.body;
    let course= new Course({cou_name,cou_status});
    let savedCourse= await course.save();
    res.json({ success: true, savedCourse })
    console.log("Course inserted successfully")
     console.log(req.method)
     console.log(savedCourse)
    }
    catch (err) {
    res.json({ success: false, message: "Internal server error!!!" })
    console.log(err)
}
}
const ViewCourses = async (req, res)=> {
    try{
        const course= await Course.find();
        res.json(course);
        console.log("-----------------------");
        console.log(req.method);
        console.log(course);
        console.log("-----------------------");

    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}
module.exports={AddCourse, ViewCourses}