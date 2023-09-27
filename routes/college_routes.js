const express = require('express');
const router = express.Router();


const {AddCollege, ViewCollege,DeleteCollege, UpdateCollege, ViewOneCollege} = require('../controller/college_controller')
const FetchAdmin=require('../middlewear/admin')
router.post('/insert',AddCollege);
router.get('/view',FetchAdmin,ViewCollege);
router.delete('/delete/:id',DeleteCollege);
router.put('/update/:id',UpdateCollege);
router.get('/viewCollege/:id',ViewOneCollege);

module.exports=router;