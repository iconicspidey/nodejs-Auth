const express = require("express");
const cookie = require("cookie-parser");
const server = require("./db");
const router = require("./routes/userRoutes");
const { adminAuth, basicAuth } = require("./middlewares/reqAuth");
const signMiddleware = require("./middlewares/signMiddleware");
const app = express();

// middlewares
app.use(cookie());
app.use(express.json());
// views
app.set("view engine", "ejs");
app.use(express.static("views"));
// renders
app.get("/", (req, res) => res.render("signup"));
app.get("/login", signMiddleware, (req, res) => res.render("login"));
app.get("/basic", basicAuth, (req, res) => res.render("basic"));
app.get("/admin", adminAuth, (req, res) => res.render("admin"));

// routes
app.use(router);
// server
app.listen(4000, () => console.log("server running"));
// connected to data base
server();
