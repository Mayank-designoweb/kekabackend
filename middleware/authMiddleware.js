const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { JWT_secret } = require("../utils/jwt");
const status = require("../utils/constants");
require("dotenv").config();

const authMiddleware = async(req, res, next) => {
  try {
    const { email, password } = req.body;
    const adminExist = await prisma.admin.findUnique({ where: { email } });
    if (!adminExist) {
      return res.status(status.Bad_request).json({
        msg: "admin does not exist signup first!!",
      });
    }
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }
    req.admin = adminExist;

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
