const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const status = require("../utils/constants");

const about = async (req, res) => {
  try {
    const { about, DOB, address } = req.body;
    const data = {
      about,
      DOB,
      address,
    };
    const createAbout = await prisma.about.create({ data: data });
    if (createAbout) {
      res.status(status.created).json({
        data,
        status: 1,
        msg: "successful",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(status.Bad_request).json({ msg: "something went wrong" });
  }
};

module.exports = about;
