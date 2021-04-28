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

  connection.query(`SELECT * FROM Booking`, async (err, result, fields) => {
    if (err) throw err;
    else {
      res.render("staffdashboard", {
        result: req.user,
        news: news.articles.slice(0, 8),
        booking: result,
      });
    }
  });
});

router.delete("/:id", async (req, res) => {
  connection.query(
    `DELETE FROM Booking WHERE Bid = ${req.params.id}`,
    async (err, result, fields) => {
      if (err) throw err;
      else {
        res.redirect("/staff");
      }
    }
  );
});

module.exports = router;
