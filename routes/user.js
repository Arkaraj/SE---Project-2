const express = require("express");
const router = express.Router();
const connection = require("../model/connection");
const passport = require("passport");
const passportConfig = require("./passport");
const JWT = require("jsonwebtoken");

const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API);

router.get("/", async (req, res) => {
  const news = await newsapi.v2.topHeadlines({
    category: "sports",
    language: "en",
    country: "in",
  });

  let booking = [];

  // SELECT * FROM Booking,User INNER JOIN User on Booking.userId = User.id

  connection.query(
    `SELECT * FROM Booking where Booking.userId = ${req.user.id}`,
    async (err, result, fields) => {
      if (err) throw err;
      else {
        booking = result;
        res.render("userdashboard", {
          result: req.user,
          news: news.articles.slice(0, 8),
          booking,
        });
      }
    }
  );
});

router.get("/booking", async (req, res) => {
  res.render("booking");
});

router.post("/booking", async (req, res) => {
  const { city, stadium, Timing, Date } = req.body;

  /**
   * Note
   * Timings: 1 => 6-8 am
   * Timings: 2 => 10-12 am
   * Timings: 3 => 2-4 pm
   */

  connection.query(
    `INSERT INTO Booking(userId,groundId,city,stadium,Date,Timing) values(${req.user.id},1,'${city}','${stadium}','${Date}', '${Timing}')`,
    async (err, result, fields) => {
      if (err) throw err;
      else {
        res.redirect("/user");
      }
    }
  );
});

module.exports = router;
