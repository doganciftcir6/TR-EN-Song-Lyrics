const mongoose = require("mongoose");

//timestamps: true ile kayıdın oluşturulma tarihini tut.
const favoriteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "You must select a user!"],
    },
    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: [true, "You must select a song!"],
    },
  },
  { timestamps: true }
);

const Favorite = mongoose.model("Favorites", favoriteSchema);
module.exports = Favorite;
