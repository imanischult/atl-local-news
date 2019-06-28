// Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = 3000;

// Require axios and cheerio to make scraping possible
const axios = require("axios");
const cheerio = require("cheerio");

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev")); // +++ What's "dev"?
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// +++++ require handlebars to display front end +++++

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/atlArticlesdb", {
  useNewUrlParser: true
});

// Routes

// app.get("/scrape", function(req, res) {
axios.get("https://patch.com/georgia/atlanta").then(function(response) {
  console.log(response.data);
  const $ = cheerio.load(response.data);
  //For each element with an li tag and a class of "tease"...

  $("section.px-3.px-sm-4.d-flex.flex-row").each(function(index, element) {
    //find the following data (saved in a variable)
    const results = {};

    results.title = $(this)
      .find("h2")
      .find("a")
      .attr("title");

    results.descr = $(this)
      .find("p")
      .text()
      .trim()
      .split("By ");

    results.link = $(this)
      .find("h2")
      .find("a")
      .attr("href");

    results.author = $(this)
      .find("section.d-none.d-sm-block")
      .find("p.m-0.text-xs.badge-spacing")
      .find("span")
      .text()
      .split(",");

    results.time = $(this)
      .find("h6")
      .find("time")
      .attr("datetime")
      .split(" ");

    // Create a new article using the "result" object built from scraping
    db.Article.create(result)
      .then(function(dbArticle) {
        // View the added result in the console
        console.log(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, log it
        console.log(err);
      });
  });

  // Send a message to the client
  res.send("Scrape Complete");
  // console.log(results);
});
// });

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port " + PORT);
});
