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
mongoose.connect("atlArticlesdb://localhost/populateddb", {
  useNewUrlParser: true
});

//Let's first get the scraped data using node and cheerio. We'll be scraping articles from AJC

axios.get("https://patch.com/georgia/atlanta").then(response => {
  const $ = cheerio.load(response.data);
  //For each element with an li tag and a class of "tease"...
  const titleArr = [];
  $("section.px-3.px-sm-4.d-flex.flex-row").each(function(index, element) {
    //find the following data (saved in a variable)
    let title = $(element)
      .find("h2")
      .find("a")
      .attr("title");

    let descr = $(element)
      .find("p")
      .text()
      .trim()
      .split("By ");

    let link = $(element)
      .find("h2")
      .find("a")
      .attr("href");

    let img = $(element)
      .find("section.d-none.d-sm-block")
      .find("p.m-0.text-xs.badge-spacing")
      .find("span")
      .text()
      .split(",");

    titleArr.push({
      title: title,
      description: descr[0],
      link: link,
      image: img
    });
  });
  console.log(titleArr);
});

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port " + PORT);
});
