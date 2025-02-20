const jwt = require("jsonwebtoken");
const { JWT_secret } = require("../utils/jwt");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, JWT_secret);
    console.log(decoded);
    
    if (decoded.email) {
      next();
    } else {
      res.status(403).json({
        msg: "you are not authenticated",
      });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
  
};

module.exports = authMiddleware;
