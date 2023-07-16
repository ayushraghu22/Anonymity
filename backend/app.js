require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const session = require("express-session");
const passport = require("./passport-config");

const cors = require("cors");

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

const app = express();
const PORT = process.env.PORT;
// const { isValidPassword, isValidText } = require("./util/validation");

app.use(
  cors({
    origin: "https://anonymity1.netlify.app",
    methods: "GET, POST, PATCH, DELETE",
    credentials: true,
    cookie: {
      expires: 24 * 60 * 60 * 1000,
      httpOnly: false,
    },
  })
);

// app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.enable('trust proxy')
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      secure: true,
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 day;
      sameSite: "none",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());


///////////////////////////////////////// imports done//////////////////////////

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL, () => {
  console.log("Connected with database");
});

// passport.use(User.createStrategy());
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

app.use(authRoutes);
app.use("/posts", postRoutes);

app.get("/logout", (req, res) => {
  // console.log("logout");
  req.logout((err) => {
    if (err) res.status(500).json("Fail to log out");
    else res.status(200).json("successfully logout. ");
  });
});

app.listen(PORT || 5000, () => {
  console.log(`Server is running on port ${PORT}`);
});
