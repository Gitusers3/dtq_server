const express = require('express');
const router = express.Router();


const {AddTechTimetable, ViewTechTimetable,DeleteTechTimetable, UpdateTechTimetable} = require('../controller/tech_timetable_controller')
router.post('/insert',AddTechTimetable);
router.get('/view',ViewTechTimetable);
router.delete('/delete/:id',DeleteTechTimetable);
router.put('/update/:id',UpdateTechTimetable);

module.exports=router;