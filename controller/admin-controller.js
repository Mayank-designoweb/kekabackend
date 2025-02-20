const express = require("express");
const status = require("../utils/constants");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createAdminServices = require("../services/adminService");
const { PrismaClient } = require("@prisma/client");
const regex = require("../utils/utils");
const { JWT_secret } = require("../utils/jwt");
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
        .json({ msg: "email already exists!" });
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
        message: "Enter valid contact details",
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
    res.status(status.ok).json(createdAdmin);
  } catch (error) {
    console.log(error);
    res.status(status.Bad_request).json(status.messages[400]);
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminExist = await prisma.admin.findUnique({ where: { email } });
    if (!adminExist) {
      return res.status(status.Bad_request).json({
        msg: "admin does not exist signup first!!",
      });
    }
    const isMatch = await bcrypt.compare(password, adminExist.password);
    if (!isMatch) {
      return res.status(status.Bad_request).json({
        msg: "wrong password",
      });
    }
    if (adminExist) {
      // const token = jwt.sign({ email }, JWT_secret);

      res.status(200).json({
        mgd: "login successful",
        // token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(status.something_wrong).json(status.messages[500]);
  }
};

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

module.exports = {
  adminSignup,
  adminLogin,
  getAllEmp,
};
