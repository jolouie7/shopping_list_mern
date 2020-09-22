const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../../models/Item");

// @route GET api/items
// @desc Get All items
// @access Public
router.get("/", (req, res) => {
  try {
    // const items = await Item.find();
    // const sorted_items = await items.sort({ date: -1 }) // sort in descending order
    // const json = await res.json(sorted_items);
    Item.find()
      .sort({ date: -1 }) // sort in descending order
      .then((items) => res.json(items));
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
})

module.exports = router;