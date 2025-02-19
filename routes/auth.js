const express = require("express");
const { validateSignup, validateLogin } = require("../validators/authValidator");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

//  Using the controller functions
router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);

module.exports = router;
