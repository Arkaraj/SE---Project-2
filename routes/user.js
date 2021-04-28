const express = require("express");
const router = express.Router();
const connection = require("../model/connection");
const passport = require("passport");
const passportConfig = require("./passport");
const JWT = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.render("userdashboard");
});

module.exports = router;
