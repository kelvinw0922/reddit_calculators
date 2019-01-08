const express = require("express");
const router = express.Router();
const { search } = require('../public/js/redditapi');

router.get("/", (req, res) => {
  res.render("index/home");
});

// AJAX GET Request of calculators pages
router.get("/results", (req, res) => {
  search("hot").then(results => {
    res.send(results);
  });
});

module.exports = router;
