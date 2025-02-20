const express = require('express');
const admin = require('../controller/admin-controller');
const nav = require('../controller/navbar-cont');
const authMiddleware = require('../middleware/authMiddleware');
const rbacMiddleware = require('../middleware/rbacMiddleware');
const app = express();
const router = express.Router();

router.post("/adminsignup", admin.adminSignup)
router.post("/adminlogin", authMiddleware, admin.adminLogin)
router.get("/admin/employees", admin.getAllEmp)
router.post("/home/about", nav.about )
router.post("/profile/admin", authMiddleware, rbacMiddleware(["admin"]), nav.adminProfile )






module.exports = router;
