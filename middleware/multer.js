const multer = require("multer");

const storage = multer.memoryStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;

// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "user_uploads",
//     format: async (req, file) => "png",
//     public_id: (req, file) => Date.now() + "-" + file.originalname,
//   },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;
