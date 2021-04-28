const express = require("express");
const app = express();
require("dotenv").config();
const mysql = require("mysql2");

const cookieParser = require("cookie-parser");

const connection = mysql.createConnection({
  host: `${process.env.HOST}`,
  user: `${process.env.USER_DB}`,
  password: `${process.env.PASSWORD}`,
  database: `${process.env.DB_NAME}`,
});

connection.connect((err) => {
  if (err) {
    console.log("Error in connecting the Database ...");
    return;
  } else console.log("connected as id " + connection.threadId);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//Setting view engine for ejs
app.set("view engine", "ejs");

// app.use('/', express.static(path.join(__dirname, 'views/')));
// app.use('/posts', postRouter)

// connection.query(
//   'SELECT * FROM `books` WHERE `name` = "Book 3"',
//   (err, results, fields) => {

//   }
// );

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listning in Port ${PORT} 🚀`);
});
