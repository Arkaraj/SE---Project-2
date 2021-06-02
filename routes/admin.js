const express = require("express");

const router = express.Router();
const connection = require("../model/connection");

router.get("/", (req, res) => {
  res.render("admin", { msg: { msg: null, flag: true } });
});

router.post("/staff", async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  connection.query(
    `INSERT INTO Staff(firstName, lastName, email, password, phone,role) VALUES('${firstName}','${lastName}','${email}','${password}','${phone}',1)`,
    async (err, results, fields) => {
      if (err) {
        console.log("Error: " + err);
        res.redirect("/admin", { msg: { msg: err, flag: false } });
      } else {
        let msg = "Added Staff";
        res.render("/admin", { msg: { msg, flag: true } });
      }
    }
  );
});

router.post("/maintenance", async (req, res) => {
  const { name } = req.body;

  connection.query(
    `UPDATE Ground SET available = 0 WHERE name=${name}`,
    async (err, results, fields) => {
      if (err) {
        console.log("Error: " + err);
        res.redirect("/admin", { msg: { msg: err, flag: false } });
      } else {
        let msg = "Added Staff";
        res.render("/admin", { msg: { msg, flag: true } });
      }
    }
  );
});

router.delete("/book/:id", async (req, res) => {
  connection.query(
    `DELETE FROM Booking WHERE Bid = ${req.params.id}`,
    async (err, result, fields) => {
      if (err) throw err;
      else {
        let msg = `Successfully removed Booking`;
        res.redirect("/admin", { msg: { msg, flag: true } });
      }
    }
  );
});

module.exports = router;
