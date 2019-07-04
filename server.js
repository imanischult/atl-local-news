// // Dependencies
// const express = require("express");
// const logger = require("morgan");
// const mongoose = require("mongoose");

// const PORT = 3000;

// // Require all models
// const db = require("./models");

// // Require axios and cheerio to make scraping possible
// const axios = require("axios");
// const cheerio = require("cheerio");

// // Initialize Express
// const app = express();

// // Configure middleware

// // Use morgan logger for logging requests
// app.use(logger("dev")); // +++ What's "dev"?
// // Parse request body as JSON
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// // +++++ require handlebars to display front end +++++

// // Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/atlArticlesdb", {
//   useNewUrlParser: true
// });

// // Routes

// app.get("/scrape", function(req, res) {
//   axios.get("https://patch.com/georgia/atlanta").then(function({ data }) {
//     const $ = cheerio.load(data);
//     //For each element with an li tag and a class of "tease"...

//     $("section.px-3.px-sm-4.d-flex.flex-row").each(function(index, element) {
//       //find the following data (saved in a variable)
//       const results = {};

//       results.title = $(this)
//         .find("h2")
//         .find("a")
//         .attr("title");

//       results.description = $(this)
//         .find("p")
//         .text()
//         .trim()
//         .split("By ");

//       results.link = $(this)
//         .find("h2")
//         .find("a")
//         .attr("href");

//       results.author = $(this)
//         .find("section.d-none.d-sm-block")
//         .find("p.m-0.text-xs.badge-spacing")
//         .find("span")
//         .text()
//         .split(",");

//       results.time = $(this)
//         .find("h6")
//         .find("time")
//         .attr("datetime")
//         .split(" ");

//       // Create a new article using the "result" object built from scraping
//       db.Article.create(results)
//         .then(function(dbArticle) {
//           // View the added result in the console
//           // console.log(dbArticle);
//         })
//         .catch(function(err) {
//           // If an error occurred, log it
//           console.log(err);
//         });
//     });

//     res.send("Scrape Complete");
//   });
// });

// Require necessary packages
const express = require("express");
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Set up the port
const PORT = process.env.PORT || 3000;

// Set up an express router
const router = express.Router();

require("./config/routes")(router);

// If deployed, use the deployed database. Otherwise, use the local datase
const db = process.env.MONGODB_URI || "mongodb://localhost/atlArticles";

// Connect mongoose to the db
mongoose.connect(db, function(error) {
  if (error) console.log(error);
  else console.log("Mongoose has connected");
});

// Use public folder as a static directory
app.use(express.static(__dirname + "/public"));

// User bodyparser in app
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Set up app to use handlebars
app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main"
  })
);

app.set("view engine", "handlebars");

// Every request goes through router middleware
app.use(router);

// Listen on port 3000
app.listen(PORT, () => {
  console.log("App running on PORT " + PORT);
});
