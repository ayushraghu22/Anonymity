const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service : 'Gmail',
    
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD
    }
});

module.exports = transporter;