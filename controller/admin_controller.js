const express = require('express');
const Admin = require('../model/Admin');


const bycrypt=require('bcryptjs')
const jwttoken=require('jsonwebtoken')
require('dotenv').config
const Register = async (req, res) => {
    try {
        const { name, phone, email, password,status } = req.body
        let admin = await Admin.findOne({a_email:email })
        if (admin) {
            return res.json({ success: false, message: "email already exist" })
        }
        let salt = await bycrypt.genSalt(10)
        let secPass = await bycrypt.hash(password, salt)
        admin = new Admin({ a_name:name,a_email: email, a_phone:phone, a_password: secPass,a_status:status })
        let savedAdmin = await admin.save()
        res.json({ success: true, savedAdmin })
    }
    catch (err) {
        res.json({ success: false, message: "Internal server error!!!" })
        console.log(err)
    }
}
const Login=async(req,res)=>{
    console.log(req.body);
    const {email,password}=req.body;
    console.log(email)
    console.log(password)
    const admin=await Admin.findOne({$or:[{a_email:email},{a_phone:email}]})
    // console.log(admin.a_email)
    if(!admin){
        res.json({success:false,message:"unsuccessfull"})
    }else{
        const passwordCompare=await bycrypt.compare(password,admin.a_password)
        if(!passwordCompare){
            res.json({success:false,message:"Wrong Credential"})
        }else{
        const data=admin._id.toString();
        let authToken = await jwttoken.sign(data, process.env.SECRET)
        res.json({ success: true, user:admin,authToken ,message:"Login Success"})
    }
    }
}

const View = async ( req, res ) =>{
    try{
        let admin = await Admin.findById(req.admin);
        if(!admin){
            return res.status(404).send(" Not Found !")
        } else {
        res.json(admin);
        }
    }
    catch(err){
        console.error(err.message);
        res.status(500).send(" Internal error Occurred ! ");
}
}

module.exports={Login, Register, View}

