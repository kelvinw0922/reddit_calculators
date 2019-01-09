const express = require("express");
const router = express.Router();
const { search } = require("../public/js/redditapi");
const path = require("path");

// Subreddits Page

// Calculator
router.get("/calculators", (req, res) => {
  subredditName = path.basename(req.route.path);
  res.render("subreddits/subreddit", {
    calculators: true,
    subreddit: subredditName,
    title: "r/Calculator"
  });
});

// GraphingCalculator

// LearnMath

// Math

// MathEducation

// AJAX GET Request of each subreddit
router.get("/result/:subreddit", (req, res) => {
  search(req.params.subreddit, "hot").then(results => {
    res.send(results);
  });
});

module.exports = router;
