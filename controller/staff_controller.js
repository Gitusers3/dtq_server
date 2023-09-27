const Staff = require('../model/Staff')



const Insert = async (req, res) => {
    console.log("data",req.body)
    try {
        const image  = req.file.filename
        const { staff_name, employee_code, doj, relationship, gcontact, paddress, taddress, contact_no1, contact_no2, email, dob, blood_group, gender, marital_status, pan_no, adhar_no ,employee_type,employee_category,gname,role_id,designation} = req.body
    //    const  {} = req.body.

        const s1 = new Staff({

            staff_name: staff_name,
            profile:image,
            employee_code: employee_code,
            employee_type: employee_type,
            employee_category: employee_category,
            role_id: role_id,
            designation: designation,
            doj: doj,
            gname: gname,
            relationship: relationship,
            gcontact: gcontact,
            paddress: paddress,
            taddress: taddress,
            contact_no1: contact_no1,
            contact_no2: contact_no2,
            email: email,
            dob: dob,
            blood_group: blood_group,
            gender: gender,
            marital_status: marital_status,
            pan_no: pan_no,
            adhar_no: adhar_no

        })

        const savedStaff = await s1.save()
        res.json(savedStaff)
        console.log(req.method)
        console.log("Inserted Successfully")
        console.log(savedStaff)


    } catch (err) {
        console.error(err.message)
        res.json({ success: false, message: "Internal Error occured" })
    }

}


const View = async (req, res) => {
    try {
        const s1 = await Staff.find().populate(["role_id"])
        if (!s1) {
            console.log("No records Found")
            res.json({ success: false, message: "No records Found " })
        } else {
            res.json(s1)
            console.log("Inserted Successfully")
            console.log(req.method)
            console.log(s1)
        }

    } catch (err) {
        console.error(err.message)
        res.json({ success: false, message: "Some Internal Error" })
    }
}


const Delete = async (req, res) => {
    try {
        const s1 = await Staff.findById(req.params.id)
        if (!s1) {
            console.json({ success: false, message: "Records Not Found" })


        } else {
            const deletedStudent = await Staff.findByIdAndDelete(s1)
            res.json(deletedStudent)
            console.log(deletedStudent)
            console.log(req.method)
            console.log("Deleted Successfully")



        }

    } catch (err) {
        console.error(err.message)
        console.json({ success: false, message: "Some Internal Error Occured" })
    }

}


const ViewOne = async (req, res) => {
    try {
        const s1 = await Staff.findById(req.params.id).populate(["role_id"])
        if (!s1) {

            res.status(400).send("Records Not Found")
            console.log("Records Not Found")


        } else {
            res.json(s1)
            console.log(s1)
            console.log("result found")
            console.log(req.method)

        }

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Some Internal Error Occured")
    }

}


const Update = async (req, res) => {
    try {
        const { profile_img, staff_name, employee_code, employee_type, employee_category, role_id, designation, doj, gname, relationship, gcontact, paddress, taddress, contact_no1, contact_no2, email, dob, blood_group, gender, marital_status, pan_no, adhar_no, updated_at } = req.body
        const s1 = await Staff.findById(req.params.id)
        if (!s1) {
            console.log("Record Not Found")
            res.status(400).send("Record Not Found")

        } else {
            const newStaff = {}
            if (profile_img) { newStaff.profile_img = profile_img }
            if (staff_name) { newStaff.staff_name = staff_name }
            if (employee_code) { newStaff.employee_code = employee_code }
            if (employee_type) { newStaff.employee_type = employee_type }
            if (employee_category) { newStaff.employee_category = employee_category }
            if (role_id) { newStaff.role_id = role_id }
            if (designation) { newStaff.designation = designation }
            if (doj) { newStaff.doj = doj }
            if (gname) { newStaff.gname = gname }
            if (relationship) { newStaff.relationship = relationship }
            if (gcontact) { newStaff.gcontact = gcontact }
            if (paddress) { newStaff.paddress = paddress }
            if (taddress) { newStaff.taddress = taddress }
            if (contact_no1) { newStaff.contact_no1 = contact_no1 }
            if (contact_no2) { newStaff.contact_no2 = contact_no2 }
            if (email) { newStaff.email = email }
            if (dob) { newStaff.dob = dob }
            if (blood_group) { newStaff.blood_group = blood_group }
            if (gender) { newStaff.gender = gender }
            if (marital_status) { newStaff.marital_status = marital_status }
            if (pan_no) { newStaff.pan_no = pan_no }
            if (adhar_no) { newStaff.adhar_no = adhar_no }
            if (updated_at) { newStaff.updated_at = updated_at }


            const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, { $set: newStaff }, { new: true })

            res.send(updatedStaff)
            console.log(updatedStaff)
            console.log(req.method)
            console.log("Record Updated Successfully")



        }

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Some Internal Error Occured")
    }

}

module.exports = { Insert, View, Delete, ViewOne, Update }