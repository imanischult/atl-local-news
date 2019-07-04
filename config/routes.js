// Bring scrape function from scrape script
const scrape = require("../script/scrape");

// Bring articles and notes from controller
const articlesController = require("../controllers/articles");
const notesController = require("../controllers/notes");

module.exports = function(router) {
  // This route renders the homepage. When the browser hits "/", send the homepage.handlebars info
  router.get("/", function(req, res) {
    res.render("homepage");
  });
  // This route renders the saved page. When the browser hits "/saved", send the savedarticles.handlebars info
  router.get("/saved", function(req, res) {
    res.render("savedarticles");
  });
  // This route renders a page that lets you know if there are any new articles
  router.get("/api/fetch", function(req, res) {
    articlesController.fetch(function(err, docs) {
      if (!docs || docs.insertedCount === 0) {
        res.json({
          message: "No new articles today. Check back later!"
        });
      } else {
        res.json({
          message: "Added " + docs.insertedCount + " articles!"
        });
      }
    });
  });
  // This route renders the all article headlines
  router.get("/api/articles", function(req, res) {
    let query = {};
    if (req.query.saved) {
      query = req.query;
    } else {
      articlesController.get(query, function(data) {
        res.json(data);
      });
    }
  });
};
