const Role=require('../model/Role')


const Insert=async(req,res)=>{
    try{
        const {role}=req.body
        const r1=new Role({
            role:role
        })
        const savedRole=await r1.save()
        res.json(savedRole)
        console.log(savedRole)
        console.log("Inserted succesfully")
        console.log(req.method)


    }catch(err){
        console.error(err.message)
        res.status(500).send("Some Error Occured")

    }

}


const View=async(req,res)=>{
    try{
        const r1=await Role.find()
        if(!r1){
            console.log("No Records Found")
            res.status(400).send("No Records Found")


        }else{
            res.json(r1)
            console.log(r1)
            console.log("Records fecthed Successfully")
            console.log(req.method)
          


        }

    }catch(err){
        console.error(err.message)
        res.status(500).send("Some Error Occured")
    }

}


module.exports={Insert,View}