const mongoose = require('mongoose')
const { Schema } = mongoose

const Staff = new Schema({
    profile_img: {
        type: String,
        required: false
    },
    staff_name: {
        type: String,
        required: false
    },
    profile:{
        type:String,
        required:false
    },
    employee_code: {
        type: String,
        required: false,
        unique: false
    },
    employee_type: {
        type: String,
        required: false
    },
    employee_category: {
        type: String,
        required: false
    },


    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
        required: false
    },
    designation: {
        type: String,
        required: false
    },
    doj: {
        type: String,
        required: false
    },
    gname: {
        type: String,
        required: false
    },
    relationship: {
        type: String,
        required: false
    },
    gcontact: {
        type: Number,
        required: false
    },
    paddress: {
        type: String,
        required: false
    },
    taddress: {
        type: String,
        required: false
    },
    contact_no1: {
        type: Number,
        required: false,
        unique:false
    },
    contact_no2: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: false,
        unique: false
    },
    dob: {
        type: String,
        required: false,

    },
    blood_group: {
        type: String,
        required: false,

    },
    gender: {
        type: String,
        required: false,

    },
    marital_status: {
        type: String,
        required: false,

    },
    created_at: {
        type: Date,
        default: Date.now()

    },
    updated_at: {
        type: Date,
        required: false

    },
    pan_no: {
        type: String,
        required: false

    },
    adhar_no: {
        type: String,
        required: false

    }
})

module.exports=mongoose.model("staff",Staff)