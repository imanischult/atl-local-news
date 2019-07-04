const axios = require("axios");
const cheerio = require("cheerio");

const scrape = function(cb) {
  axios.get("https://patch.com/georgia/atlanta").then(function({ data }) {
    const $ = cheerio.load(data);
    const articles = [];

    $("section.px-3.px-sm-4.d-flex.flex-row").each(function(index, element) {
      //find the following data (saved in a variable)
      const results = {};

      const title = (results.title = $(this)
        .find("h2")
        .find("a")
        .attr("title"));

      const description = (results.description = $(this)
        .find("p")
        .text()
        .trim()
        .split("By "));

      const link = (results.link = $(this)
        .find("h2")
        .find("a")
        .attr("href"));

      const author = (results.author = $(this)
        .find("section.d-none.d-sm-block")
        .find("p.m-0.text-xs.badge-spacing")
        .find("span")
        .text()
        .split(","));

      const time = (results.time = $(this)
        .find("h6")
        .find("time")
        .attr("datetime")
        .split(" "));

      articles.push({
        title: title,
        description: description,
        link: link,
        author: author,
        time: time
      });
    });
    cb(articles);
    console.log("Scrape Complete");
  });
};

module.exports = scrape;

//  // Create a new article using the "result" object built from scraping
//  db.Article.create(results)
//  .then(function(dbArticle) {
//    // View the added result in the console
//    // console.log(dbArticle);
//  })
//  .catch(function(err) {
//    // If an error occurred, log it
//    console.log(err);
//  });
