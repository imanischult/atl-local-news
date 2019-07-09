// When the document is finshed loading
$(document).ready(function() {
  // set a reference to the article-container div where all articles will go
  // add event listeners to dynamically generated "save article" and "scape new articles" button
  const articleContainer = $(".article-container");
  $(document).on("click", ".btn.save", saveArticle);
  $(document).on("click", ".btn.scrape-new", scrapeNew);

  // Once the page is ready, run initPage
  initPage();

  function initPage() {
    articleContainer.empty();
    $.get("/api/articles?saved=false").then(function(data) {
      if (data && data.length) {
        renderArticles();
      } else {
        renderEmpty();
      }
    });
  }
});

function renderArticles(articles) {
  let articleDisplay = [];

  for (i = 0; i < articles.length; i++) {
    articleDisplay.push(createDisplay(articles[i]));
  }
}

function renderEmpty() {
  const emptyAlert = $(
    [
      "<div class=alert>",
      "<h4> It looks like there aren't any new articles right now</h4>",
      "</div>",
      "<div>",
      "<h3>What would you like to do?",
      "</div>",
      "<div class=panel",
      "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
      "<h4><a href='/saved'> Go to Saved Articles </a></h4>",
      "</div>"
    ].join("")
  );

  articleContainer.append(emptyAlert);
}
