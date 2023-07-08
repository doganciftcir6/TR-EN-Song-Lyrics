const mongoose = require("mongoose");

//timestamps: true ile kayıdın oluşturulma tarihini tut.
//song ve artist 'in çoka çok ilişkisi, unique: true ile tekrarlı kayıt olma ihtimalini engelle.
const songArtistSchema = mongoose.Schema(
  {
    song: {
      type: Schema.Types.ObjectId,
      ref: "Songs",
      required: [true, "You must enter an song!"],
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Artists",
      required: [true, "You must enter an artist!"],
    },
  },
  { timestamps: true },
  { unique: true }
);

const SongArtist = mongoose.model("SongArtists", songArtistSchema);
module.exports = SongArtist;
