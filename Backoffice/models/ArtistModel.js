const mongoose = require("mongoose");

const artistSchema = mongoose.Schema({
  artist_name: {
    type: String,
    required: [true, "You must enter an artist name!"],
    minlength: [3, "You must enter at least 3 characters for the artist name field!"],
    maxlength: [50, "The artist name field must have a maximum of 50 characters!"],
  },
  nationality: {
    type: String,
    required: [true, "You must enter an nationality!"],
    minlength: [3, "The nationality field must have a minimum of 3 characters!"],
    maxlength: [40, "The nationality field must have a maximum of 40 characters!"],
  },
  biography: {
    type: String,
    required: [true, "You must enter an biography!"],
    minlength: [5, "The biography field must have a minimum of 5 characters!"],
    maxlength: [1000, "The biography field must have a maximum of 1000 characters!"],
  },
  birth_date: {
    type: Date,
    required: [true, "You must enter an birth date!"],
  },
  image_url: {
    type: String
  },
  status: {
    type: Boolean
  }
});

const Artist = mongoose.model("Artists", artistSchema);
module.exports = Artist;
