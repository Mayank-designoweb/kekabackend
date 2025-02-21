// const PrismaClient = require("@prisma/client");
// const status = require("../utils/constants");
// const prisma = new PrismaClient();

const status = require("../utils/constants");

const adminMiddleware = async (req, res, next) => {
  try {
    console.log(req.admin);
    res.status(status.ok).json({msg:"you are authorized"})
    
    
   
  } catch (error) {
    console.log(error);
  }
};

module.exports = adminMiddleware;
