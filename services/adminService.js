const { PrismaClient } = require("@prisma/client");
const { messages } = require("../utils/constants");
const status = require("../utils/constants");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { JWT_secret } = require("../utils/jwt");
const sendMail = require("../controllers/mailCont");

const createAdminServices = async (data) => {
  try {
    const { email } = data;
    const newAdmin = await prisma.admin.create({
      data: data,
    });
    if (newAdmin) {
      const token = jwt.sign({ email }, JWT_secret);
      const mail = await sendMail(email);
      return {
        status: "1",
        message: "Admin created successfully",
        data,
        token,
        mail,
      };
    }
  } catch (error) {
    console.log(error);
    res.status(status.Bad_request).json({ msg: "somethig is wrong" });
  }
};

const createAssetServices = async (assetData) => {
  try {
    const newAsset = await prisma.assets.create({
      data: assetData
    })
    if (newAsset) {
      return {
        status: "1",
        message: "Asset created successfully",
        assetData,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: "-1",
      message: "something went wrong"
    }
  }
};

module.exports = {createAdminServices, createAssetServices};
