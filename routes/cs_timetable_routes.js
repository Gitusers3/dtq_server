const express = require('express');
const router = express.Router();


const {AddCsTimetable, ViewCsTimetable,DeleteCsTimetable, UpdateCsTimetable} = require('../controller/cs_timetable_controller')
router.post('/insert',AddCsTimetable);
router.get('/view',ViewCsTimetable);
router.delete('/delete/:id',DeleteCsTimetable);
router.put('/update/:id',UpdateCsTimetable);

module.exports=router;