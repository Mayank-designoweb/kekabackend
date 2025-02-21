require('dotenv').config();
const nodeMailer = require("nodemailer");
const ejs = require('ejs')
const path = require('path');
const status = require("../utils/constants");

const assetMail = async (email) => {
  try {
    const transporter = await nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.EMAIL_URL,
        pass: process.env.EMAIL_PASS
      },
    });
    const templatePath = path.join(__dirname, "templates", "assetmail.ejs")
    const htmlContent = await ejs.renderFile(templatePath)
    let info = await transporter.sendMail({
      from: '"Admin Department" <mayank.designoweb@gmail.com>',
      to: 'mayank.singhh11@gmail.com',
      subject: "Asset Allocation",
      text: "Thank you",
      html: htmlContent,
    });
    console.log("Message sent: %s", info.messageId);
    
    
  } catch (error) {
    console.log(error)
    res.status(status.Bad_request).json({msg:"something went wrong"})
    
  }
  
};
module.exports = assetMail;
