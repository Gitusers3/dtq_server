const Division = require('../model/Division')

const add_division = async (req, res) => {

    try {

        const { dname, status } = req.body

        let division = await new Division({
            d_name: dname,
            d_status: status
        })

        let div = await division.save()
        res.json(div)

    } catch (err) {
        res.json({ success: false, message: "something went wrong" })
        console.log(err)
    }
}



const view_division=async(req,res)=>{
    try{
    const div=await Division.find()
    if(div){
        res.json(div)
        console.log("---------------------")
        console.log(req.method)
        console.log(div)
        console.log("---------------------")
    }else{
        res.json({success:true,message:"No records Found"})
    }
}catch(err){
    res.json({success:false,message:"some internal error!!"})
}

}

const view_one_division=async(req,res)=>{
    try{
    const div=await Division.findById(req.params.id)
    if(!div){
        res.status(400).send("Not found")
    }else{
        res.json(div)

    }
}catch(err){
    console.error(err.message)
    res.status(500).send("Some internal ERROR")
}

}

module.exports = { add_division,view_division,view_one_division }