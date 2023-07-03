const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "You must enter an title!"],
    minlength: [5, "The title field must have a minimum of 5 characters!"],
    maxlength: [100, "The title field must have a maximum of 100 characters!"],
  },
  tr_lyrics: {
    type: String,
    required: [true, "You must enter an TR Lyrics!"],
    minlength: [5, "The TR Lyrics field must have a minimum of 5 characters!"],
  },
  en_lyrics: {
    type: String,
    required: [true, "You must enter an EN Lyrics!"],
    minlength: [5, "The EN Lyrics field must have a minimum of 5 characters!"],
  },
  duration: {
    type: String,
    required: [true, "You must enter an duration!"],
    validate: {
      validator: function (value) {
        // "mm:ss" formatına uygunluğu kontrol etme
        return /^\d{1,2}:\d{2}$/.test(value);
      },
      message: (props) =>
        `${props.value} Invalid duration format. Please enter the duration in the "mm:ss" format!"`,
    },
  },
  releaseDate: {
    type: String,
    required: [true, "You must enter an release date!"],
    validate: {
      validator: function(value) {
        // "YYYY" formatına uygunluğu kontrol etme
        return /^\d{4}$/.test(value);
      },
      message: props => `${props.value} Invalid release date format. Please enter the date in the "YYYY" format!`
    }
  },
  status: {
    type: Boolean
  }
});

const Song = mongoose.model("Songs", songSchema);
module.exports = Song;
