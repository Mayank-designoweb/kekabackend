const { PrismaClient } = require("@prisma/client");
const { messages } = require("../utils/constants");
const status = require("../utils/constants");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { JWT_secret } = require("../utils/jwt");

const createAdminServices = async (data) => {
  try {
    const { email } = data;
    const newAdmin = await prisma.admin.create({
      data: data,
    });
    if (newAdmin) {
      const token = jwt.sign({ email }, JWT_secret);

      return {
        messages: "Admin created successfully",
        status: 1,
        token,
      };
    }
  } catch (error) {
    console.log(error);
    res.status(status.Bad_request).json({status: "-1"});
    
  }
};

const loginAdmin = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports = createAdminServices;
