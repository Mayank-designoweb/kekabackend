const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();
const status = require("../utils/constants");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../middleware/multer"); //use this or

//Multer configuration
// const storage = multer.memoryStorage();
// const upload = multer({ storage}); // or use this


// about section
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

// GET: Read Employee's About Section
router.get("/emp", async (req, res) => {
  try {
      // const employeeId = req.user.id;
      const aboutData = await prisma.employee.findMany();

      if (!aboutData) {
          return res.status(404).json({ error: "About section not found" });
      }

      res.json(aboutData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch About section" });
  }
});

// // POST: Create About Section (if it doesn't exist)
router.post("/post", async (req, res) => {
  try {
      // const employeeId = req.user.id;
      const { about, DOB, address } = req.body;

      const newAbout = await prisma.about.create({
          data: { employeeId, about, DOB, address },
      });

      res.status(201).json({ message: "About section created", newAbout });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create About section" });
  }
});

// // PUT: Update Employee's About Section
// router.put("/about", authMiddleware, async (req, res) => {
//   try {
//       const employeeId = req.user.id;
//       const { about, DOB, address } = req.body;

//       const updatedAbout = await prisma.about.update({
//           where: { employeeId },
//           data: { about, DOB, address },
//       });

//       res.json({ message: "About section updated", updatedAbout });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Failed to update About section" });
//   }
// });

// // DELETE: Remove Employee's About Section
// router.delete("/about", authMiddleware, async (req, res) => {
//   try {
//       const employeeId = req.user.id;

//       await prisma.about.delete({
//           where: { employeeId },
//       });

//       res.json({ message: "About section deleted" });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Failed to delete About section" });
//   }
// });

// Home Section (cloudinary and multer image upload)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file ) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    //Upload Image to cloudinary

    // cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
    //   if (error) {
    //     return res.status(500).json({ success: false, message: "Upload failed", error });
    //   }
    // });

    

    // const file = req.files.image; //  Get uploaded file
    // const result = await cloudinary.uploader.upload(file.tempFilePath);

    //  Convert Buffer to Stream & Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });

      stream.end(req.file.buffer); // Convert buffer to stream
    });

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result,
    });
    // end(req.file.buffer); // Convert memory storage buffer to stream


  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
});

// const home = async (req, res) => {
//   try {
//     const file = req.file.image; 

//     const uploadedImage = await cloudinary.uploader.upload(file, {
//       folder: "user_uploads", // Cloudinary store images in this folder
//     });

//     const newHomeEntry = await prisma.home.create({
//       data: { imageUrl: uploadedImage.secure_url },
//     });

//     res.status(201).json({ message: "Home updated", home: newHomeEntry });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Failed to update home section" });
//   }
// };

module.exports = about;
module.exports = router;

