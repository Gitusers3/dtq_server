const express = require('express');
const router = express.Router();
const Update  = require('../controller/academics_controller')
const FetchAdmin = require('../middlewear/admin')
router.put('/update/:id',FetchAdmin,Update);
module.exports=router;