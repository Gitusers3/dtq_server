const express = require('express');
const router = express.Router();


const {AddClTimetable, ViewClTimetable,DeleteClTimetable, UpdateClTimetable} = require('../controller/cl_timetable_controller')
router.post('/insert',AddClTimetable);
router.get('/view',ViewClTimetable);
router.delete('/delete/:id',DeleteClTimetable);
router.put('/update/:id',UpdateClTimetable);

module.exports=router;