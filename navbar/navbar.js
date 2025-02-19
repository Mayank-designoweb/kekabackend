const express = require('express');
const { about } = require('../controller/navbar-cont');
const app = express();
const router = express.Router();


router.post("/home", about )





module.exports = router;
