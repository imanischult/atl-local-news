module.exports = function(router) {
  // This route renders the homepage. When the browser hits "/", send the homepage.handlebars info
  router.get("/", function(req, res) {
    res.render("homepage");
  });
  // This route renders the saved page. When the browser hits "/saved", send the savedarticles.handlebars info
  router.get("/saved", function(req, res) {
    res.render("savedarticles");
  });
};
