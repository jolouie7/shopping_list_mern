const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User Model
const User = require("../../models/User");

// @route POST api/auth
// @desc Authenticate user
// @access Public
router.post("/", (req, res) => {
  const { email, password, username } = req.body;

  // Simple validation
  if (!email || !password || !username) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email, username }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exitst" });

    // Validate password
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if(!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

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
    })
  });
});

// @route GET api/auth/user
// @desc Get user data
// @access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
  .select("-password") // return everything except password
  .then(user => res.json(user))
})

module.exports = router;
