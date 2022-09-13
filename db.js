const mongoose = require("mongoose");
const express = require("express");
const app = express();
// Connect MongoDB at default port 27017.
const server = () => {
  mongoose.connect(
    "mongodb://localhost:27017/authenthication",

    err => {
      if (!err) {
        console.log("server is running");
      } else {
        console.log("Error in DB connection: " + err);
      }
    }
  );
};
module.exports = server;
