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

  res.render("userdashboard", {
    result: req.user,
    news: news.articles.slice(0, 8),
  });
});

module.exports = router;
