const mysql = require("mysql2");

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

module.exports = connection;
