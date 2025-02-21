const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: "dywsjphyl",
  api_key: "388826427576778",
  api_secret: "MFKRGBoR8GA4nKy_yl1DHOnstJ8",
});

module.exports = cloudinary;
