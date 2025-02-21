const express = require('express');
const admin = require('../controller/admin-controller');
const about = require('../controller/navbar-cont');
const authMiddleware = require('../middleware/authMiddleware');
// const upload = require('../middleware/multer');
const app = express();
const router = express.Router();

router.post("/adminsignup", admin.adminSignup)
router.post("/adminlogin", admin.adminLogin)
router.post("/about", authMiddleware, about );
router.post("/upload", upload);





module.exports = router;
