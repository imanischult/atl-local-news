// Dependencies
const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const mongoose = require("mongoose");

// Require axios and cheerio to make scraping possible
const axios = require("axios");
const cheerio = require("cheerio");

// Initialize Express
const app = express();

// Databse configurations
const dbURL = "article";
const collections = ["atlArticles"];

// Hook mongojs config to the db variable
const db = mongojs(dbURL, collections);
db.on("error", err => {
  console.log("Database Error:" + err);
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
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
