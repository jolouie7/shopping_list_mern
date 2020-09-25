const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/User");

// @route POST api/users
// @desc Register new user
// @access Public
router.post("/", (req, res) => {
  const { name, email, password, username } = req.body;

  // Simple validation
  if (!name || !email || !password || !username) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email, username }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exitst" });

    const newUser = new User({
      name,
      email,
      username,
      password,
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 86400 }, // expires in 24hours
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  username: user.username,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
