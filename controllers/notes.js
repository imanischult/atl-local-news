const Note = require("../models/note");

module.exports = {
  get: function(data, cb) {
    Note.find(
      {
        _titleId: data._id
      },
      cb
    );
  },
  save: function(data, cb) {
    const newNote = {
      _titleId: data._id,
      text: data.text
    };

    Note.create(newNote, function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        console.log(doc);
        cb(doc);
      }
    });
  }
};
