const express = require('express');
const admin = require('../controller/admin-controller');
const app = express();
const router = express.Router();

router.post("/adminsignup", admin.adminSignup)
router.post("/adminlogin", admin.adminLogin)






module.exports = router;
