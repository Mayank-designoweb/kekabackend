const express = require("express");
const { validateSignup, validateLogin } = require("../validators/authValidator");
const { signup, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware"); //Imported Middleware
const router = express.Router();


//  Using the controller functions
router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);


// Adding a test route to check if authMiddleware is working
router.get("/protected", authMiddleware, (req, res) => {
    console.log("authMiddleware executed for:", req.user); //  This should log user data
    res.json({ message: "Protected route accessed!", user: req.user });
});

module.exports = router;
