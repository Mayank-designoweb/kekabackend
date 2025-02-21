const status = require("../utils/constants");
const bcrypt = require("bcrypt");
const createAdminServices = require("../services/adminService");
const { PrismaClient } = require("@prisma/client");
const regex = require("../utils/utils");
const assetMail = require("../controllers/assetMail");
const prisma = new PrismaClient();

const adminSignup = async (req, res) => {
  try {
    const { email, password, firstname, lastname, contact, companyname } =
      req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Missing required feilds",
      });
    }
    const userExist = await prisma.admin.findUnique({
      where: { email: email },
    });

    if (userExist) {
      return res
        .status(status.Bad_request)
        .json({ message: "email already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!regex.emailRegex.test(email)) {
      return res.status(400).json({ message: "inValid email address" });
    }

    if (!regex.passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password should be At least 8 chars, 1 uppercase, 1 number",
      });
    }
    if (!regex.phoneRegex.test(contact)) {
      return res.status(400).json({
        message: "Enter valid contact details please",
      });
    }
    if (!regex.nameRegex.test(firstname)) {
      return res.status(400).json({
        message: "name should not contain any numeric value",
      });
    }
    if (!regex.nameRegex.test(lastname)) {
      return res.status(400).json({
        message: "should not contain any numeric value",
      });
    }

    const data = {
      email,
      password: hashedPassword,
      firstname,
      lastname,
      companyname,
      contact,
    };
    const createdAdmin = await createAdminServices(data);
    return res.status(status.ok).json(createdAdmin);
  } catch (error) {
    console.log(error);
    res.status(status.Bad_request).json({ message: "something is wrong" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminExist = await prisma.admin.findUnique({ where: { email } });
    if (!adminExist) {
      return res.status(status.Bad_request).json({
        message: "admin does not exist signup first!!",
      });
    }
    const isMatch = await bcrypt.compare(password, adminExist.password);
    if (!isMatch) {
      return res.status(status.Bad_request).json({
        message: "wrong password",
      });
    }
    if (adminExist) {
      // const token = jwt.sign({ email }, JWT_secret);

      res.status(200).json({
        message: "login successful",
        // token,
      });
      req.user = adminExist;
    }
  } catch (error) {
    console.log(error);
    res.status(status.something_wrong).json(status.messages[500]);
  }
};
// get all emp
const getAllEmp = async (req, res) => {
  try {
    const emp = await prisma.employee.findMany();
    if (!emp || emp === 0) {
      return res.status(status.not_found).json({ message: "no users found" });
    }
    res.status(status.ok).json(emp);
  } catch (error) {
    console.log(error);
  }
};
// create assets
const Asset = async (req, res) => {
  try {
    const { assetId, name, price, condition, category, imageUrl } = req.body;

    const assetExist = await prisma.assets.findUnique({
      where: { assetId: assetId },
    });

    if (assetExist) {
      return res
        .status(status.Bad_request)
        .json({ message: "AssetID already exists!" });
    }
    const assetData = { assetId, name, price, condition, category, imageUrl };
    const createAsset = await createAdminServices.createAssetServices(
      assetData
    );
    res.status(status.created).json({ createAsset });
  } catch (error) {
    console.log(error);
    res
      .status(status.something_wrong)
      .json({ messgae: "something went wrong" });
  }
};
// to get all assets
const getAssets = async (req, res) => {
  try {
    const getA = await prisma.assets.findMany();
    if (!getA || getA === 0) {
      return res.status(status.not_found).json({ message: "no assets found" });
    }
    res.status(status.ok).json(getA);
  } catch (error) {
    console.log(error);
  }
};
const allocateAsset = async (req, res) => {
  try {
    const { email, assetId } = req.body;
    const employee = await prisma.employee.findUnique({
      where: { email: email },
    });
    if (!employee) {
      return res.status(400).json({ error: "Employee not found" });
    }
    
    const asset = await prisma.assets.findUnique({
      where: { assetId: assetId },
    });
    if (!asset) {
      return res.status(400).json({ error: "Asset not found" });
    }
    const updatedAsset = await prisma.assets.update({
      where: { assetId: assetId },
      data: { employeeId: employee.id },
    });
    const mail = await assetMail(email)
    res
      .status(200)
      .json({ message: "Asset assigned successfully", updatedAsset, mail });
  } catch (error) {
    console.log(error);
  }
};
const assetQuery = async (req, res) => {
  try {
    const { email } = req.body;
    const employee = await prisma.employee.findUnique({
      where: { email },
      include: { assets: true },
    });
    if (!employee) {
      return res.status(400).json({ error: "Employee not found" });
    }

    res.json({ employee, assets: employee.assets });
  } catch (error) {
    console.log(error);
    res
      .status(status.something_wrong)
      .json({ messgae: "something went wrong" });
  }
};

module.exports = {
  adminSignup,
  adminLogin,
  getAllEmp,
  Asset,
  getAssets,
  allocateAsset,
  assetQuery,
};
