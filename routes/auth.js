const express = require("express");
const router = express.Router();
const connection = require("../model/connection");
const passport = require("passport");
const passportConfig = require("./passport");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = require("./user");
const staff = require("./staff");
const admin = require("./admin");
const NewsAPI = require("newsapi");
const isStaff = require("../middleware/isStaff");
const isUser = require("../middleware/isUser");
const isAdmin = require("../middleware/isAdmin");

const signToken = (id, role) => {
  return JWT.sign(
    {
      iss: "Arkaraj Ghosh",
      sub: { id, role },
    },
    `${process.env.SECRET}`,
    { expiresIn: "30d" }
  );
};

router.use(passport.initialize());
router.use(passport.session());

router.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  isUser,
  user
);

router.use(
  "/staff",
  passport.authenticate("jwt", { session: false }),
  isStaff,
  staff
);

router.use(
  "/admin",
  passport.authenticate("jwt", {
    failureRedirect: "/adminlogin",
    session: false,
  }),
  isAdmin,
  admin
);

router.get("/login", async (req, res) => {
  res.render("login", { msg: { msg: null, flag: true } });
});

router.get("/stafflogin", async (req, res) => {
  res.render("gflogin", { msg: { msg: null } });
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
        if (error) {
          throw error;
        }
        // no error
        if (results.length == 0) {
          const msg = "Sorry User no exists";
          return res.status(200).render("login", { msg: { msg, flag: false } });
        } else {
          let encrypt = results[0].password;
          const validate = await bcrypt.compare(password, encrypt);
          if (validate) {
            const token = signToken(results[0].id, results[0].role);
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
            const msg = "Validation Error, Incorrect Password";
            return res
              .status(200)
              .render("login", { msg: { msg, flag: false } });
          }
        }
      }
    );
  } catch (err) {}
});

router.post("/register", async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  connection.query(
    `INSERT INTO User(firstName,lastName,email,phone,password,role) values('${firstName}','${lastName}','${email}','${phone}','${hash}',0)`,
    (err, results, fields) => {
      if (err) {
        console.log("Error: " + err);
        res.redirect("/");
      } else {
        res.render("login", {
          msg: {
            msg: "Registered Successfully, now you can Login",
            flag: true,
          },
        });
      }
    }
  );
});

router.post("/stafflogin", async (req, res) => {
  const { email, password } = req.body;
  connection.query(
    `SELECT * from Staff where email = '${email}' and password = '${password}' `,
    async (error, results, fields) => {
      if (error) throw error;
      // no error
      if (results.length == 0) {
        const msg = "Incorrect Credentials";
        return res.status(200).render("gflogin", { msg: { msg, flag: false } });
      } else {
        const token = signToken(results[0].Sid, results[0].role);
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

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.redirect("/");
  }
);

router.get("/adminlogin", async (req, res) => {
  res.render("adminlogin", { msg: { msg: null, flag: true } });
});

router.post("/adminlogin", async (req, res) => {
  const { email, password } = req.body;

  connection.query(
    `SELECT * from Admin where email = '${email}' and password = '${password}' `,
    async (error, results, fields) => {
      if (error) throw error;
      // no error
      if (results.length == 0) {
        const msg = "Incorrect Credentials";
        return res
          .status(200)
          .render("adminlogin", { msg: { msg, flag: flase } });
      } else {
        const token = signToken(results[0].id, results[0].role);
        res.cookie("access_token", token, {
          httpOnly: true,
          sameSite: true,
        });
        console.log("Admin Authenticated!!");
        // Pass to the frontend
        res.status(200).redirect("/admin");
      }
    }
  );
});

module.exports = router;
