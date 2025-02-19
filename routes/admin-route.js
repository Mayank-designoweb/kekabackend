const express = require('express');
const admin = require('../controller/admin-controller');
const about = require('../controller/navbar-cont');
const app = express();
const router = express.Router();

router.post("/adminsignup", admin.adminSignup)
router.post("/adminlogin", admin.adminLogin)
router.post("/home", about )





module.exports = router;
