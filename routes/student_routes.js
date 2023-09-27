const express=require('express')
const router=express.Router()
const multer=require('multer')
const {AddStudent,ViewStudent,ViewOne,DeleteStudent,UpdateStudent,UpdateProfilePicture,View_Project,AddToBatch,RemoveFromBatch}=require("../controller/student_controller")
const FetchAdmin=require('../middlewear/admin')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()

      cb(null, uniqueSuffix  + '-' +file.originalname )
    }
  })
  const upload = multer({ storage: storage })

router.post("/insert",upload.single('image'),AddStudent)
router.get("/view",FetchAdmin,ViewStudent)
router.put("/addToBatch/:id",FetchAdmin,AddToBatch)
router.put("/removeFromBatch/:id",FetchAdmin,RemoveFromBatch)
router.get("/viewone/:id",ViewOne)
router.get("/view_project",FetchAdmin,View_Project)
router.delete("/delete/:id",DeleteStudent)
router.put("/update/:id",UpdateStudent)
router.put("/update_profile/:id",upload.single('name'),UpdateProfilePicture)


module.exports=router