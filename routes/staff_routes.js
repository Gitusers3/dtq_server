const express=require('express')
const router=express.Router()
const multer=require('multer')
const {Insert,View,Delete,ViewOne,Update}=require('../controller/staff_controller')
const FetchAdmin=require('../middlewear/admin')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/staffs/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      console.log(file)
      cb(null, uniqueSuffix  + '-' +file.originalname )
    }
  })
  const upload = multer({ storage: storage })


router.post("/insert",upload.single('image'),Insert)
router.get("/view",FetchAdmin,View)
router.get("/viewone/:id",ViewOne)
router.delete("/delete/:id",Delete)
router.put("/update/:id",Update)


module.exports=router