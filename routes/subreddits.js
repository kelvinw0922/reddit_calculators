const express = require("express");
const router = express.Router();
const { search, calculator_search } = require("../public/js/redditapi");
const path = require("path");

// Subreddits Pages

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
router.get("/GraphingCalculator", (req, res) => {
  subredditName = path.basename(req.route.path);
  res.render("subreddits/subreddit", {
    GraphingCalculator: true,
    subreddit: subredditName,
    title: "r/GraphingCalculator"
  });
});

// LearnMath
router.get("/learnmath", (req, res) => {
  subredditName = path.basename(req.route.path);
  res.render("subreddits/subreddit", {
    learnmath: true,
    subreddit: subredditName,
    title: "r/learnmath"
  });
});

// Math
router.get("/math", (req, res) => {
  subredditName = path.basename(req.route.path);
  res.render("subreddits/subreddit", {
    math: true,
    subreddit: subredditName,
    title: "r/math"
  });
});

// MathEducation
router.get("/matheducation", (req, res) => {
  subredditName = path.basename(req.route.path);
  res.render("subreddits/subreddit", {
    matheducation: true,
    subreddit: subredditName,
    title: "r/matheducation"
  });
});

// AJAX GET Request of each subreddit
router.get("/result/:subreddit/:sortBy", (req, res) => {
  if (req.params.subreddit === 'calculators' || req.params.subreddit === 'GraphingCalculator') {
    search(req.params.subreddit, req.params.sortBy).then(results => {
      res.send(results);
    });
  }
  else {
    calculator_search(req.params.subreddit, req.params.sortBy).then(results => {
      res.send(results);
    });
  }

});

module.exports = router;
