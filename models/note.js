const mongoose = require("mongoose");

// Save reference to the Schema constructor
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: String,
  body: String
});

// This creates our model from the above Schema, using Mongooses's model method
const Note = mongoose.model("Note", NoteSchema);

// Export to the Note model
module.exports = Note;
