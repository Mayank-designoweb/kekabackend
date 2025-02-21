require('dotenv').config();
const nodeMailer = require("nodemailer");
const ejs = require('ejs')
const path = require('path');
const status = require("../utils/constants");

const sendMail = async (recipientmail) => {
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
    const templatePath = path.join(__dirname, "templates", "signupthankyou.ejs")
    const htmlContent = await ejs.renderFile(templatePath, {
      name: recipientmail.split("@")[0],
      loginUrl: "localhost:3000/api/auth/adminlogin"
    })
    let info = await transporter.sendMail({
      from: '"KEKA-BACKEND" <mayank.designoweb@gmail.com>',
      to: recipientmail,
      subject: "Thankyou for signing up",
      text: "thank you",
      html: htmlContent,
    });
    console.log("Message sent: %s", info.messageId);
    
    
  } catch (error) {
    console.log(error)
    res.status(status.Bad_request).json({msg:"something went wrong"})
    
  }
  
};
module.exports = sendMail;
