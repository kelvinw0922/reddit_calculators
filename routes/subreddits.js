const express = require("express");
const router = express.Router();
const { search } = require("../public/js/redditapi");
const path = require("path");

// Subreddits Page

// Calculator
router.get("/calculator", (req, res) => {
  subredditName = path.basename(req.route.path);
  res.render("subreddits/subreddit", {
    ssd: true,
    subreddit: subredditName,
    title: "Solid State Drives (SSD)"
  });
});

// GraphingCalculator

// LearnMath

// Math

// MathEducation

// AJAX GET Request of each subreddit
router.get("/result/:subreddit", (req, res) => {
  search(req.params.subreddit, "new").then(results => {
    res.send(results);
  });
});

module.exports = router;
