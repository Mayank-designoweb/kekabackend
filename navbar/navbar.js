const express = require('express');
const about  = require('../controller/navbar-cont');
const app = express();
const router = express.Router();


router.post("/about", about )






module.exports = router;
