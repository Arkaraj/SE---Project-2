const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");

const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const auth = require("./routes/auth");

app.use("/", express.static(path.join(__dirname, "views/")));
//Setting view engine for ejs
app.set("view engine", "ejs");

app.use("/", auth);

app.get("/", async (req, res) => {
  res.render("index");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listning in Port ${PORT} 🚀`);
});
