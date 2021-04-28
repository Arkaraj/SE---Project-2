const express = require("express");
const router = express.Router();
const connection = require("../model/connection");
const passport = require("passport");
const passportConfig = require("./passport");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = require("./user");
const staff = require("./staff");

const signToken = (id) => {
  return JWT.sign(
    {
      iss: "Arkaraj Ghosh",
      sub: id,
    },
    `${process.env.SECRET}`,
    { expressIn: "30d" }
  );
};

router.get("/login", async (req, res) => {
  res.render("login");
});
router.get("/stafflogin", async (req, res) => {
  res.render("gflogin");
});
router.get("/register", async (req, res) => {
  res.render("signup");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    connection.query(
      `SELECT * from User where email = '${email}' `,
      async function (error, results, fields) {
        if (error) throw error;
        // no error
        if (results.length == 0) {
          return res.status(200).redirect("/");
        } else {
          let encrypt = results[0].password;
          const validate = await bcrypt.compare(password, encrypt);
          if (validate) {
            const token = signToken(results[0].id);
            res.cookie("access_token", token, {
              httpOnly: true,
              sameSite: true,
            });
            console.log("User Authenticated!!");
            // Pass to the frontend
            res.status(200).redirect("/user");
            //res.json({ auth: true, token: token, result: results });
          } else {
            // Needs to be better
            return res.status(200).redirect("/");
          }
        }
      }
    );
  } catch (err) {}
});

router.post("/register", async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;

  const hash = bcrypt.hash(password, 10);

  connection.query(
    `INSERT INTO User(firstName,lastName,email,phone,password) values('${firstName}','${lastName}',${email},'${phone}','${hash}')`,
    (err, results, fields) => {
      if (err) {
        console.log("Error: " + err);
        res.send("nope");
      } else {
        res.send("added");
      }
    }
  );
});

router.post("/stafflogin", async (req, res) => {
  const { email, password } = req.body;

  connection.query(
    `SELECT * from Staff where email = '${email} and password = '${password}' `,
    async (error, results, fields) => {
      if (error) throw error;
      // no error
      if (results.length == 0) {
        return res.status(200).redirect("/");
      } else {
        const token = signToken(results[0].Sid);
        res.cookie("access_token", token, {
          httpOnly: true,
          sameSite: true,
        });
        console.log("Staff Authenticated!!");
        // Pass to the frontend
        res.status(200).redirect("/staff");
      }
    }
  );
});

router.use("/user", passport.authenticate("jwt", { session: false }), user);
router.use("/staff", passport.authenticate("jwt", { session: false }), staff);

module.exports = router;