const express = require('express');
const router = express.Router();
const FetchAdmin=require('../middlewear/admin')
const {AddClassRoom,ViewClassRooms,DeleteClassRoom,UpdateClass,ViewOneClassRoom} = require('../controller/class_controller')
router.post('/insert',AddClassRoom);
router.get('/view',FetchAdmin,ViewClassRooms);
router.delete('/delete/:id',DeleteClassRoom);
router.put('/update/:id',UpdateClass);
router.get('/viewClassRoom/:id',ViewOneClassRoom);
module.exports=router;