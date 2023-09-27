const express = require('express');
const router = express.Router();
const {AddCourse, ViewCourses} = require('../controller/course_controller')
const FetchAdmin=require("../middlewear/admin")
router.post('/insert',AddCourse)
router.get('/view',FetchAdmin,ViewCourses)

module.exports=router;