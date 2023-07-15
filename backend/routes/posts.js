const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { isValidText } = require("../util/validation");
const passport = require("../passport-config");

router.get("/", async (req, res) => {
  if (req.isAuthenticated()) {
    // console.log(req.sessionID);
    Post.find({}, (err, foundUsers) => {
      if (err) {
        return res.status(500).json("could not found data");
      } else {
        return res.status(200).json({ foundUsers: foundUsers });
      }
    })
      .populate("author", ["email", "username"])
      .sort({ createdAt: -1 })
      .limit(25);
  } else {
    return res.status(401).json("unauthorized user");
  }
});

router.get("/:postId", async (req, res) => {
  const id = req.params.postId;

  if (req.isAuthenticated()) {
    Post.findById(id, (err, foundUser) => {
      if (err) {
        return res.status(500).json("could not found data");
      } else {
        return res.status(200).json({ foundUser });
      }
    }).populate("author", ["username", "email"]);
  } else {
    return res.status(422).json("user not authenticated.");
  }
});

router.post("/", async (req, res) => {
  const data = req.body;
  const errors = {};

  if (!isValidText(data.title)) {
    errors.title = "Invalid title. Must be atleast 1 character long.";
  }
  if (!isValidText(data.description)) {
    errors.description =
      "Invalid description. Must be atleast 1 character long.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Invalid Input",
      errors,
    });
  }

  if (req.isAuthenticated()) {
    console.log("inside is ");
    console.log(req.user);
    passport.authenticate("local", async (err, user, info) => {
      if (err) {
        return res.status(500).json("Could not authenticate.");
      } else {
        try {
          // console.log("user is", info);
          const { title, description, usernameDisplayStatus } = req.body;
          const postData = await Post.create({
            title,
            description,
            usernameDisplayStatus,
            author: req.user._id,
          });
          return res.status(200).json("Post save successufully.");
        } catch (e) {
          return res.status(500).json("Cannot save posts. Please try later.");
        }
      }
    })(req, res);
  } else return res.status(401).json("unauthorized user!");
});

router.patch("/:postId", (req, res) => {
  const id = req.params.postId;

  if (req.isAuthenticated()) {
    Post.findById({ _id: id }, (err, user) => {
      if (err) {
        return res.status(500).json("Cannot update user's data.");
      } 
      else {
        console.log(user);
        user.title = req.body.title;
        user.description = req.body.description;
        user.usernameDisplayStatus = req.body.usernameDisplayStatus;
        user.save(() => {
          return res.status(200).json("Post data updated.");
        });
      }
    });
  } else {
    return res.status(401).json("Unauthorized.");
  }
});

router.delete("/:postId", (req, res) => {
  const id = req.params.postId;
  //   console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    Post.findByIdAndDelete({ _id: id }, (err, user) => {
      if (err) {
        return res.status(500).json("Unable to delete post.");
      } else return res.status(200).json("Post deleted successfully.");
    });
  } else {
    res.status(422).json("User is not authenticated.");
  }
});

module.exports = router;
