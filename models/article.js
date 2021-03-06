const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
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
  saved: {
    type: Boolean,
    default: false
  }
});

const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;

//Cast to String error

// note: {
//   // `note` is an object that stores a Note id
//   // The ref property links the ObjectID to the Note model
//   // This allows us to populate the Article with an associated Note
//   type: Schema.Types.ObjectId,
//   ref: "note"
// }
