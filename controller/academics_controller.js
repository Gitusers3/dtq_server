const Student_Academics = require('../model/Student_Academics')
const Student = require('../model/Student')
const Update = async (req, res) => {
    try {
        const { college, course, percentage} = req.body
        const student = await Student_Academics.findById(req.params.id)
        if (!student) {
            console.log("Record Not Found")
            res.status(400).send("Record Not Found")
        } else {
            const newAcademics = {}
            if (college) { newAcademics.college = college }
            if (course) { newAcademics.course = course }
            if (percentage) { newAcademics.percentage = percentage }
            const UpdatedAcademic = await Student_Academics.findByIdAndUpdate(req.params.id, { $set: newAcademics }, { new: true })
            res.send(UpdatedAcademic)
            console.log(UpdatedAcademic)
            console.log(req.method)
            console.log("Record Updated Successfully")
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Some Internal Error Occured")
    }
}

module.exports =  Update;