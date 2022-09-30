const mongoose = require("mongoose");
// Connect MongoDB at default port 27017.
const uri = "mongodb+srv://spidey:spidey@node.cytqzi4.mongodb.net/spidey";
const server = () => {
  mongoose.connect(uri, err => {
    if (!err) {
      console.log("server is running");
    } else {
      console.log("Error in DB connection: " + err);
    }
  });
};
module.exports = server;
