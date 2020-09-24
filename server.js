const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');

require("dotenv").config();

// Bring in Routes
const items = require('./routes/api/items')

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to mongodb
const uri = process.env.MONGODB_URL;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Use routes
app.use("/api/items", items)

// start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});