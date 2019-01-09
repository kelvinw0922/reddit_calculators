const express = require('express');
const exphbs = require("express-handlebars");
const path = require("path");
const { spinner } = require("./helpers/spinner");

// Initialize Express
const app = express();

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    helpers: {
      spinner: spinner
    },
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Set default page to r/Calculators
app.get('/', (req, res) => res.redirect('/calculators'));

// Load Routes
//const index = require("./routes/index");
const subreddits = require('./routes/subreddits');

// Routes
//app.use("/", index);
app.use('/', subreddits)

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Listen
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});