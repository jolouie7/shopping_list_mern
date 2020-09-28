const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User Model
const User = require("../../models/User");

// @route GET api/users
// @desc Get all users
// @access Private
router.get("/", auth, (req, res) => {
  try {
    const users = User.find();
    if (!users) throw Error("No users exist");
    res.json(users)
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
})

module.exports = router;
