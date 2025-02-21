const express = require('express');
const admin = require('../controller/admin-controller');
const nav = require('../controller/navbar-cont');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const sendMail = require('../controllers/mailCont');
const router = express.Router();

router.post("/adminsignup", admin.adminSignup)
router.post("/adminlogin", admin.adminLogin)
router.get("/admin/employees", admin.getAllEmp)
router.post("/home/about", nav.about )
router.post("/mail",sendMail)
router.post("/asset",admin.Asset)
router.get("/getassets",admin.getAssets)
router.put("/allocateassets",admin.allocateAsset)
router.get("/assetsQ",admin.assetQuery)





module.exports = router;
