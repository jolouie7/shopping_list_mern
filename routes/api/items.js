const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../../models/Item");

// @route GET api/items
// @desc Get All Items
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
    res.status(400).json("Error: " + error);
  }
});

// @route POST api/items
// @desc Create an Item
// @access Public
router.post("/", (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
    });
    newItem
      .save()
      .then((item) => res.json(item))
      .catch((err) => res.status(400).json({ error: err }));
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

// @route Delete api/items/:id
// @desc Delete an Item
// @access Public
router.delete("/:id", (req, res) => {
  try {
    Item.findByIdAndDelete(req.params.id)
      .then(() => res.json("Item deleted!"))
      .catch((err) => res.status(404).json({ error: err }));
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

module.exports = router;
