const Intership=require('../model/Intership');



const add_intership =async (req,res)=>{
    try{
        const {intership_on,frontend_lang,backend_lang,desc,status}=req.body
        let intership= await new Intership({
            intership_on,
            frontend_lang,
            backend_lang,
            desc,
            status

        })
        let savedIntership= await intership.save()
        res.json(savedIntership)

    }
    catch (err) {
        res.json({ success: false, message: "something went wrong" })
        console.log(err)
    }
}

const view_intership=async(req,res)=>{
    try{
    const intership=await Intership.find()
    if(intership){
        res.json(intership)
        console.log("---------------------")
        console.log(req.method)
        console.log(intership)
        console.log("---------------------")
    }else{
        res.json({success:true,message:"No records Found"})
    }
}catch(err){
    res.json({success:false,message:"some internal error!!"})
}

}

const view_one_intership=async(req,res)=>{
    try{
    const intership=await Intership.findById(req.params.id).populate(["internship_id","student_id"])
    if(!intership){
            res.status(400).send("Not found")
    }else{
        res.json(intership)

    }
}catch(err){
    console.error(err.message)
    res.status(500).send("Some internal ERROR")
}

}
const view_oneStudent_intership = async (req, res) => {
    try {
        const { student_id } = req.body; 
        const internship = await Intership.findOne({ student_id }); 
        if (!internship) {
            res.status(404).send("Internship not found");
        } else {
            res.json(internship);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
};
const Update = async (req, res) => {
    try {
            const {internship_id,start_date,end_date,start_time,end_time,no_of_days,no_of_hours } = req.body
            const s1 = await Intership.findById(req.params.id)
            if (!s1) {
                res.json({ success: false, message: "Record Not Found" })
            } else {
                const updatedInternship = {}
                if (internship_id) { updatedInternship.internship_id = internship_id }
                if (start_date) { updatedInternship.start_date = start_date }
                if (end_date) { updatedInternship.end_date = end_date }
                if (start_time) { updatedInternship.start_time = start_time }
                if (end_time) { updatedInternship.end_time = end_time }
                if (no_of_days) { updatedInternship.no_of_days = no_of_days }
                if (no_of_hours) { updatedInternship.no_of_hours = no_of_hours }
                const UpdateStudentInternship = await Intership.findByIdAndUpdate(req.params.id, { $set: updatedInternship }, { new: true })
                console.log(req.method)
                console.log(UpdateStudentInternship)
                res.json({ success: true, message: "Updated Successfull", UpdateStudentInternship})
            }
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send("Internal server error");
        }
    }


module.exports = { add_intership,view_intership,view_one_intership,view_oneStudent_intership,Update }