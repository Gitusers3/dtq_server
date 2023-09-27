const express = require('express');
const router = express.Router();
const { Login,Register,View} = require('../controller/admin_controller')
const FetchAdmin = require('../middlewear/admin')
router.post('/login',Login)
router.post('/register',Register)
router.get('/view',FetchAdmin,View)

module.exports=router;