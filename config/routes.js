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
  // This route allows the user to delete
  router.delete("api/articles/:id", function(req, res) {
    let query = {};
    query._id = req.params.id;
    articlesController.delete(query, function(err, data) {
      res.json(data);
    });
  });
  // This routes pulls the api for the user notes
  router.get("/api/notes/articles_id?", function(req, res) {
    let query = {};
    if (req.params.article_id) {
      query._id = req.params.article_id;
    }

    notesController.get(query, function(err, data) {
      res.json(data);
    });
  });

  router.delete("/api/notes/:id", function(err, data) {
    let query = {};
    query._id = req.params.id;
    notesController.delete(query, function(err, data) {
      res.json(data);
    });
  });

  router.post("/api/notes", function(req, res) {
    notesController.save(req.body, function(data) {
      res.json(data);
    });
  });
};
