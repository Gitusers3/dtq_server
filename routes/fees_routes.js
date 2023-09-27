const express=require('express');
const router=express.Router()
const {add_fees,view_fees,view_one_fees,Update_fees, view_student_fees,Delete}=require('../controller/fees_controller')

router.post('/add_fees',add_fees);
router.get('/view_fees',view_fees);
router.delete('/delete/:id',Delete);
router.get('/view_one_fees/:id',view_one_fees)
router.get('/view_student_fees/:id',view_student_fees)
router.put('/update/:id',Update_fees)

module.exports=router