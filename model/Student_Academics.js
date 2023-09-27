const mongoose = require('mongoose')
const { Schema } = mongoose

const Student_Academics = new Schema({
    course: {
        type: String,
        required: false
    },
    college: {
        type: String,
        required: false
    },
    percentage: {
        type: String,
        required: false
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'students'
    },
    
    created_at: {
        type: Date,
        default: Date.now()

    },
    updated_at: {
        type: Date,
        required: false

    }
})

module.exports=mongoose.model("student_academics",Student_Academics)