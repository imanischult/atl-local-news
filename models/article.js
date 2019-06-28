const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  time: String,
  // `note` is an object that stores a Note id
  // The ref property links the ObjectID to the Note model
  // This allows us to populate the Article with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: "note"
  }
});

const Article = mongoose.model("Articles", ArticleSchema);

// Export the Article model
module.exports = Article;
