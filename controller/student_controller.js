const express = require('express')
const Student = require('../model/Student')
const Project_Details=require('../model/Project_Details')
const Student_Academics=require('../model/Student_Academics')
const Internship_Details=require('../model/Internship_Details')
const colleges=require('../model/College')
const courses=require('../model/Course')


require('dotenv').config


const AddStudent = async (req, res) => {
    try {
        // console.log("data",req.body)
        // const {student}=req.body
        const image  = req.file.filename
        
        const { division_id, our_reg_no, student_name, address, contact_no1, contact_no2, email_id, parent_or_guardian_name, parent_contact, course_id, university_reg_no, college_id, fees, paystatus, reg_status, reg_fees, status, t_address, p_address, t_pincode, t_state, t_district, p_pincode, p_state, p_district, relationship, stream, sem, status_student, all_status,date_of_admission,project_title,project_client_name,project_client_address,project_client_contact,project_client_email,project_description,front_end_pro_lang,backend_pro_lang,staff_id,schedule_from,schedule_to,duration,total_fees,pstatus,internship_id,start_date,end_date,start_time,end_time,no_of_days,no_of_hours,project_id} = req.body;
        const {ucourse,ucollege,upercenatge}=req.body
        const {pcourse,pcollege,ppercenatge}=req.body
        const {scourse,scollege,spercentage}=req.body
        console.log("p",req.body.puc)
        console.log("s",req.body.sslc)
        console.log("u",req.body.ug)
        console.log("s",req.body)
        console.log("division_id",division_id)
// project Details
if(!project_id){
        const project_details=new Project_Details({
            project_title:project_title,
            project_client_name:project_client_name,
            project_client_address:project_client_address,
            project_client_contact:project_client_contact,
            project_client_email:project_client_email,
            project_description:project_description,
            front_end_pro_lang:front_end_pro_lang,
            backend_pro_lang:backend_pro_lang,
            staff_id:staff_id,
            schedule_from:schedule_from,
            schedule_to:schedule_to,
            duration:duration,
            total_fees:total_fees,
            college_id:college_id,
            image:image,
            pstatus:pstatus
        })
        let savedPrjectDetails = await project_details.save();
// student Details
        var c = new Student({ division_id: division_id, our_reg_no: our_reg_no, student_name: student_name, address: address,
             image: image, 
             whatsup: contact_no1, contact_no1: contact_no1, contact_no2: contact_no2, email_id: email_id, parent_or_guardian_name: parent_or_guardian_name, parent_contact: parent_contact, course_id: course_id, university_reg_no: university_reg_no, college_id: college_id, fees: total_fees, paystatus: paystatus, reg_status: reg_status, reg_fees: reg_fees, status: status, t_address: t_address, p_address: p_address, t_pincode: t_pincode, t_state: t_state, t_district: t_district, p_pincode: p_pincode, p_state: p_state, p_district: p_district, relationship: relationship, stream: stream, sem: sem, status_student: status_student, all_status: all_status,date_of_admission:date_of_admission,project_id:savedPrjectDetails._id,  pending_fees:total_fees })
             var savedStudent = await c.save();
        }else{
            var c = new Student({ division_id: division_id, our_reg_no: our_reg_no, student_name: student_name, address: address,
                 image: image, 
                 whatsup: contact_no1, contact_no1: contact_no1, contact_no2: contact_no2, email_id: email_id, parent_or_guardian_name: parent_or_guardian_name, parent_contact: parent_contact, course_id: course_id, university_reg_no: university_reg_no, college_id: college_id, fees: total_fees, paystatus: paystatus, reg_status: reg_status, reg_fees: reg_fees, status: status, t_address: t_address, p_address: p_address, t_pincode: t_pincode, t_state: t_state, t_district: t_district, p_pincode: p_pincode, p_state: p_state, p_district: p_district, relationship: relationship, stream: stream, sem: sem, status_student: status_student, all_status: all_status,date_of_admission:date_of_admission,project_id,pending_fees:total_fees })
                 var savedStudent = await c.save();

        }
// student Academics
        const ug_student_academics=new Student_Academics({
          course:ucourse,
          college:ucollege,
          percentage:upercenatge,
          student_id:c._id
        }
        )
        const ug_savedAcademics=await ug_student_academics.save()

        const pu_student_academics=new Student_Academics({
            course:pcourse,
            college:pcollege,
            percentage:ppercenatge,
            student_id:c._id
          }
          )
          const puc_savedAcademics=await pu_student_academics.save()

          const sslc_student_academics=new Student_Academics({
            course:scourse,
            college:scollege,
            percentage:spercentage,
            student_id:c._id
          }
          )
          const sslc_savedAcademics=await sslc_student_academics.save()
// student Internship Details
        const internship_details=new Internship_Details({
            internship_id:internship_id,
            student_id:savedStudent._id,
            start_date:start_date,
            end_date:end_date,
            start_time:start_time,
            end_time:end_time,
            no_of_days:no_of_days,
            no_of_hours:no_of_hours
        })
        const savedInternship_Details=await internship_details.save()
        console.log("Student details added successfully")
        console.log(req.method)
        console.log({savedStudent,savedInternship_Details,ug_savedAcademics,puc_savedAcademics,sslc_savedAcademics})
        res.json({savedStudent,savedInternship_Details})
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Some internal ERROR occured !")
    }

}


const ViewStudent = async (req, res) => {
    try {
        const st = await Student.find().populate(['division_id','course_id','college_id','project_id','batch_id'])
        if (!st) {
            return res.json({ success: false, message: "No Records Found" })
            
        } else {
            
            console.log(req.method)
            console.log(st)
            return res.json({ success: true, st })
        }

    } catch (err) {
        console.error(err.message)
        res.json({ success: false, message: "Some Internal Error Occured!" })
    }

}



const ViewOne = async (req, res) => {
    try {
        const s1 = await Student.findById(req.params.id).populate(["division_id","course_id","college_id","project_id","batch_id"])
        const a1=await Student_Academics.find({student_id:req.params.id})
        const p1 = await Internship_Details.findOne({ student_id: req.params.id })
        .populate("internship_id")
        .populate("student_id");
       

        if (!s1 ) {
            res.json({ success: false, message: "Student Records Not Found" })
            res.status(400).send("Not Found")
        }
         else {
            res.json({s1,'academics':a1,p1})
            console.log(req.method)
            console.log(s1,a1,p1)
        }

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Some Internal Error Occured")
    }
}



const DeleteStudent = async (req, res) => {
    try {
        const id = req.params.id;
        console.log('Deleting student with ID:', id);

        const s1 = await Student.findById(id);
        if (!s1) {
            console.log('Student not found with ID:', id);
            res.json({ success: false, message: "Not Found" });
            return;
        }

        console.log('Student found:', s1);

        // Delete associated academic details first (Student_Academics)
        const a2 = await Student_Academics.deleteMany({ student_id: id });
        console.log('Academic details deleted count:', a2.deletedCount);
        const p2=await Internship_Details.deleteOne({student_id:id})
        console.log('Internship details deleted count:', p2.deletedCount);

        // Now delete the student (s1)
        const s2 = await Student.findByIdAndDelete(id);
        console.log('Student deleted:', s2);

        res.json({ success: true, message: "Student and academic details deleted successfully" });
    } catch (err) {
        console.error('Error occurred during deletion:', err.message);
        res.status(500).send("Some Internal Error Occurred");
    }
};


const UpdateStudent = async (req, res) => {
    try {
        const {cou_name,c_name, division_id, student_name, address, image, whatsup, contact_no1, contact_no2, email_id, parent_or_guardian_name, parent_contact, course_id, university_reg_no, college_id, fees, paystatus, reg_status, reg_fees, status, t_address, p_address, t_pincode, t_state, t_district, p_pincode, p_state, p_district, relationship, stream, sem, status_student, sts,updated_at,project_title,project_client_name,project_client_address,project_client_contact,project_client_email,project_description,front_end_pro_lang,backend_pro_lang,staff_id,schedule_from,schedule_to,duration,total_fees,pstatus,course,college,percentage,internship_id,start_date,end_date,start_time,end_time,no_of_days,no_of_hours,batch_id } = req.body
        // console.log(internship_id)
        // console.log(course," course")
        // console.log(college," college")
        // console.log(percentage," percentage")
        const s1 = await Student.findById(req.params.id)
      
        if (!s1) {
            res.json({ success: false, message: "Record Not Found" })


        } else {
            const newStudent = {}
            if (division_id) { newStudent.division_id = division_id }
            if (student_name) { newStudent.student_name = student_name }
            if (address) { newStudent.address = address }
            if (image) { newStudent.image = image }
            if (whatsup) { newStudent.whatsup = whatsup }
            if (contact_no1) { newStudent.contact_no1 = contact_no1 }
            if (contact_no2) { newStudent.contact_no2 = contact_no2 }
            if (division_id) { newStudent.division_id = division_id }
            if (email_id) { newStudent.email_id = email_id }
            if (parent_or_guardian_name) { newStudent.parent_or_guardian_name = parent_or_guardian_name }
            if (parent_contact) { newStudent.parent_contact = parent_contact }
            if (course_id) { newStudent.course_id = course_id }
            if (university_reg_no) { newStudent.university_reg_no = university_reg_no }
            if (college_id) { newStudent.college_id = college_id }
            if (fees) { newStudent.fees = fees }
            if (paystatus) { newStudent.paystatus = paystatus }
            if (reg_status) { newStudent.reg_status = reg_status }
            if (reg_fees) { newStudent.reg_fees = reg_fees }
            if (status) { newStudent.status = status }
            if (t_address) { newStudent.t_address = t_address }
            if (p_address) { newStudent.p_address = p_address }
            if (p_state) { newStudent.p_state = p_state }
            if (p_district) { newStudent.p_district = p_district }
            if (p_pincode) { newStudent.p_pincode = p_pincode }
            if (t_district) { newStudent.t_district = t_district }
            if (t_pincode) { newStudent.t_pincode = t_pincode }
            if (t_state) { newStudent.t_state = t_state }
            if (relationship) { newStudent.relationship = relationship }
            if (stream) { newStudent.stream = stream }
            if (sem) { newStudent.sem = sem }
            if (status_student) { newStudent.status_student = status_student }
            if (sts) { newStudent.all_status = sts }
            if (updated_at) { newStudent.updated_at = updated_at }
            if(batch_id){newStudent.batch_id=batch_id}
            const UpdateStudent = await Student.findByIdAndUpdate(req.params.id, { $set: newStudent }, { new: true })


            const newproject_details={}
            if(project_title){newproject_details.project_title=project_title}
            if(project_description){newproject_details.project_description=project_description}
            if(project_client_name){newproject_details.project_client_name=project_client_name}
            if(project_client_email){newproject_details.project_client_email=project_client_email}
            if(project_client_contact){newproject_details.project_client_contact=project_client_contact}
            if(project_client_address){newproject_details.project_client_address=project_client_address}
            if(front_end_pro_lang){newproject_details.front_end_pro_lang=front_end_pro_lang}
            if(backend_pro_lang){newproject_details.backend_pro_lang=backend_pro_lang}
            if(staff_id){newproject_details.staff_id=staff_id}
            if(schedule_from){newproject_details.schedule_from=schedule_from}
            if(schedule_to){newproject_details.schedule_to=schedule_to}
            if(duration){newproject_details.duration=duration}
            if(pstatus){newproject_details.pstatus=pstatus}
            if(total_fees){newproject_details.total_fees=total_fees}
            const UpdatedProject_Details=await Project_Details.findByIdAndUpdate(s1.project_id,{$set:newproject_details},{new:true})



            const newcurrentCollege={}
            if(c_name){newcurrentCollege.c_name=c_name}
            const UpdatedCurrentCollege=await colleges.findByIdAndUpdate(s1.college_id,{$set:newcurrentCollege},{new:true})
            const newcurrentCourse={}
            if(cou_name){newcurrentCourse.cou_name=cou_name}
            const UpdatedCurrentCourse=await courses.findByIdAndUpdate(s1.course_id,{$set:newcurrentCourse},{new:true})


            const newAcademics={}
           
            if(course){newAcademics.course=course}
            if(college){newAcademics.college=college}
            if(percentage){newAcademics.percentage=percentage}
            const academic=await Student_Academics.findOne({student_id:s1._id})
            const UpdatedAcademicDetails=await Student_Academics.findByIdAndUpdate(academic._id,{$set:newAcademics},{new:true})


            const newInternship_details={}
            if(internship_id){newInternship_details.internship_id=internship_id}
            if(start_date){newInternship_details.start_date=start_date}
            if(end_date){newInternship_details.end_date=end_date}
            if(start_time){newInternship_details.start_time=start_time}
            if(end_time){newInternship_details.end_time=end_time}
            if(no_of_days){newInternship_details.no_of_days=no_of_days}
            if(no_of_hours){newInternship_details.no_of_hours=no_of_hours}

            const intern=await Internship_Details.findOne({student_id:s1._id})

            const UpdatedInternship_Details=await Internship_Details.findByIdAndUpdate(intern,{$set:newInternship_details},{new:true})




            res.json({ success: true, message: "Updated Successfull", UpdateStudent,UpdatedProject_Details,'academic':UpdatedAcademicDetails,UpdatedInternship_Details })
            console.log(req.method)
            console.log([UpdateStudent,UpdatedProject_Details,UpdatedAcademicDetails,UpdatedInternship_Details,UpdatedCurrentCollege,UpdatedCurrentCourse])


        }

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Some Internal Error Occured")

    }
}
const UpdateProfilePicture = async (req, res) => {
    try {
        const file  = req.file.filename
        const s1 = await Student.findById(req.params.id)
        if (!s1) {
            res.json({ success: false, message: "Record Not Found" })
        } else {
            const newStudent = {}
            if (file) { newStudent.image = file }
            const UpdateStudent = await Student.findByIdAndUpdate(req.params.id, { $set: newStudent }, { new: true })
            res.json({ success: true, message: "Updated Successfull", UpdateStudent})
            console.log(req.method)
            console.log(file)
            console.log(UpdateStudent)
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Some Internal Error Occured")
    }
}

const View_Project=async(req,res)=>{
    try{
        const project=await Project_Details.find()
        if(project){
            res.json(project)

        }else{
            console.log("No records Found")
        }

    }catch(err){
        console.error(err)
    }
}
const AddToBatch=async(req,res)=>{
            try {
                const {batchId} = req.body
                const s1 = await Student.findById(req.params.id);
                if(!batchId){
                    res.json({ success: false, message: "Batch Id does not found!" })
                }else 
                if (!s1) {
                    res.json({ success: false, message: "Record Not Found" })
                } else {
                    const newStudent = {}
                    if (batchId) { newStudent.batch_id = batchId }
                    const UpdateStudent = await Student.findByIdAndUpdate(req.params.id, { $set: newStudent }, { new: true })
                    res.json({ success: true, message: "Updated Successfully", UpdateStudent })
                    console.log(req.method)
                    console.log(UpdateStudent)
                }
            }
        catch(err){
        console.error(err.message)
        res.status(500).send("Some Internal Error Occured")
        }
    }
    const RemoveFromBatch = async (req, res) => {
        try {
        const s1 = await Student.findById(req.params.id);
        if (!s1) {
            return res.json({ success: false, message: "Record Not Found" });
        }
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { $unset: { batch_id: "" } }, // Remove the batch_id field
            { new: true }
        );
            res.json({ success: true, message: "Batch ID removed", updatedStudent });
        } catch (err) {
        console.error(err.message);
        res.status(500).send("Some Internal Error Occurred");
        }
    };
module.exports = { AddStudent, ViewStudent, ViewOne, DeleteStudent,UpdateStudent,UpdateProfilePicture,View_Project,AddToBatch,RemoveFromBatch }