const express = require("express");
const User = require("../models/User");
const { isValidPassword, isValidEmail } = require("../util/validation");
const passport = require("../passport-config");

const router = express.Router();

const transporter = require("../util/nodemailer");
let otp = 1234;

/******************* register route *******************/
router.post("/register", async (req, res) => {
  // User.register() also looks whether there is an already existing username.
  const data = req.body;
  let errors = {};

  // if (!isValidEmail(data.email)) {
  //   errors.email = "Invalid email.";
  // }

  if (!isValidPassword(data.password, 6)) {
    errors.password = "Invalid password. Must be atleast 6 characters long.";
  }

  let exists = await User.findOne({ username: req.body.username });
  if (exists) errors.username = "Username already exists.";

  exists = await User.findOne({ email: req.body.email });
  if (exists) errors.email = "Email already exists.";

  if (otp != req.body.otp) errors.otp = "Wrong Otp.";

  console.log("hello from app.js");

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "User signup failed due to validation errors",
      errors,
    });
  }

  User.register(
    { username: req.body.username, email: req.body.email },
    req.body.password,
    (err, user) => {
      if (err) {
        res.status(500).json("not saved");
      } else {
        // console.log(user);
        passport.authenticate("local")(req, res, () => {
          res.status(200).json("User saved.");
        });
      }
    }
  );
});

/******************* Login route *******************/
router.post(
  "/login",
  inputValidation,
  passport.authenticate("local"),
  (req, res) => {
    // setTimeout(() => {
      res.status(200).json("log inned");
    // }, 500);
  }
);

function inputValidation(req, res, next) {
  const data = req.body;
  let errors = {};
  console.log(data.email);
  console.log(data.password);

  if (!isValidEmail(data.email) || !isValidPassword(data.password, 6))
    errors.email = "Invalid Email or password.";

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Authentication failed.",
      errors,
    });
  }
  next();
}

/******************* Email verification route *******************/
router.post("/register/sendEmailOtp", async (req, res) => {
  const errors = {};

  const exists = await User.findOne({ email: req.body.email });
  if (exists) {
    errors.email = "Email already exists.";
    return res.status(409).json({ errors });
  }

  otp = Math.floor(1000 + Math.random() * 9000);
  otp = parseInt(otp);
  // console.log(otp);

  var mailOptions = {
    from: process.env.MY_EMAIL,
    to: req.body.email,
    subject: "Otp for registration",
    html:
      "<h3>OTP for account verification is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      otp +
      "</h1>",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ errors: error });
    } else {
      console.log("message send to ", info.response);
    }
  });

  return res.status(200).json({ message: "OTP send successfully." });
});

module.exports = router;
